<template>
  <div class="oku">
    <oku-circ location="olin"/>
    <oku-circ location="uris"/>
  </div>
</template>

<script>
import OKU from '~components/oku-circ'

export default {
  components: {
    'oku-circ': OKU
  },
  async fetch ({ store, params }) {
    await store.dispatch('laptops/fetchStatus', 'olin')
    await store.dispatch('phoneChargers/fetchStatus', 'olin')
    await store.dispatch('laptops/fetchStatus', 'uris')
    await store.dispatch('phoneChargers/fetchStatus', 'uris')
  },
  layout: 'oku-circ'
}
</script>

<style>
</style>
