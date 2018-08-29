import api from '~/utils/libcal-schema'
import _ from 'lodash'
import moment from 'moment'

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
  timeFormat: 'h:mm a',
  alreadyClosed: function (hours) {
    if (hours === null) return false
    // If multiple openings/closings, compare against last one for the day
    let lastClosing = moment(hours.pop().to, libCal.timeFormat)

    lastClosing = libCal.earlyMorningClose(lastClosing)

    return moment().isSameOrAfter(lastClosing)
  },
  availableSlot: function (start, end) {
    // QUESTION: Unique ID necessary for available slots?
    return {
      bookId: 'avail_randomString',
      fromDate: start,
      toDate: end,
      isAvailable: true,
      startTime: libCal.parseDate(start)
    }
  },
  buildSchedule: (bookings, location, spaces, opening, closing) => {
    let schedule = {}
    bookings
      // Only include reservations for requested spaces
      .filter(b => _.includes(Object.values(spaces).map(s => s.id), b.eid))
      // Add schedule object for each space
      .forEach(b => {
        // console.log('include?', _.includes(Object.values(spaces).map(s => s.id), b.eid), '|', Object.values(spaces).map(s => s.id), '|', b.eid)

        // Use room name from schema
        // let room = Object.entries(spaces).find(s => s[1].id === b.eid)[0]
        let name = Object.entries(spaces).find(s => s[1].id === b.eid)[0]

        schedule[name] = {
          id: b.eid,
          schedule: libCal.bookingsYeah(bookings, b.eid, opening, closing)
        }
      })

    // Insert 'available until closing' slot for any space with empty schedule
    Object.keys(spaces).forEach(s => {
      if (typeof schedule[s] === 'undefined') {
        const availableTilClose = libCal.availableSlot(opening, closing)
        availableTilClose.lastUp = true

        schedule[s] = {
          id: spaces[s].id,
          schedule: [availableTilClose]
        }
      }
    })

    return schedule
  },
  requestedSpaces: (location, category) => {
    const spacesInCategory = api.locations[location].categories[category].spaces
    let spaces = []
    spacesInCategory
      .forEach(s => spaces.push({ 'id': s.id, 'name': s.room }))
    if (category === 'studyrooms') spaces.reverse()
    return spaces
  },
  bookingsYeah: function (bookings, room, openingTime, closingTime) {
    const roomAvailability = _(bookings)
      // Filter bookings by room, status(confirmed), and while open
      .filter(function (booking, index, allBookings) {
        const confirmed = booking.status === 'Confirmed'
        const thisRoom = booking.eid === room
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
        return moment().isSameOrBefore(booking.toDate)
      })
      .value()

    // console.log('----------------\nALL THE THINGS!\n----------------\n', roomAvailability)

    return roomAvailability
  },
  earlyMorningClose: function (closing) {
    return moment(closing, libCal.timeFormat).isBefore(moment('6am', libCal.timeFormat)) ? closing.add(1, 'day') : closing
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
  getHours: function (axios, location, date, isDesk = false) {
    const requestDate = typeof date === 'undefined' ? '' : '&date=' + libCal.formatDate(date)
    const locId = isDesk ? api.desks[location].hoursId : api.locations[location].hoursId
    const url = api.endpoints.hours + locId + requestDate

    return axios.$get(url)
  },
  async getReservations (axios, location, date = false) {
    const requestDate = date ? '&date=' + libCal.formatDate(date) : ''
    const scope = 'lid=' + api.locations[location].id
    const url = api.endpoints.spaces.bookings + scope + requestDate

    // console.log('where to?', url)

    let authorize = await axios.$post(api.endpoints.auth)
    axios.setToken(authorize.access_token, 'Bearer')

    return axios.$get(url)
  },
  nextDay: function (lastUpdated) {
    return moment().isAfter(moment(lastUpdated), 'd')
  },
  async nextOpening (axios, location, isDesk = false) {
    var bigWinner = null

    // Check today plus next 14 days
    for (var i = 0; i < 15; i++) {
      var dateToCheck = moment().add(i, 'days')
      var openingTime = await libCal.openingTime(axios, location, libCal.formatDate(dateToCheck), isDesk)

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
  async hoursForDate (axios, location, date, isDesk = false) {
    let feed = await libCal.getHours(axios, location, date, isDesk)
    const hours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours

    return hours
  },
  async openingTime (axios, location, date, isDesk = false) {
    const hours = await libCal.hoursForDate(axios, location, date, isDesk)

    // Copy hours since it gets emptied after using as function param
    // -- TODO: Consider immutable.js or seamless-immutable
    const hoursClone = hours !== null ? hours.slice(0) : null

    // If dealing with today, ensure we're not already closed
    if (moment().isSame(moment(date), 'd') && libCal.alreadyClosed(hoursClone)) {
      return null
    }

    return hours !== null ? moment(hours[0].from, libCal.timeFormat) : null
  },
  async closingTime (axios, location, date, isDesk = false) {
    const hours = await libCal.hoursForDate(axios, location, date, isDesk)

    let closingTime = hours !== null ? moment(hours[0].to, libCal.timeFormat) : null

    if (closingTime) {
      // Account for early morning closings the following day
      // -- LibCal only returns time, no date, so add a day to early morning closings for true comparisons
      closingTime = libCal.earlyMorningClose(closingTime)
    }

    return closingTime
  },
  async openNow (axios, location, libcalStatus, hours, isDesk = false) {
    let status = {
      current: 'closed',
      timestamp: moment() // Use for caching results from LibCal API
    }

    if (hours) {
      // Account for potential of multiple openings/closings in a given day
      const isOpen = hours.find((hoursBlock) => {
        // Account for early morning closings the following day
        // -- LibCal only returns time, no date, so add a day to early morning closings for true comparisons
        const closingTime = libCal.earlyMorningClose(moment(hoursBlock.to, libCal.timeFormat))
        return (moment().isBetween(moment(hoursBlock.from, libCal.timeFormat), closingTime, null, []))
      })

      if (isOpen !== undefined) {
        status.current = 'open'
        status.change = moment(isOpen.to, libCal.timeFormat)
        return status
      }
    }

    let statusChange = await libCal.nextOpening(axios, location, isDesk)

    status.change = statusChange

    if (libcalStatus === 'ByApp') {
      status.current = 'by appointment'
    }

    return status
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
