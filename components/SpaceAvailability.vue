<template>
  <div class="studyrooms__room">
    <h1 class="room__number">{{ room }}</h1>

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
        <span v-if="booking.lastUp" class="room__closing">until closing at {{ closingTime }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Robin from '~/utils/libcal.js'

export default {
  data () {
    return {
      closingTime: Robin.formatTime(this.closing)
    }
  },
  computed: {
    roomSchedule () {
      return this.$store.state.spaces[this.room].schedule
    }
  },
  props: [
    'closing',
    'opening',
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
