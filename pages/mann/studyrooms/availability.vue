<!-- TODO: Remove mock studyroom component -->
<template>
  <div class="studyrooms">
    <header class="studyrooms__datetime">
      <time class="studyrooms__date">{{ currentDate }}</time>
      <time class="studyrooms__time" v-html="currentTime"/>
    </header>

    <!-- <mann-studyrooms-mock /> -->

    <div class="studyrooms__availability">
      <mann-studyroom-availability
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
import RoomAvailability from '~/components/MannStudyroomAvailability'
import MannStudyroomsMock from '~/components/MannStudyroomsLcdMock'

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
    MannStudyroomAvailability: RoomAvailability,
    MannStudyroomsMock: MannStudyroomsMock
  },
  computed: {
    ...mapState({
      currentDate: state => moment(state.time.now).format('ddd D'),
      currentTime: state => moment(state.time.now).format('h[<span class="blink">:</span>]mm A')
    })
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
    // justify-items: center;
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
