<template>
  <div class="oku-circ">
    <h1>{{ locationUpper }}</h1>

    <!-- <time>{{ dateNow }}</time> -->

    <section class="laptops">
      <h2>Laptops:</h2>

      <ul>
        <li><span>{{ laptops[location].windowsAvailable }}</span> PC available {{ laptops[location].windowsNextDue }}</li>
        <li><span>{{ laptops[location].macAvailable }}</span> <i class="fa fa-apple" aria-hidden="true"></i> available {{ laptops[location].macNextDue }}</li>
      </ul>
    </section>

    <section class="chargers">
      <h2>Phone Chargers:</h2>

      <ul>
        <li><span>{{ phoneChargers[location].iphone4Available }}</span> iPhone 4 available</li>
        <li><span>{{ phoneChargers[location].iphoneAvailable}}</span> iPhone 5 &amp; up available</li>
        <li><span>{{ phoneChargers[location].microUsbAvailable }}</span> Micro USB available</li>
        <li><span>{{ phoneChargers[location].usbCAvailable }}</span> Micro USB-C available</li>
      </ul>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      locationUpper: _.upperFirst(this.location)
    }
  },
  computed: {
    laptops () {
      return this.$store.state.laptops.locations
    },
    phoneChargers () {
      return this.$store.state.phoneChargers.locations
    }
  },
  props: [
    'location'
  ]
}
</script>

<style>
</style>
