<template>
  <div class="oku-circ">
    <h1>{{ location }}</h1>

    <!-- <time>{{ dateNow }}</time> -->

    <section class="laptops">
      <h2>Laptops:</h2>

      <ul>
        <li><span>{{ laptops[location].windowsAvailable }}</span> PC available {{ laptops[location].windowsNextDue }}</li>
        <li><span>{{ laptops[location].macAvailable }}</span> <i class="fa fa-apple" aria-hidden="true"></i> available {{ laptops[location].macNextDue }}</li>
      </ul>
    </section>

    <!-- <section class="chargers">
      <h2>Phone Chargers: </h2>

      <ul>
        <li><span>{{ phoneChargerIphone4 }}</span> iPhone 4 available {{ iphone4NextAvailable }}</li>
        <li><span>{{ phoneChargerIphoneUp5 }}</span> iPhone 5 & up available {{ iphoneUp5NextAvailable }}</li>
        <li><span>{{ phoneChargerMicroUsb }}</span> Micro USB available {{ microUsbNextAvailable }}</li>
        <li><span>{{ phoneChargerMicroUsbC }}</span> Micro USB-C available {{ microUsbCNextAvailable }}</li>
      </ul>
    </section> -->
  </div>
</template>

<script>
export default {
  data: function data () {
    return {
      location: this.$route.params.location
    }
  },
  computed: {
    laptops () {
      return this.$store.state.laptops.locations
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('laptops/fetchStatus', params.location)
  },
  layout: 'oku-circ'
}
</script>

<style>
</style>
