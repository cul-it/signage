<template>
  <div class="space">
    <h1 class="space__number">{{ space }}</h1>

    <i
      v-if="capacity"
      :class="{ 'fa-users': capacity === 'group', 'fa-user': capacity === 'individual' }"
      class="fas space__type"
      aria-hidden="true"
    />

    <ul class="space__slot-list">
      <!-- TODO: Ideally this would move to SpaceAvailabilityItem component
      along with applicable style -->
      <li
        v-if="hours.status === 'closed'"
        class="space__slot"
      >
        <span class="space__status--closed">{{ hours.status }}</span>
        <span class="space__closing">until {{ relativeStatusChange }}</span>
      </li>
      <space-availability-item
        v-for="booking in spaceSchedule"
        v-else
        :key="booking.bookId"
        :booking="booking"
        :status-change="relativeStatusChange"
      >
        <template
          v-if="$route.params.category === 'b30'"
          slot="bookingInfo"
        >
          {{ booking.firstName }} <br> {{ booking.lastName }}
        </template>
      </space-availability-item>
    </ul>
  </div>
</template>

<script>
import libCal from '~/utils/libcal.js'
import SpaceAvailabilityItem from '~/components/SpaceAvailabilityItem'

export default {
  components: {
    SpaceAvailabilityItem
  },
  props: {
    hours: {
      type: Object,
      required: true
    },
    space: {
      type: String,
      required: true
    }
  },
  computed: {
    capacity () {
      return this.$store.state.spaces[this.space].capacity || null
    },
    spaceSchedule () {
      return this.$store.state.spaces[this.space].schedule
    },
    relativeStatusChange () {
      return libCal.formatStatusChange(this.hours.statusChange)
    }
  }
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
  color: #192639;
  font-size: 1 * $sf;
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
  color: #fff;
  border-radius: .3em;
  background: #d93663;

  &--available {
    background: #009edd;
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
  z-index: 10000;
}
.fa-users {
  margin-left: -.63em;
  line-height: 1.2em;
  font-size: 1.9 * $sf;
}
</style>
