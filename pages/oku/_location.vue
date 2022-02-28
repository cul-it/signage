<template>
  <main>
    <aside class="support-warning">
      This page requires CSS Grid and display:contents to display properly in your browser.
    </aside>

    <section class="grid">
      <time v-html="currentTime" /> <!-- eslint-disable-line vue/no-v-html -->
      <!-- <Circulation location="olin" /> -->
      <!-- <Circulation location="uris" /> -->
    </section>
  </main>
</template>

<script>
// import Circulation from '~/components/Circulation'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  head () {
    return {
      bodyAttrs: {
        class: this.libraryDisplayClass
      },
      title: this.location.toUpperCase(),
      titleTemplate: '%s Signage',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700' },
        { rel: 'stylesheet', href: 'https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css' }
      ]
    }
  },
  components: {
    // 'Circulation': Circulation
  },
  data () {
    return {
      location: this.$route.params.location
    }
  },
  computed: {
    ...mapState({
      currentTime: state => moment(state.time.now).format('MMM D / h[<span class="blink">:</span>]mm A')
    }),
    libraryDisplayClass () {
      return this.location + '-display'
    }
  },
  async fetch ({ store, params }) {
    // await store.dispatch('laptops/fetchStatus', 'olin')
    // await store.dispatch('phoneChargers/fetchStatus', 'olin')
    // await store.dispatch('laptops/fetchStatus', 'uris')
    // await store.dispatch('phoneChargers/fetchStatus', 'uris')
    await store.dispatch('folioEquipment/fetchStatus', params.location)
  },
  mounted () {
    // Sync current time every 10 seconds
    // -- ideally, this would happen within the store itself (as part of the action),
    // -- but encountered a bug when attempting this via Nuxt. No issue in vanilla Vue.
    setInterval(() => {
      this.$store.dispatch('time/sync')
    }, 1000 * 10)

    // Update equipment status every minute
    setInterval(() => {
      // this.$store.dispatch('laptops/fetchStatus', 'olin')
      // this.$store.dispatch('phoneChargers/fetchStatus', 'olin')
      // this.$store.dispatch('laptops/fetchStatus', 'uris')
      this.$store.dispatch('phoneChargers/fetchStatus', 'uris')
    }, 1000 * 60)
  }
}
</script>

<style lang="scss">
/**
 ** SUPPORT WARNING FOR BROWSERS NOT SUPPORTING display grid and contents properties.
 **/

.support-warning {
  background: red;
  color: #fff;
  display: block;
  font-weight: 700;
  opacity: 0.95;
  padding: 3rem;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
}

.support-warning a {
  color: inherit;
}

@supports (display: grid) and (display: contents) {
  .support-warning {
    display: none;
  }
}
</style>
