<template>
  <div class="space">
    <h2 class="space__number">
      {{ space }}
    </h2>

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
      <mann-circ-space-item
        v-for="(booking, index) in spaceSchedule.slice(0, 2)"
        v-else
        :key="booking.bookId"
        :booking="booking"
        :index="index"
        :status-change="relativeStatusChange"
      >
        <!-- Desktop availability when applicable -->
        <!-- <template
          slot="desktopAvailability"
        >
          {{ availableDesktops($route.params.location, space) }}
        </template> -->

        <!-- Override default LibCal slot content if dealing with R25 spaces -->
        <!-- <template
          v-if="isR25"
          slot="bookingInfo"
        >
          <div class="space__slot--r25">
            <h3 class="slot__title">
              {{ booking.title }}
            </h3>
            <span class="slot__description">{{ booking.description }}</span>
          </div>
        </template> -->
      </mann-circ-space-item>
    </ul>
  </div>
</template>

<script>
import labStats from '~/utils/labstats'
import libCal from '~/utils/libcal.js'
import r25 from '~/utils/r25.js'
import MannCircSpaceItem from '~/components/MannCircSpaceItem'

export default {
  components: {
    MannCircSpaceItem
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
  .lobby & {
    display: block;
    flex: 1 1 0;
    margin-right: .75rem;

    &:last-of-type {
      margin: 0 0 0 .75rem;
    }
  }

  display: contents;
  text-align: center;
}
.space__closing {
  display: block;
  color: #f7fafc;
  font-size: 1 * $sf;

  .space__slot--available & {
    color: #192639;
  }
}
.space__number {
  align-self: center;
  margin: 0;
  font-size: 1.8 * $sf;
}
.space__slot {
  display: grid;
  place-content: center center;
  position: relative;
  flex: 1 1 0;
  padding: 0 0.2em;
  font-size: 2 * $sf;
  color: #fff;
  // border-radius: .3em;
  background: #2e4a61;

  &--available {
    background: #009edd;
  }

  &--r25 {
    font-size: .55em;
  }
}
.space__slot-list {
  display: flex;
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
