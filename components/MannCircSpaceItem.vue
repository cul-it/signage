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
    <div v-if="!booking.isAvailable">
      <slot
        :booking="booking"
        name="bookingInfo"
      >
        <!-- Default info displayed for LibCal bookings -->
        <div class="slot__patron">
          <span class="slot__patron--name">{{ booking.firstName }} {{ booking.lastName }}</span>
          <span class="slot__patron--netid">({{ booking.netId }})</span>
        </div>
        <div class="slot__event-title">
          {{ booking.title }}
        </div>
      </slot>
    </div>
    <span v-else>
      <!-- If available now, allow parent component to inject desktop availability via LabStats -->
      <slot
        v-if="index === 0"
        name="desktopAvailability"
      />
      Available
    </span>
    <!-- Closing info if last booking and closing is defined/known -->
    <span
      v-if="booking.lastUp && statusChange !== 'null'"
      class="space__closing"
    >
      <!-- Handling for locations open 24 hours -->
      <span
        v-if="statusChange !== 'Open 24 hours'"
      > until closing at</span>
      {{ statusChange }}
    </span>
    <!-- until closing at {{ statusChange }}</span> -->
  </li>
</template>

<script>
export default {
  props: {
    booking: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
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
  top: 1%;
  left: 5px;
  color: #fff;
  display: flex;
  font-size: 1.8 * $sf;
}
.slot__event-title {
  font-size: .5em;
  font-weight: 300;
}
.slot__patron {
  display: flex;
  align-items: center;
  line-height: .9em;

  &--netid {
    font-size: .7em;
    color: #6dafe6;
  }
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
