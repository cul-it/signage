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
    if (bookings) {
      // Account for single reservation (create array)
      bookings = Array.isArray(bookings) ? bookings : [bookings]
    } else {
      // Account for R25 not returning an empty array if no reservations exist
      bookings = []
    }
    const svelte = bookings
      // Trim API response to bare essentials
      .map(b => {
        return {
          bookId: Number(b.event.event_id._text),
          description: b.event.event_title._text || '',
          fromDate: b.reservation_start_dt._text,
          spaceId: Number(b.spaces.space_id._text),
          title: b.event.event_name._text,
          toDate: b.reservation_end_dt._text,
          // Vestigial keys to appease default LibCal structure
          firstName: '',
          lastName: ''
        }
      })
      // Merge cross-listed courses
      .filter(function (booking, index, allBookings) {
        const prevStart = index > 0 ? allBookings[index - 1].fromDate : null
        if (booking.fromDate === prevStart) {
          allBookings[index - 1].title += ', ' + booking.title
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

    // TODO: Need to address available slots for days sans reservations!
    // // Insert 'available until closing' slot for any space with empty schedule
    // Object.keys(spaces).forEach(s => {
    //   if (typeof space[s] === 'undefined' || !space[s].schedule.length) {
    //     const availableTilClose = libCal.availableSlot(opening, closing)
    //     availableTilClose.lastUp = true
    //
    //     space[s] = {
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
        // If more than 30 minute gap between this and previous booking, pad before (aka between)
        // -- Historically we have curated classroom availability to prevent/discourage patrons
        // -- coming in to use public machines between two back-to-back classes
        if (prevIndex > -1 &&
          moment(booking.fromDate).isAfter(moment(allBookings[prevIndex].toDate).add(30, 'minutes'))
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
  async getReservations (axios, space, date = false) {
    const requestDate = date ? '&start_dt=' /* + libCal.formatDate(date) */ : ''
    const url = r25.api.endpoints.spaces + space.id + requestDate
    const response = await axios.$get(url)

    // All we care about is the array of reservations
    return response.space_reservations.space_reservation
  },
  isR25: function (location, category) {
    return schema.locations[location].categories[category].r25
  }
}

export default r25
