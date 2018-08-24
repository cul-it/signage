<template>
  <div class="space">
    <h1 class="space__number">{{ space }}</h1>

    <!-- TODO: Refactor logic for FA icons -->
    <i class="fas space__type" aria-hidden="true"
      :class="{ 'fa-users': space == 270, 'fa-user': space != 270 }"
    ></i>

    <ul class="space__slot-list">
      <li v-if="hours.status === 'closed'" class="space__slot">
        <span class="space__status--closed">{{ hours.status }}</span>
        <span class="space__closing">until {{ relativeStatusChange }}</span>
      </li>
      <li v-else
        v-for="booking in spaceSchedule"
        :key="booking.bookId"
        :class="['space__slot', {'space__slot--available': booking.isAvailable}]"
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
        <span v-if="booking.lastUp" class="space__closing">until closing at {{ relativeStatusChange }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Robin from '~/utils/libcal.js'

export default {
  computed: {
    spaceSchedule () {
      return this.$store.state.spaces[this.space].schedule
    },
    relativeStatusChange () {
      return Robin.formatStatusChange(this.hours.statusChange)
    }
  },
  props: [
    'hours',
    'space'
  ]
}
</script>

<style lang="scss">
// TODO: Revisit font scaling and pull variables into global include (DRY)
$sf: 1.43vw;

.space {
  text-align: center;
}
.space__closing {
  display: block;
  color: #fff;
  font-size: 1 * $sf;
  font-weight: 100;
}
.space__number {
  margin: 0;
  font-size: 4 * $sf;
  line-height: .7em;
}
.space__slot {
  position: relative;
  margin: .4em 0;
  padding: .5em;
  font-size: 2 * $sf;
  color: #d93663;
  border-radius: .3em;
  background: #192639;

  &--available {
    color: #7edafe;
  }
}
.space__slot-list {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}
.space__status--closed {
  text-transform: capitalize;
}
.space__type {
  position: absolute;
  margin-left: -.43em;
  line-height: 1.4em;
  font-size: 1.6 * $sf;
  color: #657c8a;
  z-index: 10000;
}
.fa-users {
  margin-left: -.63em;
  line-height: 1.2em;
  font-size: 1.9 * $sf;
}
.slot__start {
  position: absolute;
  left: 5px;
  color: #fff;
  display: flex;
  font-size: 2.2 * $sf;
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
