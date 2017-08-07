<template>
  <div class="oku-circ" v-bind:class="'oku-circ__' + location">
    <h1>{{ location }}</h1>

    <section class="device-type">

      <h2 class="device-type__header"><i class="fa fa-laptop device-type__header--icon-laptop" aria-hidden="true"></i> Laptops: </h2>

      <ul>
        <li class="device-type__info">
          <span class="device-type__info--count">{{ laptops[location].windowsAvailable }}</span>
          <i class="fa fa-apple device-type__info--icon" aria-hidden="true"></i>
           available <!--{{ laptops[location].windowsNextDue }}-->
        </li>

        <li class="device-type__info">
          <span class="device-type__info--count">{{ laptops[location].macAvailable }}</span>
          <i class="fa fa-windows device-type__info--icon" aria-hidden="true"></i>
          available <!--{{ laptops[location].macNextDue }}-->
        </li>
      </ul>
    </section>

    <section class="device-type">

      <h2 class="device-type__header"><i class="fa fa-battery-quarter device-type__header--icon-charger" aria-hidden="true"></i> Phone Chargers: </h2>

      <ul>
        <li class="device-type__info">
          <span class="device-type__info--count">{{ phoneChargers[location].iphone4Available }}</span> iPhone 4 available
        </li>

        <li class="device-type__info">
          <span class="device-type__info--count">{{ phoneChargers[location].iphoneAvailable}}</span> iPhone 5 &amp; up available
        </li>

        <li class="device-type__info"><span class="device-type__info--count">{{ phoneChargers[location].microUsbAvailable }}</span> Micro USB available
        </li>

        <li class="device-type__info"><span class="device-type__info--count">{{ phoneChargers[location].usbCAvailable }}</span> USB-C available
        </li>
      </ul>
    </section>
  </div>
</template>

<script>

export default {
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

<style lang="scss">

  @import '~susy';
  @import '~font-awesome/css/font-awesome.min.css';
  
  // ==========
  // CSS VARIABLES
  // ==========
  $light-blue: #3C96D2;
  $red: #D0011B;

 .oku-circ {

   h1 {
     text-transform: capitalize;
     font-weight: normal;
     font-size: 50px;
     margin: 0;
     font-weight: 400;
   }

   .laptops, .chargers {
     padding-top: 20px;
     margin-bottom: 150px;
   }

   li {
     width: span(4 of 8);
     float: left;
     font-size: 30px;
   }
 }

 .oku-circ.oku-circ__uris {

   h1 {
     font-size: 30px;
   }

   li {
     font-size: 23px;
   }
 }

 .device-type {
   padding-top: 20px;
   margin-bottom: 150px;
 }

 .device-type__header {
   font-size: 40px;
   margin: 0;
   vertical-align: middle;
   padding-bottom: 20px;
 }

 .device-type__header--icon-laptop {
   font-size: 80px;
   vertical-align: middle;
 }

 .device-type__header--icon-charger {
   font-size: 60px;
   vertical-align: middle;
 }

 .device-type__info {
   width: span(4 of 8);
   float: left;
   font-size: 30px;
   color: $light-blue;
   padding-bottom: 20px;
 }

 .device-type__info--count {
   padding: 10px;
   color: $light-blue;
   border-radius: 50%;
   background-color: #fff;
   width: 60px;
   height: 60px;
   display: inline-block;
   text-align: center;
   font-size: 30px;
   vertical-align: middle;
   margin-right: 10px;
 }

 .device-type__info--icon {
   color: #fff;
 }

 .oku-circ.oku-circ__uris {

   h1 {
     font-size: 30px;
   }

   li {
     font-size: 23px;
   }

   .device-type__header {
     font-size: 30px;
   }

   .device-type__header--icon-laptop {
     font-size: 70px;
   }

   .device-type__header--icon-charger {
     font-size: 60px;
   }

   .device-type__info {
     font-size: 24px;
   }

   .device-type__info--count {
     padding: 10px;
     width: 50px;
     height: 50px;
     font-size: 26px;
     margin-right: 10px;
   }
 }
</style>
