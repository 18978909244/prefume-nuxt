import moment from 'moment'

export default function(item) {
  let time = 0
  const diffStartTime = moment(item.start_time).diff(moment(), 'seconds')
  const diffEndTime = moment(item.end_time).diff(moment(), 'seconds')

  if (diffStartTime > 0) {
    time = diffStartTime
  } else if (diffStartTime <= 0 && diffEndTime > 0) {
    time = diffEndTime
  } else if (diffEndTime <= 0) {
    time = 0
  }
  return {
    type: item.is_avaiable,
    time
  }
}
