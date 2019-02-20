<template>
  <p>
    <span
      :class="{ unavailable: !count }"
      class="device-count"
    >{{ count }}</span>
    <span v-html="deviceStatus"/>
    <span
      :class="{ unavailable: !count }"
      class="available"
    > available</span>
  </p>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    model: {
      type: String,
      default: null,
      required: false
    },
    count: {
      type: Number,
      required: true
    }
  },
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
  }
}
</script>
