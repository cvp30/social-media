import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday"

export const groupMessagesByDate = (messages) => {
  dayjs.extend(isToday)

  return Object.groupBy(messages, ({ timestamp }) => {
    const formattedDate = dayjs(timestamp)

    return formattedDate.isToday() ?
      'Today'
      :
      formattedDate.format('DD/MM/YYYY')
    // return formattedDate.format('DD/MM/YYYY')
  })
}