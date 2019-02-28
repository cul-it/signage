import schema from '~/utils/schema'
import libCal from '~/utils/libcal'
import _ from 'lodash'
import moment from 'moment'

const r25 = {
  api: {
    endpoints: {
      spaces: 'r25/rm_reservations.xml?otransform=json.xsl&space_id='
    }
  },
  buildSchedule: (bookings, spaces, opening, closing) => {
    let space = {}
    // Account for single reservation (create array)
    bookings = Array.isArray(bookings) ? bookings : [bookings]
    const svelte = bookings
      // Trim API response to bare essentials
      .map(b => {
        return {
          id: Number(b.event.event_id._text),
          fromDate: b.reservation_start_dt._text,
          firstName: b.event.event_name._text,
          // REVIEW: Is empty string needed once we customize template for classrooms?
          lastName: b.event.event_title._text || '',
          spaceId: Number(b.spaces.space_id._text),
          toDate: b.reservation_end_dt._text
        }
      })
      // Merge cross-listed courses
      .filter(function (booking, index, allBookings) {
        const prevStart = index > 0 ? allBookings[index - 1].fromDate : null
        if (booking.fromDate === prevStart) {
          allBookings[index - 1].firstName += ', ' + booking.firstName
          return false
        }
        return true
      })
    svelte
      // Add schedule object for each space
      .forEach(b => {
        // Use room name from schema
        let name = Object.entries(spaces).find(s => s[1].id === b.spaceId)[0]

        space[name] = {
          id: b.spaceId,
          capacity: spaces[name].capacity,
          schedule: r25.bookingsParser(svelte, b.spaceId, opening, closing)
        }
      })

    // // Insert 'available until closing' slot for any space with empty schedule
    // Object.keys(spaces).forEach(s => {
    //   if (typeof schedule[s] === 'undefined' || !schedule[s].schedule.length) {
    //     const availableTilClose = libCal.availableSlot(opening, closing)
    //     availableTilClose.lastUp = true
    //
    //     schedule[s] = {
    //       id: spaces[s].id,
    //       capacity: spaces[s].capacity,
    //       schedule: [availableTilClose]
    //     }
    //   }
    // })

    return space
  },
  bookingsParser: function (bookings, room, openingTime, closingTime) {
    const roomAvailability = _(bookings)
      // Filter bookings by room, status(confirmed), and while open
      // .filter(function (booking, index, allBookings) {
      //   const confirmed = booking.status === 'Confirmed'
      //   const thisRoom = booking.eid === room
      //   return thisRoom &&
      //     confirmed
      // })
      // Sort by start time
      // .sortBy('fromDate')
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
  async getReservations (axios, spaces, date = false) {
    const requestDate = date ? '&start_dt=' /* + libCal.formatDate(date) */ : ''

    const url = r25.api.endpoints.spaces + spaces.id + requestDate
    const response = await axios.$get(url)

    // All we care about is the array of reservations
    return response.space_reservations.space_reservation
  },
  isR25: function (location, category) {
    return schema.locations[location].categories[category].r25
  }
}

export default r25
