import moment from 'moment'

export default function useDateFormatter() {
  const dayMonthYear = (date: Date) => {
    return moment(date).format('DD/MM/YY')
  }

  const timeFormatter = (date: Date) => {
    return moment(date).format('LT')
  }

  const formNowFormatter = (date: Date) => {
    return moment(date).fromNow()
  }

  const standardFormatter = (date: Date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  const monthDateYearFormat = (date: Date) => {
    return moment(date).format('MMMM Do, YYYY')
  }

  const dateMonthYearFormat = (date: Date) => {
    return moment(date).format('DD MMMM YYYY')
  }

  const getDateDifference = (endDate: Date, startDate: Date) => {
    const date1 = new Date(startDate)
    const date2 = new Date(endDate)

    // Calculate the difference in milliseconds
    const diffInMs = date2.getTime() - date1.getTime()

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    // Check the magnitude of the difference and format accordingly
    let diffOutput
    if (diffInDays < 7) {
      diffOutput = `${diffInDays} days`
    } else if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7)
      diffOutput = `${diffInWeeks} weeks`
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30)
      diffOutput = `${diffInMonths} months`
    } else {
      const diffInYears = Math.floor(diffInDays / 365)
      diffOutput = `${diffInYears} years`
    }
    return diffOutput
  }
  return {
    dayMonthYear,
    timeFormatter,
    formNowFormatter,
    standardFormatter,
    monthDateYearFormat,
    getDateDifference,
    dateMonthYearFormat
  }
}
