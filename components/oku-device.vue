<template>
<p>
  <span class="device-count" :class="{ unavailable: !Number(count) }">{{ count }}</span>
  <span v-html="deviceStatus"></span>
  <span class="available" :class="{ unavailable: !Number(count) }"> available</span>
</p>
</template>

<script>
export default {
  computed: {
    deviceStatus () {
      if (this.type === 'apple') {
        return '<span class="fa fa-' + this.type + ' device-icon" aria-hidden="true"></span>'
      } else if (this.type === 'windows') {
        return '<span class="fa fa-' + this.type + ' device-icon" aria-hidden="true"></span>'
      } else if (this.type === 'phoneCharger') {
        return '<span class="device-type__info--availability">' + this.model + '</span>'
      }
    }
  },
  props: [
    'type',
    'model',
    'count'
  ]
}
</script>
