import { $get } from '~/.nuxt-helpers/axios'
import moment from 'moment'
import jsonpPromise from 'jsonp-promise'

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
      career: {
        id: 7733,
        description: [
          'CALS student services'
        ]
      },
      ciser: {
        id: 3016,
        description: []
      },
      cscu: {
        id: 3017,
        description: [
          'statistical consulting'
        ]
      },
      'cu-career': {
        id: 7734,
        description: [
          'Cornell career services'
        ]
      },
      elso: {
        id: 7701,
        description: [
          'english language support'
        ]
      },
      gis: {
        id: 2204,
        description: []
      },
      gws: {
        id: 3303,
        description: [
          'writing',
          'grad',
          'appt only'
        ]
      },
      knight: {
        id: 3018,
        description: [
          'writing',
          'walk-in'
        ]
      },
      rdmsg: {
        id: 3302,
        description: [
          'research data management'
        ]
      },
      reference: {
        id: 1710,
        description: []
      }
    }
  },
  timeFormat: 'h:mm a',
  alreadyClosed: function (hours) {
    if (hours === null) return false
    // If multiple openings/closings, compare against last one for the day
    const lastClosing = hours.pop().to

    return moment().isSameOrAfter(moment(lastClosing, this.timeFormat))
  },
  formatFutureOpening: function (datetime) {
    return datetime === null ? 'no upcoming openings' : moment(datetime).calendar()
  },
  formatDate: function (date) {
    return moment(date).format('Y-MM-DD')
  },
  getHours: function (desk, date, jsonp = false) {
    const requestDate = typeof date === 'undefined' ? '' : '&date=' + this.formatDate(date)
    const url = this.api.endpoints.hours + this.api.desks[desk].id + requestDate

    if (jsonp) {
      // If fetching updates from client, need to deal with JSONP
      // -- LibCal doesn't set Access-Control-Allow-Origin header
      return jsonpPromise(url).promise
    } else {
      // Non-issue when proxied through server on initial load (thanks Nuxt)
      return $get(url)
    }
  },
  nextDay: function (lastUpdated) {
    return moment().isAfter(moment(lastUpdated), 'd')
  },
  async nextOpening (desk, jsonp = false) {
    var bigWinner = null

    // Check today plus next 14 days
    for (var i = 0; i < 15; i++) {
      var dateToCheck = moment().add(i, 'days')
      var openingTime = await this.openingTime(desk, this.formatDate(dateToCheck), jsonp)

      if (openingTime !== null) {
        // Use openingTime to update existing moment and set hours & mins
        openingTime = moment(openingTime, this.timeFormat)
        bigWinner = dateToCheck.set({
          'hour': openingTime.get('hour'),
          'minute': openingTime.get('minute')
        })
        break
      }
    }

    return bigWinner
  },
  async openingTime (desk, date, jsonp = false) {
    let feed = await this.getHours(desk, date, jsonp)
    const hours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours

    // Copy hours since it gets emptied after using as function param
    // -- TODO: Consider immutable.js or seamless-immutable
    const hoursClone = hours !== null ? hours.slice(0) : null

    // If dealing with today, ensure we're not already closed
    if (moment().isSame(moment(date), 'd') && this.alreadyClosed(hoursClone)) {
      return null
    }

    return hours !== null ? hours[0].from : null
  },
  async openNow (desk, libcalStatus, hours, jsonp = false) {
    let status = {
      current: 'closed',
      timestamp: moment() // Use for caching results from LibCal API
    }

    if (hours) {
      // Account for potential of multiple openings/closings in a given day
      const isOpen = hours.find((hoursBlock) => {
        return (moment().isBetween(moment(hoursBlock.from, this.timeFormat), moment(hoursBlock.to, this.timeFormat), null, []))
      })

      if (isOpen !== undefined) {
        status.current = 'open'
        status.change = moment(isOpen.to, this.timeFormat)
        return status
      }
    }

    let statusChange = await this.nextOpening(desk, jsonp)

    status.change = statusChange

    if (libcalStatus === 'ByApp') {
      status.current = 'by appointment'
    }

    return status
  },
  pastChange: function (changeTime) {
    return moment().isSameOrAfter(moment(changeTime))
  },
  staleCache: function (lastUpdated) {
    // Cache LibCal API response for at least 2 minutes
    // -- test float against 1.9 to account for synchronous calls
    // TODO: Return promise & join async/await bandwagon
    return moment().diff(lastUpdated, 'minutes', true) >= 1.9
  },
  statusLabel: function (desk, status) {
    // Reference desk is considered 'reserved' when open
    if (desk === 'reference' && status === 'open') {
      return 'reserved'
    }

    // Abbreviate the mouthful
    if (status === 'by appointment') {
      return 'by appt'
    }

    return status
  }
}
