// tslint:disable no-console
import * as AWS from 'aws-sdk'
import fetch from 'node-fetch'
import {
  ExtractColorsPayload,
  ExtractThemesPayload,
  Job,
  JobMessage,
  SaveThemePayload,
  ScrapeThemesPayload,
  Services,
} from '../../types/static'

const {
  SCRAPE_THEMES_QUEUE_URL,
  SCRAPE_THEMES_DEADLETTER_URL,
  SCRAPE_THEMES_TOPIC_ARN,
  EXTRACT_THEMES_QUEUE_URL,
  EXTRACT_THEMES_DEADLETTER_URL,
  EXTRACT_THEMES_TOPIC_ARN,
  EXTRACT_COLORS_QUEUE_URL,
  EXTRACT_COLORS_DEADLETTER_URL,
  EXTRACT_COLORS_TOPIC_ARN,
  SAVE_THEME_QUEUE_URL,
  SAVE_THEME_DEADLETTER_URL,
  SAVE_THEME_TOPIC_ARN,
} = process.env

const sqs = new AWS.SQS()
const sns = new AWS.SNS()

function createJob<P>(
  jobName: string,
  queueUrl: string,
  deadLetterQueueUrl: string,
  topicArn: string,
): Job<P> {
  return {
    create: async (payload: P) => {
      const params = {
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(payload),
      }
      await sqs.sendMessage(params).promise()
    },
    receive: async () => {
      const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10, // seconds
      }
      const data = await sqs.receiveMessage(params).promise()
      if (!data || !data.Messages) {
        // There are no messages in the queue.
        return null
      }

      const message = data.Messages[0]
      const payload = JSON.parse(message.Body)
      return { receiptHandle: message.ReceiptHandle, payload }
    },
    notify: async () => {
      const params = {
        TopicArn: topicArn,
        Message: jobName,
      }
      await sns.publish(params).promise()
    },
    succeed: async (message: JobMessage<P>) => {
      const params = {
        QueueUrl: queueUrl,
        ReceiptHandle: message.receiptHandle,
      }
      await sqs.deleteMessage(params).promise()
    },
    fail: async (message: JobMessage<P>, error: Error) => {
      // Forward message and error to the dead-letter queue.
      const sendParams = {
        QueueUrl: deadLetterQueueUrl,
        MessageBody: JSON.stringify(message.payload),
        MessageAttributes: {
          error: {
            DataType: 'String',
            StringValue: error.message,
          },
          stack: {
            DataType: 'String',
            StringValue: error.stack,
          },
        },
      }
      await sqs.sendMessage(sendParams).promise()
      // Delete message from original queue.
      const deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: message.receiptHandle,
      }
      await sqs.deleteMessage(deleteParams).promise()
    },
    retry: async (message: JobMessage<P>) => {
      // Don't delete the message, processing will timeout and cause SQS to
      // retry according to it's redrive policy.
      // Notify to execute the lambda function again.
      const params = {
        TopicArn: topicArn,
        Message: `${jobName}-retry`,
      }
      await sns.publish(params).promise()
    },
  }
}

export default function createServices(): Services {
  return {
    fetch,
    scrapeThemes: createJob<ScrapeThemesPayload>(
      'scrapeThemes',
      SCRAPE_THEMES_QUEUE_URL,
      SCRAPE_THEMES_DEADLETTER_URL,
      SCRAPE_THEMES_TOPIC_ARN,
    ),
    extractThemes: createJob<ExtractThemesPayload>(
      'extractThemes',
      EXTRACT_THEMES_QUEUE_URL,
      EXTRACT_THEMES_DEADLETTER_URL,
      EXTRACT_THEMES_TOPIC_ARN,
    ),
    extractColors: createJob<ExtractColorsPayload>(
      'extractColors',
      EXTRACT_COLORS_QUEUE_URL,
      EXTRACT_COLORS_DEADLETTER_URL,
      EXTRACT_COLORS_TOPIC_ARN,
    ),
    saveTheme: createJob<SaveThemePayload>(
      'saveTheme',
      SAVE_THEME_QUEUE_URL,
      SAVE_THEME_DEADLETTER_URL,
      SAVE_THEME_TOPIC_ARN,
    ),
    // Ouputs to CloudWatch
    logger: {
      log: obj => {
        console.log(obj)
      },
      error: error => {
        console.error(error)
      },
    },
  }
}
