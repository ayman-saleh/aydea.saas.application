import { SQL, sql } from '@acme/db'

export const createSearchQuery = (field: SQL, search?: string) => {
  if (!search?.trim()) {
    return undefined
  }

  return sql`${field} ILIKE ${`%${search}%`}`
}

export const createDateRangeQuery = (
  field: SQL,
  startDate?: Date,
  endDate?: Date,
) => {
  if (!startDate && !endDate) {
    return undefined
  }

  if (startDate && endDate) {
    return sql`${field} BETWEEN ${startDate} AND ${endDate}`
  }

  if (startDate) {
    return sql`${field} >= ${startDate}`
  }

  return sql`${field} <= ${endDate}`
}
