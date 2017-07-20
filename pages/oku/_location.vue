<template>
  <div class="oku-circ" v-bind:class="okuLocation">
    <time>{{ currentTime }}</time>

    <oku-circ location="olin"/>
    <oku-circ location="uris"/>
  </div>
</template>

<script>
import OKU from '~components/oku-circ'
import moment from 'moment'

export default {
  data () {
    return {
      okuLocation: this.$route.params.location,
      currentTime: moment().format('MMM D / h:mm A')
    }
  },
  components: {
    'oku-circ': OKU
  },
  async fetch ({ store, params }) {
    await store.dispatch('laptops/fetchStatus', 'olin')
    await store.dispatch('phoneChargers/fetchStatus', 'olin')
    await store.dispatch('laptops/fetchStatus', 'uris')
    await store.dispatch('phoneChargers/fetchStatus', 'uris')
  },
  layout: 'oku'
}
</script>

<style>
</style>
