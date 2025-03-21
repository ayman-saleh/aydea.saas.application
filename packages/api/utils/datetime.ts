import { endOfDay, startOfDay, subDays } from 'date-fns'

export const dateRanges = {
  today: () => ({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  }),
  last7Days: () => ({
    start: startOfDay(subDays(new Date(), 7)),
    end: endOfDay(new Date()),
  }),
  last30Days: () => ({
    start: startOfDay(subDays(new Date(), 30)),
    end: endOfDay(new Date()),
  }),
}

export const formatDate = (date: Date, format: string = 'yyyy-MM-dd') => {
  // Implement date formatting
}
