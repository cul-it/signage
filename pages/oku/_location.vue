<template>
  <div class="oku-circ" v-bind:class="okuLocation">
    <time v-html="currentTime"/>

    <oku-circ location="olin"/>
    <oku-circ location="uris"/>
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
  .blink {
    animation: blinker infinite cubic-bezier(1.0,0,0,1.0) 1s;
  }

  @keyframes blinker {
    from { opacity: 1.0; }
    to { opacity: 0.0; }
  }
</style>
