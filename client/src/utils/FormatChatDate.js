import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

export const formatChatDate = (currDate) => {
  dayjs.extend(isToday)
  dayjs.extend(isSameOrBefore)

  const date = dayjs(currDate)

  return date.isToday() ?
    date.format('hh:mm A')
    :
    date.format('MMM D')
}