<template>
  <div class="oku-circ" v-bind:class="okuLocation">
    <time v-html="currentTime"></time>

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
  }
}
</script>

<style lang="scss">
  @-webkit-keyframes blinker {
    from { opacity: 1.0; }
    to { opacity: 0.0; }
  }

  .blink {
    -webkit-animation-name: blinker;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: cubic-bezier(1.0,0,0,1.0);
    -webkit-animation-duration: 1s;
  }
</style>
