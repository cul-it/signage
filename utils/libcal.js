import schema from '~/utils/schema'
import _ from 'lodash'
import moment from 'moment'
import uniqueString from 'unique-string'

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
      auth: 'libcal/1.1/oauth/token',
      hours: 'libcal-hours/api_hours_date.php?iid=973&format=json&nocache=1&lid=',
      spaces: {
        bookings: 'libcal/1.1/space/bookings?limit=100&'
      }
    }
  },
  timeFormat: 'h:mm a',
  alreadyClosed: function (hours) {
    if (hours === null) return false
    // If multiple openings/closings, compare against last one for the day
    let lastClosing = moment(hours.pop().to, libCal.timeFormat)

    lastClosing = libCal.realClosingTime(lastClosing)

    return moment().isSameOrAfter(lastClosing)
  },
  availableSlot: function (start, end) {
    return {
      bookId: 'avail_' + uniqueString(),
      fromDate: start,
      toDate: end,
      isAvailable: true,
      startTime: libCal.parseDate(start)
    }
  },
  availableTilClose: function (opening, closing) {
    const availableTilClose = libCal.availableSlot(opening, closing)
    availableTilClose.lastUp = true
    return availableTilClose
  },
  // TODO: Pull out shared functionality with R25 into common core
  buildSchedule: (bookings, spaces, opening, closing) => {
    let availability = {}

    // Build availability schedule for each spaces
    Object.keys(spaces).forEach(s => {
      availability[s] = {}
      availability[s].name = spaces[s].name

      // Account for early morning closings (aka still open from yesterday)
      // -- if prior to opening for today set opening time to midnight (today not tomorrow)
      // -- this ensures that if we are still open the first available slot will have correct start time
      opening = moment().isBefore(opening) ? moment('12am', libCal.timeFormat) : opening

      // Only include reservations for requested space(s)
      // -- and only build a schedule if there are any reservations to deal with
      const filteredBookings = bookings.filter(b => spaces[s].id === b.eid)
      if (filteredBookings.length > 0) availability[s].schedule = libCal.bookingsParser(filteredBookings, spaces[s].id, opening, closing)

      // Insert 'available until closing' slot for any space with empty schedule
      if (typeof availability[s].schedule === 'undefined' || !availability[s].schedule.length) {
        const allClear = libCal.availableTilClose(opening, closing)
        availability[s].schedule = [allClear]
      }
    })

    return availability
  },
  requestedSpaces: (location, category) => {
    const spacesInCategory = schema.locations[location].categories[category].spaces
    let spaces = []
    spacesInCategory
      .forEach(s => spaces.push({ 'id': s.id, 'name': s.room, 'capacity': s.capacity }))
    return spaces
  },
  sortSpaces: (spaces, category) => {
    // REVIEW: How common will this be? Should it be configurable via the schema?
    if (category === 'studyrooms' || category === 'b30') spaces.reverse()
    return spaces
  },
  bookingsParser: function (bookings, room, openingTime, closingTime) {
    const roomAvailability = _(bookings)
      // Filter bookings by room, status (confirmed or mediated approved), while open and remove duplicates
      .filter(function (booking, index, allBookings) {
        const confirmed = booking.status === 'Confirmed' || booking.status === 'Mediated Approved'
        const thisRoom = booking.eid === room
        // REVIEW: How can multi-day reservations (not currently allowed) or B30 policy of booking when closed coexist with whileOpen filter?
        // -- whileOpen filter returns & is neccessary now that we're fetching reservations for following day due to early morning closings
        // -- 2019/03/20: more lenient definition for what qualifies for this filter to accommodate bookings that span across midnight
        // REVIEW: Alternative to this approach -- Should we adjust the opening time (shift it back to previous day opening) as we do for the closing?
        const whileOpen = moment(booking.fromDate).isBetween(openingTime, closingTime, null, []) || moment(booking.toDate).isBetween(openingTime, closingTime, null, [])
        // Deduping is needed due to bookings that cross over midnight
        // -- these are returned twice...Once for today's bookings and again when querying for tomorrow's bookings
        const dedupe = allBookings.findIndex(b => b.bookId === booking.bookId) === index
        return thisRoom &&
          confirmed &&
          whileOpen &&
          dedupe
      })
      // Sort by start time
      .sortBy('fromDate')
      // Merge consecutive bookings by same patron
      // -- because LibCal's UI is still perplexing to a significant percentage of users
      .filter(function (booking, index, allBookings) {
        if (index > 0) {
          var prevBooking = allBookings[index - 1]
          var prevEmail = prevBooking.email
          var prevEnd = prevBooking.toDate
        }
        if (booking.email === prevEmail && booking.fromDate === prevEnd) {
          prevBooking.toDate = booking.toDate
          return false
        }
        return true
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
        return moment().isSameOrBefore(booking.toDate)
      })
      .value()

    return roomAvailability
  },
  isEarlyMorningClosing: function (closing) {
    // REVIEW: Revisit logic/boundary for what qualifies as early morning closing
    // -- for now, running with after Midnight but before 6am
    let closingInMinutes = closing.minutes() + closing.hours() * 60
    return closingInMinutes > 0 && closingInMinutes < 360
  },
  realClosingTime: function (closing, yesterdayCheck = false) {
    // TODO: Utilize isEarlyMorningClosing() here -- needs to be tweaked
    const isEarlyMorning = moment(closing, libCal.timeFormat).isBefore(moment('6am', libCal.timeFormat))

    // When checking if still open from yesterday, subtract a day
    if (yesterdayCheck) {
      return isEarlyMorning ? closing : closing.subtract(1, 'day')
    }

    // Otherwise add a day for proper comparison with today's closing time
    return isEarlyMorning ? closing.add(1, 'day') : closing
  },
  formatDate: function (date) {
    return moment(date).format('Y-MM-DD')
  },
  formatStatusChange: function (datetime) {
    const statusChange = datetime === null ? 'no upcoming openings' : moment(datetime).calendar()
    return statusChange === '12:00 am' ? 'Midnight' : statusChange
  },
  formatTime: function (date) {
    return moment(date).format(libCal.timeFormat)
  },
  getHours: function (axios, location, category, date, isDesk = false) {
    const requestDate = typeof date === 'undefined' ? '' : '&date=' + libCal.formatDate(date)
    if (isDesk) {
      var libcalId = schema.desks[location].hoursId
    } else {
      libcalId = schema.locations[location].categories[category].hoursId || schema.locations[location].hoursId
    }
    const url = libCal.api.endpoints.hours + libcalId + requestDate

    return axios.$get(url)
  },
  async getReservations (axios, location, date = false) {
    const requestDate = date ? '&date=' + libCal.formatDate(date) : ''
    const scope = 'lid=' + schema.locations[location].id
    const url = libCal.api.endpoints.spaces.bookings + scope + requestDate

    let authorize = await axios.$post(libCal.api.endpoints.auth)
    axios.setToken(authorize.access_token, 'Bearer')

    return axios.$get(url)
  },
  nextDay: function (lastUpdated) {
    return moment().isAfter(moment(lastUpdated), 'd')
  },
  async nextOpening (axios, location, category, isDesk = false) {
    var bigWinner = null

    // Check today plus next 14 days
    for (var i = 0; i < 15; i++) {
      var dateToCheck = moment().add(i, 'days')
      var openingTime = await libCal.openingTime(axios, location, category, libCal.formatDate(dateToCheck), isDesk)

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
  async hoursForDate (axios, location, category, date, isDesk = false) {
    let feed = await libCal.getHours(axios, location, category, date, isDesk)

    // Account for LibCal returning an empty array under certain key conditions
    // -- such as when requesting hours for a date in the past beyond the current week
    // -- (LibCal weeks start on Sunday)
    // TODO: Reach out to Springshare support and request they increase this limit to past 2 weeks
    if (feed.length === 0) return null

    const hours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours

    return hours
  },
  async openingTime (axios, location, category, date, isDesk = false) {
    const hours = await libCal.hoursForDate(axios, location, category, date, isDesk)

    // Copy hours since it gets emptied after using as function param
    // -- TODO: Consider immutable.js or seamless-immutable
    const hoursClone = hours !== null ? hours.slice(0) : null

    // If dealing with today, ensure we're not already closed
    if (moment().isSame(moment(date), 'd') && libCal.alreadyClosed(hoursClone)) {
      return null
    }

    return hours !== null ? moment(hours[0].from, libCal.timeFormat) : null
  },
  async closingTime (axios, location, category, date, isDesk = false) {
    // Check if still open from yesterday first
    const requestedDate = typeof date === 'undefined' ? moment() : date
    const yesterday = requestedDate.subtract(1, 'days')
    const stillOpenFromYesterday = await libCal.stillOpenFromYesterday(axios, location, category, yesterday, isDesk)

    // If so, return yesterday's closing time since it hasn't happened yet ;)
    if (stillOpenFromYesterday) return stillOpenFromYesterday

    // Otherwise, proceed with determining today's closing
    const hours = await libCal.hoursForDate(axios, location, category, date, isDesk)

    let closingTime = hours !== null ? moment(hours[0].to, libCal.timeFormat) : null

    if (closingTime) {
      // Account for early morning closings the following day
      // -- LibCal only returns time, no date, so add a day to early morning closings for true comparisons
      closingTime = libCal.realClosingTime(closingTime)
    }

    return closingTime
  },
  async openNow (axios, location, category, libcalStatus, hours, isDesk = false) {
    // Assume closed
    let status = {
      current: 'closed',
      timestamp: moment() // Use for caching results from LibCal API
    }

    // Before even considering today's hours, check if still open from yesterday
    const yesterday = moment().subtract(1, 'days')
    const stillOpenFromYesterday = await libCal.stillOpenFromYesterday(axios, location, category, yesterday, isDesk)

    if (stillOpenFromYesterday) {
      status.current = 'open'
      status.change = stillOpenFromYesterday
      return status
    }

    // If not still open from yesterday, proceed with checking today's hours
    if (hours) {
      // Account for potential of multiple openings/closings in a given day
      const isOpen = hours.find((hoursBlock) => {
        // Account for early morning closings the following day
        // -- LibCal only returns time, no date, so add a day to early morning closings for true comparisons
        const closingTime = libCal.realClosingTime(moment(hoursBlock.to, libCal.timeFormat))
        return (moment().isBetween(moment(hoursBlock.from, libCal.timeFormat), closingTime, null, []))
      })

      if (isOpen !== undefined) {
        status.current = 'open'
        status.change = moment(isOpen.to, libCal.timeFormat)
        return status
      }
    }

    // If we made it this far, the original assumption of closed was correct...congrats
    let statusChange = await libCal.nextOpening(axios, location, category, isDesk)

    status.change = statusChange

    if (libcalStatus === 'ByApp') {
      status.current = 'by appointment'
    }

    return status
  },
  async stillOpenFromYesterday (axios, location, category, yesterday, isDesk = false) {
    const yesterdayHours = await libCal.hoursForDate(axios, location, category, yesterday, isDesk)

    // Catch empty response from LibCal when requesting past dates beyond current week
    // -- more details in hoursForDate()
    if (!yesterdayHours) return false

    // If multiple openings/closings, compare against last one for the day
    let yesterdayClosing = moment(yesterdayHours.pop().to, libCal.timeFormat)

    // Check for early morning close
    // -- indicate a check for yesterday's hours via 'true' for second param
    yesterdayClosing = libCal.realClosingTime(yesterdayClosing, true)

    // Return yesterday's closing time for truthy
    return (moment().isBefore(yesterdayClosing)) ? yesterdayClosing : false
  },
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
  reserveUrl: function (location, category) {
    return schema.locations[location].categories[category].url || schema.locations[location].url || null
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
