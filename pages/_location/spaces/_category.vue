<template>
  <div class="spaces">
    <header class="spaces__datetime">
      <time class="spaces__date">{{ currentDate }}</time>
      <a v-if="url" class="spaces__reserve-link" :href="url">{{ urlClean }}</a>
      <time class="spaces__time" v-html="currentTime"/>
    </header>

    <div class="spaces__availability">
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
import Robin from '~/utils/libcal'
import SpaceAvailability from '~/components/SpaceAvailability'

export default {
  head () {
    return {
      title: this.capitalize(this.$route.params.category),
      titleTemplate: this.capitalize(this.$route.params.location) + ' - %s',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:100,400,700' },
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
      return Object.keys(this.$store.state.spaces)
    },
    url () {
      return Robin.reserveUrl(this.$route.params.location)
    },
    urlClean () {
      return this.url.replace(/(^\w+:|^)\/\//, '')
    }
  },
  fetch: async ({ store, params }) => {
    await store.dispatch('spaces/primeSpaces', Robin.requestedSpaces(params.location, params.category))
    await store.dispatch('hours/fetch', {
      location: params.location
    })
    await store.dispatch('spaces/fetchSchedule', {
      location: params.location
    })
  },
  methods: {
    capitalize (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
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
        location: this.$route.params.location
      })
    }, 1000 * 30)

    // Check for reservation changes every minute
    setInterval(() => {
      this.$store.dispatch('spaces/fetchSchedule', {
        location: this.$route.params.location
      })
    }, 1000 * 60)
  }
}
</script>

<style lang="scss">
// TODO: DRY util styles & variables
// -- Most likely via nuxt-sass-resources-loader
// -- https://github.com/anteriovieira/nuxt-sass-resources-loader
$sf: 1.43vw;

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
    grid-template-columns: 1fr 1fr 1fr;
    padding-top: 2.5em;
  }
  &__datetime {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    font-size: 1.8 * $sf;
  }
  &__date {
    text-transform: uppercase;
  }
  &__reserve-link {
    text-align: center;
    color: #fff;
    text-decoration: none;
    font-size: .9em
  }
  &__time {
    text-align: right;
  }
}
</style>
