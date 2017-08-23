import {$get} from '~/.nuxt-helpers/axios'
import moment from 'moment'

const baseUrl = 'https://api3.libcal.com/'

// Set formatting strings for Moment's calendar method
// http://momentjs.com/docs/#/customization/calendar
moment.updateLocale('en', {
  calendar: {
    lastDay: 'LT [yesterday]',
    sameDay: 'LT',
    nextDay: 'LT [tomorrow]',
    lastWeek: 'LT [last] dddd',
    nextWeek: 'LT dddd',
    sameElse: 'LT ddd, MMM D'
  },
  longDateFormat: {
    LT: 'h:mm a'
  }
})

export default {
  api: {
    endpoints: {
      hours: baseUrl + 'api_hours_date.php?iid=973&format=json&nocache=1&lid='
    },
    desks: {
      ciser: 3016,
      cscu: 3017,
      gis: 2204,
      gws: 3303,
      knight: 3018,
      rdmsg: 3302
    }
  },
  timeFormat: 'ha',
  timeDisplayFormat: 'h:mm a',
  alreadyClosed: function (hours) {
    if (hours === null) return false
    // If multiple openings/closings, compare against last one for the day
    const lastClosing = hours.pop().to

    return moment().isSameOrAfter(moment(lastClosing, this.timeFormat))
  },
  formatDate: function (date) {
    return moment(date).format('Y-MM-DD')
  },
  getHours: function (desk, date) {
    // console.log(this.api)
    const requestDate = typeof date === 'undefined' ? null : '&date=' + this.formatDate(date)
    return $get(this.api.endpoints.hours + this.api.desks[desk] + requestDate)
  },
  async nextOpening (desk) {
    var displayTime = 'no upcoming openings'

    // Check today plus next 14 days
    for (var i = 0; i < 15; i++) {
      var dateToCheck = moment().add(i, 'days')
      // console.log(dateToCheck)
      var openingTime = await this.openingTime(desk, this.formatDate(dateToCheck))
      // console.log(openingTime)
      // var displayTime = null

      if (openingTime !== null) {
        // Use openingTime to update existing moment and set hours & mins
        openingTime = moment(openingTime, this.timeFormat)
        displayTime = dateToCheck.set({
          'hour': openingTime.get('hour'),
          'minute': openingTime.get('minute')
        })
        displayTime = moment(displayTime).calendar()
        break
      }
    }

    return displayTime
  },
  async openingTime (desk, date) {
    let feed = await this.getHours(desk, date)
    // console.log(feed)
    // console.log(feed.locations[0].times)
    const hours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
    // console.log(hours[0].from)
    // console.log('hours: ', hours)

    // Copy hours since it gets emptied after using as function param
    // -- TODO: Consider immutable.js or seamless-immutable
    const hoursClone = hours !== null ? hours.slice(0) : null

    // console.log('hoursLater: ', hours)
    // console.log('date: ' + date)
    // console.log('today? ' + moment().isSame(moment(date), 'd'))

    // If dealing with today, ensure we're not already closed
    if (moment().isSame(moment(date), 'd') && this.alreadyClosed(hoursClone)) {
      return null
    }

    return hours !== null ? hours[0].from : null
  },
  async openNow (desk, libcalStatus, hours) {
    // const timeFmt = 'ha'
    // var statusChange = null

    if (hours) {
      // Account for potential of multiple openings/closings in a given day
      const isOpen = hours.find((hoursBlock) => {
        // console.log(hoursBlock)
        return (moment().isBetween(moment(hoursBlock.from, this.timeFormat), moment(hoursBlock.to, this.timeFormat), null, []))
      })

      console.log('openingTime:', isOpen)
      if (isOpen !== undefined) {
        return {
          current: 'open',
          change: moment(isOpen.to, this.timeFormat).format(this.timeDisplayFormat)
        }
      }
    }

    let statusChange = await this.nextOpening(desk)
    console.log('statusChange:', statusChange)

    if (libcalStatus === 'ByApp') {
      return {
        current: 'by appointment',
        change: statusChange
      }
    }

    return {
      current: 'closed',
      change: statusChange
    }
  }
}
