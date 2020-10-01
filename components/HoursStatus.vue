<template>
  <div
    class="hours"
    :class="size"
  >
    <span
      :class="hours.status"
      class="hours-status"
    >{{ hours.status }}</span>
    <span> until {{ relativeStatusChange }}</span>
  </div>
</template>

<script>
import libCal from '~/utils/libcal'

export default {
  props: {
    hours: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    relativeStatusChange () {
      return libCal.formatStatusChange(this.hours.statusChange)
    }
  }
}
</script>

<style lang="scss">
.embiggen {
  font-size: 8.5vw;
}
.hours {
  text-align: center;

  &.embiggen {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.hours-status {
  padding: .1em .2em;
  text-transform: capitalize;
  border-radius: .3em;

  .embiggen & {
    margin-bottom: .4em;
    width: 27vw;
  }

  &.closed {
    background-color: #b42b5a;
  }

  &.open {
    background-color: #30776b;
  }
}
</style>
