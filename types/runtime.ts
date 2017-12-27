import { Array, Number, Record, String, Tuple, Union } from 'runtypes'

export const PublisherRuntime = Record({
  publisherName: String,
})

export const PropertyRuntime = Record({
  key: String,
  value: String,
})

export const VersionRuntime = Record({
  lastUpdated: String,
  properties: Array(PropertyRuntime),
})

export const StatisticRuntime = Record({
  statisticName: String,
  value: Number,
})

export const ExtensionRuntime = Record({
  extensionName: String,
  publisher: PublisherRuntime,
  versions: Array(VersionRuntime),
  statistics: Array(StatisticRuntime),
})

export const ExtensionQueryResultsRuntime = Record({
  results: Tuple(Record({ extensions: Array(ExtensionRuntime) })),
})

export const ScrapeThemesPayloadRuntime = Record({
  page: Number,
})

export const ExtractThemesPayloadRuntime = Record({
  repository: String,
  repositoryOwner: String,
  stats: Record({
    installs: Number,
    rating: Number,
    ratingCount: Number,
    trendingDaily: Number,
    trendingWeekly: Number,
    trendingMonthly: Number,
  }),
})

export const PackageJSONRuntime = Record({
  contributes: Record({
    themes: Array(
      Record({
        label: String,
        uiTheme: String,
        path: String,
      }),
    ),
  }),
})

export const ExtractColorsPayloadRuntime = Union(
  ExtractThemesPayloadRuntime,
  Record({
    name: String,
    repositoryPath: String,
  }),
)
