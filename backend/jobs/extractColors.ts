import {
  Colors,
  ColorsRuntime,
  ExtractColorsPayloadRuntime,
  Services,
  ThemeType,
  ThemeTypeRuntime,
} from '@vscodethemes/types'
import * as stripComments from 'strip-json-comments'
import { PermanentJobError, TransientJobError } from '../errors'
import extractGUIColors from '../utils/extractGUIColors'
import extractTokenColors from '../utils/extractTokenColors'

export default async function run(services: Services): Promise<any> {
  const { extractColors, saveTheme, logger } = services

  const job = await extractColors.receive()
  if (!job) {
    logger.log('No more jobs to process.')
    return
  }

  // Process the next job in the queue.
  await extractColors.notify()

  logger.log('Processing extractColors job...')
  logger.log(`Receipt Handle: ${job.receiptHandle}`)
  logger.log(`Payload: ${JSON.stringify(job.payload)}`)

  try {
    if (!ExtractColorsPayloadRuntime.guard(job.payload)) {
      throw new PermanentJobError('Invalid job payload.')
    }

    const { payload } = job
    // Fetch the theme's colors from it's repository.
    const theme = await fetchTheme(services, payload.url)

    theme.name = theme.name || payload.name
    if (!theme.name) {
      throw new PermanentJobError(
        `Missing name for theme: '${JSON.stringify(theme)}'`,
      )
    }

    theme.type = theme.type || payload.type
    if (!ThemeTypeRuntime.guard(theme.type)) {
      throw new PermanentJobError(
        `Invalid type for theme: ${JSON.stringify(theme)}`,
      )
    }

    logger.log(`Theme: ${JSON.stringify(theme)}`)

    // Create a job to save the theme.
    await saveTheme.create({ ...payload, ...theme })

    // Job succeeded.
    await extractColors.succeed(job)
  } catch (err) {
    if (TransientJobError.is(err)) {
      logger.log(err.message)
      await extractColors.retry(job)
    } else if (PermanentJobError.is(err)) {
      logger.log(err.message)
      await extractColors.fail(job, err)
    } else {
      logger.log('Unexpected Error.')
      await extractColors.fail(job, err)
      // Rethrow error for global error handlers.
      throw err
    }
  }
}

// Fetch the repository's theme definition.
async function fetchTheme(
  services: Services,
  url: string,
): Promise<{ name: string; type: ThemeType; colors: Colors }> {
  let name: string
  let type: ThemeType
  let colors: Partial<Colors>
  const { fetch, logger } = services

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new TransientJobError(
      `fetchTheme error: Bad response '${response.statusText}' for '${url}'`,
    )
  }

  let data: any
  try {
    logger.log(`Fetching theme...`)
    const responseText = await response.text()
    data = JSON.parse(stripComments(responseText))
    name = data.name
    type = data.type
    if (data.colors && data.tokenColors) {
      const guiColors = extractGUIColors(type, data.colors)
      const tokenColors = extractTokenColors(
        guiColors.editorForeground,
        data.tokenColors,
      )
      colors = { ...guiColors, ...tokenColors }
    }
  } catch (err) {
    logger.error(err)
    throw new PermanentJobError(
      `fetchTheme error: Invalid response data for '${url}'`,
    )
  }

  if (!ColorsRuntime.guard(colors)) {
    throw new PermanentJobError(
      `fetchTheme error: Invalid colors: ${JSON.stringify(colors)}
        URL: ${url}
        Theme: ${JSON.stringify(data)}`,
    )
  }

  logger.log(`fetchTheme success: 
    URL: ${url}
    Theme: ${JSON.stringify(data)}
  `)

  return { name, type, colors }
}
