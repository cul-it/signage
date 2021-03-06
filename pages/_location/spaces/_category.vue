<template>
  <div class="spaces">
    <header class="spaces__datetime">
      <time class="spaces__date">{{ currentDate }}</time>
      <a
        :href="url"
        class="spaces__reserve-link"
      >{{ urlClean }}</a>
      <!-- eslint-disable vue/no-v-html -->
      <time
        class="spaces__time"
        v-html="currentTime"
      />
      <!-- eslint-enable vue/no-v-html -->
    </header>

    <div :class="'spaces__availability col-' + spaces.length">
      <space-availability
        v-for="space in spaces"
        :key="space"
        :space="space"
        :hours="hours"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import signage from '~/utils/core'
import labStats from '~/utils/labstats'
import libCal from '~/utils/libcal'
import SpaceAvailability from '~/components/SpaceAvailability'

export default {
  head () {
    return {
      title: signage.capitalize(this.$route.params.category),
      titleTemplate: signage.capitalize(this.$route.params.location) + ' - %s',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700' },
        // TODO: Use packages for officiaal Vue.js component
        // -- https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous' }
      ]
    }
  },
  components: {
    SpaceAvailability: SpaceAvailability
  },
  computed: {
    ...mapState({
      currentDate: state => moment(state.time.now).format('ddd D'),
      currentTime: state => moment(state.time.now).format('h[<span class="blink">:</span>]mm A')
    }),
    hours () {
      return this.$store.state.hours
    },
    spaces () {
      return libCal.sortSpaces(Object.keys(this.$store.state.spaces), this.$route.params.category)
    },
    url () {
      return libCal.reserveUrl(this.$route.params.location, this.$route.params.category)
    },
    urlClean () {
      return this.url ? this.url.replace(/(^\w+:|^)\/\//, '') : ''
    }
  },
  fetch: async ({ store, params }) => {
    await store.dispatch('spaces/primeSpaces', libCal.requestedSpaces(params.location, params.category))
    await store.dispatch('hours/fetch', {
      location: params.location,
      category: params.category
    })
    await store.dispatch('spaces/fetchSchedule', {
      location: params.location,
      category: params.category
    })
    // Fetch desktop availability from LabStats only when applicable
    if (labStats.isLabstats(params.location, params.category)) {
      await store.dispatch('desktops/fetchStatus', params.location)
    }
  },
  mounted () {
    // Sync current time every 10 seconds
    // -- ideally, this would happen within the store itself (as part of the action),
    // -- but encountered a bug when attempting this via Nuxt. No issue in vanilla Vue.
    setInterval(() => {
      this.$store.dispatch('time/sync')
    }, 1000 * 10)

    // Update hours every 30 seconds
    setInterval(() => {
      this.$store.dispatch('hours/fetch', {
        location: this.$route.params.location,
        category: this.$route.params.category
      })
    }, 1000 * 30)

    // Check LabStats for desktop availability every 30 seconds (if applicable)
    if (labStats.isLabstats(this.$route.params.location, this.$route.params.category)) {
      setInterval(() => {
        this.$store.dispatch('desktops/fetchStatus', this.$route.params.location)
      }, 1000 * 30)
    }

    // Check for reservation changes every minute
    setInterval(() => {
      this.$store.dispatch('spaces/fetchSchedule', {
        location: this.$route.params.location,
        category: this.$route.params.category
      })
    }, 1000 * 60)
  }
}
</script>

<style lang="scss">
// TODO: DRY util styles & variables
// -- Most likely via nuxt-sass-resources-loader
// -- https://github.com/anteriovieira/nuxt-sass-resources-loader
$columns: 4;
$sf: 1.43vw;

// Repeat function inspired by native CSS repeat & incomparable Miriam Suzanne
// -- https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
// -- https://oddbird.net/susy/docs/config.html#function--susy-repeat
@function cul-repeat($count, $value: 1) {
  $return: ();

  @for $i from 1 through $count {
    $return: join($return, $value);
  }

  @return $return;
}
// TODO: Revisit max number of columns/spaces supported for css-grid
// Determine column numbers based on spaces count
// -- currently support up to 4 columns via $columns variable (see above)
@mixin gen-columns {
  @for $i from 1 through $columns {
    &.col-#{$i} {
      grid-template-columns: cul-repeat($i, 1fr);
    }
  }
}

.blink {
  animation: blinker infinite cubic-bezier(1.0,0,0,1.0) 1s;
}
@keyframes blinker {
    from {
        opacity: 1.0;
    }
    to {
        opacity: 0.0;
    }
}
.spaces {
  font-family: 'Lato', sans-serif;

  &__availability {
    display: grid;
    clear: both;
    grid-column-gap: 1.5rem;
    padding-top: 2.5em;

    @include gen-columns;
  }
  &__datetime {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    font-size: 1.8 * $sf;

    // Fallback for older browsers without css-grid
    // -- primarily early gen iPads in Olin running < iOS 10.3
    @supports not (display: grid) {
      display: flex;
    }
  }
  &__date {
    text-transform: uppercase;
  }
  &__reserve-link {
    text-align: center;
    color: #fff;
    text-decoration: none;
    font-size: .9em;

    // Fallback for older browsers without css-grid
    // -- primarily early gen iPads in Olin running < iOS 10.3
    @supports not (display: grid) {
      flex-grow: 4;
    }
  }
  &__time {
    text-align: right;
  }
}
</style>
