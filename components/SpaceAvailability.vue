<template>
  <b-col cols="4">
    <b-row>
      <b-col cols="8">
        <h1 class="space__number">
          {{ space }}
        </h1>
      </b-col>

      <b-col
        cols="4"
        class="text-right"
      >
        <i
          v-if="capacity"
          :class="{ 'fa-users': capacity === 'group', 'fa-user': capacity === 'individual' }"
          class="fas space__type"
          aria-hidden="true"
        />
      </b-col>
    </b-row>

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
        v-for="(booking, index) in spaceSchedule"
        v-else
        :key="booking.bookId"
        :booking="booking"
        :index="index"
        :status-change="relativeStatusChange"
      >
        <!-- Desktop availability when applicable -->
        <template
          slot="desktopAvailability"
        >
          {{ availableDesktops($route.params.location, space) }}
        </template>

        <!-- Override default LibCal slot content if dealing with R25 spaces -->
        <template
          v-if="isR25"
          slot="bookingInfo"
        >
          <div class="space__slot--r25">
            <h3 class="slot__title">
              {{ booking.title }}
            </h3>
            <span class="slot__description">{{ booking.description }}</span>
          </div>
        </template>
      </space-availability-item>
    </ul>
  </b-col>
</template>

<script>
import labStats from '~/utils/labstats'
import libCal from '~/utils/libcal.js'
import r25 from '~/utils/r25.js'
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
    isR25 () {
      return r25.isR25(this.$route.params.location, this.$route.params.category)
    },
    relativeStatusChange () {
      return libCal.formatStatusChange(this.hours.statusChange)
    },
    spaceSchedule () {
      return this.$store.state.spaces[this.space].schedule
    }
  },
  methods: {
    availableDesktops (location, space) {
      if (labStats.isLabstats(location, this.$route.params.category)) {
        const desktops = this.$store.state.desktops
        return typeof desktops[location][space] === 'undefined' ? null : desktops[location][space]
      }
    }
  }
}
</script>

<style lang="scss">
// TODO: Revisit font scaling and pull variables into global include (DRY)
$sf: 1.43vw;

.slot__description {
  font-weight: 300;
}
.slot__title {
  margin: 0;
  font-weight: normal;
}
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

  &--r25 {
    font-size: .55em;
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
.fa, .fas {
  font-size: 4 * $sf;
}
.col-4 {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
