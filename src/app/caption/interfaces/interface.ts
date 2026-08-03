import type { defaultList } from "../../shared/interfaces/interfaces";

export interface Analytics {
  jobs: AnalyticsDetail
  users: AnalyticsDetail
  companies: AnalyticsDetail
  countries: AnalyticsDetail
}

export interface AnalyticsDetail {
  icon: string
  qty: number
  legend: string
  list?: defaultList[]
}
