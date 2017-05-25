<template>
  <div class="oku-circ">
    <h1>{{ location }}</h1>
  </div>
</template>

<script>
export default {
  data: function data () {
    return {
      location: this.$route.params.location
    }
  },
  layout: 'oku-circ'
}
</script>

<style>
</style>
