<template>
  <div class="studyrooms__room">
    <h1 class="room__number">{{ room }}</h1>

    {{ libcalSpaceId }}

    <ul class="room__slot-list">
      <li
        v-for="booking in roomSchedule"
        :key="booking.bookId"
        :class="['room__slot', {'room__slot--available': booking.isAvailable}]"
      >
        <time class="slot__start">
          {{ booking.startTime.hour }}
          <div class="start__stack">
            <span class="start__minutes">{{ booking.startTime.minute }}</span>
            <span class="start__meridiem">{{ booking.startTime.meridiem }}</span>
          </div>
        </time>
        <span v-if="!booking.isAvailable">
          {{ booking.firstName }} {{ booking.lastName[0] }}.
        </span>
        <span v-else>
          Available
        </span>
        <span v-if="booking.lastUp" class="room__closing">until closing at 12:00 am</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Robin from '~/utils/libcal.js'

// Load mock LibCal bookings data for initial development
// -- TODO: Remove mock data and load-json-file package
const loadJsonFile = (process.server ? require('load-json-file') : null)
const bookingsMock = loadJsonFile.sync('data-mocks/libcal-studyroom-bookings.json')

export default {
  data () {
    return {
      bookings: bookingsMock,
      libcalSpaceId: Robin.api.spaces[this.room].id
    }
  },
  computed: {
    roomSchedule () {
      return Robin.bookingsYeah(this.bookings, this.room, this.closingTime)
    }
  },
  props: [
    'closingTime',
    'room'
  ]
}
</script>

<style lang="scss">
.room__closing {
  display: block;
  color: #fff;
  font-size: .5em;
  font-weight: 100;
}
.room__number {
  margin: 0;
  font-size: 6em;
}
.room__slot {
  position: relative;
  margin: .4em 0;
  padding: .5em;
  font-size: 2em;
  color: #d93663;
  border-radius: .3em;
  background: #192639;

  &--available {
    color: #7edafe;
  }
}
.room__slot-list {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}
.slot__start {
  position: absolute;
  left: 5px;
  color: #fff;
  display: flex;
  font-size: 1.1em;
}
.start__stack {
  margin-top: .1em;
  display: inline-flex;
  flex-direction: column;
}
.start__meridiem,
.start__minutes {
  align-self: flex-end;
  font-size: .5em;
}
.start__meridiem {
  font-weight: 100;
  line-height: .3em;
}
</style>
