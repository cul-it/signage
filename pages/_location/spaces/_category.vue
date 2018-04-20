<template>
  <div class="studyrooms">
    <header class="studyrooms__datetime">
      <time class="studyrooms__date">{{ currentDate }}</time>
      <time class="studyrooms__time" v-html="currentTime"/>
    </header>

    <div class="studyrooms__availability">
      <space-availability
        v-for="room in rooms"
        :key="room"
        :room="room"
        :opening="opening"
        :closing="closing"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import Robin from '~/utils/libcal.js'
import SpaceAvailability from '~/components/SpaceAvailability'

export default {
  head () {
    return {
      title: 'Reservable Study Rooms',
      titleTemplate: '%s - Mann Library',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:100,400,700' }
      ]
    }
  },
  data () {
    return {
      rooms: [272, 271, 270]
    }
  },
  components: {
    SpaceAvailability: SpaceAvailability
  },
  computed: {
    ...mapState({
      currentDate: state => moment(state.time.now).format('ddd D'),
      currentTime: state => moment(state.time.now).format('h[<span class="blink">:</span>]mm A')
    })
  },
  async fetch ({ store, route }) {
    console.log('fetcher', route)
    await store.dispatch('spaces/primeSpaces', this.rooms)
    // await store.dispatch('spaces/fetchSchedule', {
    //   location: Robin.api.libraries.mann.locations.studyrooms
    // })
  },
  async asyncData ({ app }) {
    // const mannLocId = Robin.api.libraries.mann.id
    const closing = await Robin.closingTime(app.$axios)
    const opening = await Robin.openingTime(app.$axios)
    return {
      closing: closing,
      opening: opening
    }
  }
}
</script>

<style lang="scss">
// TODO: DRY util styles
// -- Most likely via nuxt-sass-resources-loader
// -- https://github.com/anteriovieira/nuxt-sass-resources-loader
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
.studyrooms {
  font-family: 'Lato', sans-serif;

  &__availability {
    display: grid;
    clear: both;
    grid-column-gap: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
  &__datetime {
    font-size: 2.1em;
  }
  &__date {
    float: left;
    font-weight: 700;
    text-transform: uppercase;
  }
  &__room {
    text-align: center;
  }
  &__time {
    float: right;
    font-weight: 100;
  }
}
</style>
