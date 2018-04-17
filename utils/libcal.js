import jsonpPromise from 'jsonp-promise'
import { _ } from 'lodash'
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

const libCal = {
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
          'Graduate',
          'Cornell Career Services'
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
    },
    libraries: {
      mann: {
        id: 1707
      }
    },
    spaces: {
      270: {
        id: 20087,
        category: {
          id: 5395,
          name: 'group study'
        }
      },
      271: {
        id: 20088,
        category: {
          id: 5396,
          name: 'individual study'
        }
      },
      272: {
        id: 20089,
        category: {
          id: 5396,
          name: 'individual study'
        }
      }
    }
  },
  timeFormat: 'h:mm a',
  alreadyClosed: function (hours) {
    if (hours === null) return false
    // If multiple openings/closings, compare against last one for the day
    let lastClosing = moment(hours.pop().to, libCal.timeFormat)

    lastClosing = libCal.earlyMorningClose(lastClosing)

    return moment().isSameOrAfter(lastClosing)
  },
  availableSlot: function (start, end) {
    return {
      bookId: 'avail_randomString',
      fromDate: start,
      toDate: end,
      isAvailable: true,
      startTime: libCal.parseDate(start)
    }
  },
  bookingsYeah: function (bookings, room, openingTime, closingTime) {
    const spaceId = libCal.api.spaces[room].id
    // TODO: Remove hardcoded opening & closing times used for testing data mock
    openingTime = '2018-03-27T08:00:00-04:00'
    closingTime = '2018-03-28T00:00:00-04:00'
    const roomAvailability = _(bookings)
      // Filter bookings by room, status(confirmed), and while open
      .filter(function (booking, index, allBookings) {
        const confirmed = booking.status === 'Confirmed'
        const thisRoom = booking.eid === spaceId
        const whileOpen = moment(booking.fromDate).isSameOrAfter(openingTime) && moment(booking.toDate).isSameOrBefore(closingTime)
        return thisRoom &&
          confirmed &&
          whileOpen
      })
      // Fill gaps between & pad bookings with available slots
      .flatMap(function (booking, index, allBookings) {
        const paddedBooking = [booking]
        const prevIndex = index - 1
        booking.startTime = libCal.parseDate(booking.fromDate)

        // If first booking & starts after opening, pad before
        if (index === 0 &&
          moment(booking.fromDate).isAfter(openingTime)
        ) {
          const availableNow = libCal.availableSlot(openingTime, booking.fromDate)
          paddedBooking.splice(0, 0, availableNow)
        }
        // If not back-to-back with previous booking, pad before (aka between)
        if (prevIndex > -1 &&
          !moment(booking.fromDate).isSame(allBookings[prevIndex].toDate)
        ) {
          const availableSlot = libCal.availableSlot(allBookings[prevIndex].toDate, booking.fromDate)
          paddedBooking.splice(0, 0, availableSlot)
        }
        // If final booking...
        if (index + 1 === allBookings.length) {
          // Pad after if it falls short of closing
          if (moment(booking.toDate).isBefore(moment(closingTime))) {
            const availableTilClose = libCal.availableSlot(booking.toDate, closingTime)
            availableTilClose.lastUp = true
            paddedBooking.push(availableTilClose)
          // Otherwise, mark it as running through to closing
          } else {
            booking.lastUp = true
          }
        }
        return paddedBooking
      })
      // Now filter out past bookings
      .filter(function (booking, index, allBookings) {
        // TODO: Remove hardcoded 'now' -- here to accomodate mock data
        const notPast = moment('2018-03-27T08:00:00-04:00').isSameOrBefore(booking.toDate)
        return notPast
      })
      .value()

    // console.log('----------------\nALL THE THINGS!\n----------------\n', roomAvailability)

    return roomAvailability
  },
  earlyMorningClose: function (closing) {
    return moment(closing, libCal.timeFormat).isBefore(moment('6am', libCal.timeFormat)) ? closing.add(1, 'day') : closing
  },
  formatFutureOpening: function (datetime) {
    return datetime === null ? 'no upcoming openings' : moment(datetime).calendar()
  },
  formatDate: function (date) {
    return moment(date).format('Y-MM-DD')
  },
  formatTime: function (date) {
    return moment(date).format(libCal.timeFormat)
  },
  getHours: function (axios, desk, date, jsonp = false) {
    const requestDate = typeof date === 'undefined' ? '' : '&date=' + libCal.formatDate(date)
    const locId = typeof desk === 'undefined' ? libCal.api.libraries.mann.id : libCal.api.desks[desk].id
    const url = libCal.api.endpoints.hours + locId + requestDate

    if (jsonp) {
      // If fetching updates from client, need to deal with JSONP
      // -- LibCal doesn't set Access-Control-Allow-Origin header
      return jsonpPromise(url).promise
    } else {
      // Non-issue when proxied through server on initial load (thanks Nuxt)
      return axios.$get(url)
    }
  },
  nextDay: function (lastUpdated) {
    return moment().isAfter(moment(lastUpdated), 'd')
  },
  async nextOpening (axios, desk, jsonp = false) {
    var bigWinner = null

    // Check today plus next 14 days
    for (var i = 0; i < 15; i++) {
      var dateToCheck = moment().add(i, 'days')
      var openingTime = await libCal.openingTime(axios, desk, libCal.formatDate(dateToCheck), jsonp)

      if (openingTime !== null) {
        // Use openingTime to update existing moment and set hours & mins
        bigWinner = dateToCheck.set({
          'hour': openingTime.get('hour'),
          'minute': openingTime.get('minute')
        })
        break
      }
    }

    return bigWinner
  },
  async hoursForDate (axios, desk, date, jsonp = false) {
    let feed = await libCal.getHours(axios, desk, date, jsonp)
    const hours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours

    return hours
  },
  async openingTime (axios, desk, date, jsonp = false) {
    const hours = await libCal.hoursForDate(axios, desk, date, jsonp)

    // Copy hours since it gets emptied after using as function param
    // -- TODO: Consider immutable.js or seamless-immutable
    const hoursClone = hours !== null ? hours.slice(0) : null

    // If dealing with today, ensure we're not already closed
    if (moment().isSame(moment(date), 'd') && libCal.alreadyClosed(hoursClone)) {
      return null
    }

    return hours !== null ? moment(hours[0].from, libCal.timeFormat) : null
  },
  async closingTime (axios, desk, date, jsonp = false) {
    const hours = await libCal.hoursForDate(axios, desk, date, jsonp)

    let closingTime = hours !== null ? moment(hours[0].to, libCal.timeFormat) : null

    if (closingTime) {
      // Account for early morning closings the following day
      // -- LibCal only returns time, no date, so add a day to early morning closings for true comparisons
      closingTime = libCal.earlyMorningClose(closingTime)
    }

    return closingTime
  },
  async openNow (axios, desk, libcalStatus, hours, jsonp = false) {
    let status = {
      current: 'closed',
      timestamp: moment() // Use for caching results from LibCal API
    }

    if (hours) {
      // Account for potential of multiple openings/closings in a given day
      const isOpen = hours.find((hoursBlock) => {
        return (moment().isBetween(moment(hoursBlock.from, libCal.timeFormat), moment(hoursBlock.to, libCal.timeFormat), null, []))
      })

      if (isOpen !== undefined) {
        status.current = 'open'
        status.change = moment(isOpen.to, libCal.timeFormat)
        return status
      }
    }

    let statusChange = await libCal.nextOpening(axios, desk, jsonp)

    status.change = statusChange

    if (libcalStatus === 'ByApp') {
      status.current = 'by appointment'
    }

    return status
  },
  // TODO: Cleanup date parsing once real LibCal API response replaces mock data
  parseDate: function (date) {
    let startDate = moment(date)
    let startTime = {}
    startTime.hour = startDate.format('h')
    startTime.minute = startDate.format('mm')
    startTime.meridiem = startDate.format('a')
    return startTime
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

export default libCal
