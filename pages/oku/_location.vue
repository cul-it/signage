<template>

  <div v-bind:class="'oku-circ__' + okuLocation">

    <div class="support-warning">
      This page requires CSS Grid. The current browser you're using doesn't support it. Find a <a href="https://igalia.github.io/css-grid-layout/enable.html">grid-enabled browser</a>.
    </div>

    <div class="grid">
      <time v-html="currentTime"/>
      <oku-circ location="olin"/>
      <oku-circ location="uris"/>
    </div>

  </div>

</template>

<script>
import OKU from '~components/oku-circ'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      okuLocation: this.$route.params.location
    }
  },
  components: {
    'oku-circ': OKU
  },
  computed: {
    ...mapState({
      currentTime: state => moment(state.time.now).format('MMM D / h[<span class="blink">:</span>]mm A')
    })
  },
  async fetch ({ store, params }) {
    await store.dispatch('laptops/fetchStatus', 'olin')
    await store.dispatch('phoneChargers/fetchStatus', 'olin')
    await store.dispatch('laptops/fetchStatus', 'uris')
    await store.dispatch('phoneChargers/fetchStatus', 'uris')
  },
  layout: 'oku',
  mounted () {
    // Sync current time every 10 seconds
    // -- ideally, this would happen within the store itself (as part of the action),
    // -- but encountered a bug when attempting this via Nuxt. No issue in vanilla Vue.
    setInterval(() => {
      this.$store.dispatch('time/sync')
    }, 1000 * 10)

    // Update equipment status every minute
    setInterval(() => {
      this.$store.dispatch('laptops/fetchStatus', 'olin')
      this.$store.dispatch('phoneChargers/fetchStatus', 'olin')
      this.$store.dispatch('laptops/fetchStatus', 'uris')
      this.$store.dispatch('phoneChargers/fetchStatus', 'uris')
    }, 1000 * 60)
  }
}
</script>

<style lang="scss">

/**
 ** SUPPORT WARNING FOR BROWSERS NOT SUPPORTTING CSS GRID MODULE
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

@supports(display: grid) {
  .support-warning {
    display: none;
  }
}
</style>
