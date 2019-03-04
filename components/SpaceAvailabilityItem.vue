<template>
  <li
    :class="['space__slot', {'space__slot--available': booking.isAvailable}]"
  >
    <time class="slot__start">
      {{ booking.startTime.hour }}
      <div class="start__stack">
        <span class="start__minutes">{{ booking.startTime.minute }}</span>
        <span class="start__meridiem">{{ booking.startTime.meridiem }}</span>
      </div>
    </time>
    <span v-if="!booking.isAvailable">
      <slot
        :booking="booking"
        name="bookingInfo"
      >
        <!-- Default info displayed for LibCal bookings -->
        {{ booking.firstName }} {{ booking.lastName[0] }}.
      </slot>
    </span>
    <span v-else>
      Available
    </span>
    <span
      v-if="booking.lastUp"
      class="space__closing"
    >until closing at {{ statusChange }}</span>
  </li>
</template>

<script>
export default {
  props: {
    booking: {
      type: Object,
      required: true
    },
    statusChange: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
// TODO: Revisit font scaling and pull variables into global include (DRY)
$sf: 1.43vw;

.slot__start {
  position: absolute;
  top: 23%;
  left: 5px;
  color: #fff;
  display: flex;
  font-size: 2.2 * $sf;
}
.start__stack {
  margin-top: .1em;
  display: inline-flex;
  flex-direction: column;
}
.start__meridiem,
.start__minutes {
  align-self: flex-end;
  font-size: .5em;
}
.start__meridiem {
  font-weight: 300;
  line-height: .3em;
}
</style>
