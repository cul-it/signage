<template>
<div class="oku-circ" v-bind:class="'oku-circ__' + location">
  <h1>{{ location }}</h1>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-laptop device-type__header--icon-laptop" aria-hidden="true"></i> Laptops </h2>

    <ul>
      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ laptops[location].macAvailable }}</span></p>
        <p class="device-type__info--availability"><i class="fa fa-apple device-type__info--icon" aria-hidden="true"></i> <span class="available">available</span></p>
        <!--{{ laptops[location].macNextDue }}-->
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ laptops[location].windowsAvailable }}</span></p>
        <p class="device-type__info--availability"><i class="fa fa-windows device-type__info--icon" aria-hidden="true"></i> <span class="available">available</span></p>
        <!--{{ laptops[location].windowsNextDue }}-->
      </li>
    </ul>
  </section>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-battery-quarter device-type__header--icon-charger" aria-hidden="true"></i> Phone Chargers </h2>

    <ul>
      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].iphone4Available }}</span></p>
        <p class="device-type__info--availability">iPhone 4 <span class="available">available</span></p>
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].iphoneAvailable}}</span></p>
        <p class="device-type__info--availability">iPhone 5 &amp; up <span class="available">available</span></p>
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].microUsbAvailable }}</span></p>
        <p class="device-type__info--availability">Micro USB <span class="available">available</span></p>
      </li>
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].usbCAvailable }}</span></p>
        <p class="device-type__info--availability">USB-C <span class="available">available</span></p>
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

@import '~font-awesome/css/font-awesome.min.css';

// ==========
// CSS VARIABLES
// ==========
$light-blue: #3C96D2;
$red: #D0011B;

// Width scale factor for Olin
$olin-width: 0.053vw;

// Height scale factor for Olin
$olin-height: 0.092vh;

// Width scale factor for Uris
$uris-width: 0.092vw;

// Height scale factor for Uris
$uris-height: 0.053vh;

* {
  -webkit-font-smoothing: antialiased;
}

// ====================
// OLIN LIBRARY DISPLAY
// ====================

.olin {

  // ===============
  // OLIN CONTAINER
  // ===============

  .oku-circ.oku-circ__olin {

    height: 100vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 50 * $olin-width;
        padding-top: 50 * $olin-height;
        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: 20 * $olin-height;
      margin-top: 30 * $olin-height;
      margin-bottom: 180 * $olin-height;


      ul {
        padding-left: 20 * $olin-width;

        li {
          padding-top: 20 * $olin-height;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 67 * $olin-width;
      margin: 0;
      padding-bottom: 30 * $olin-height;
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: 44 * $olin-width;
      color: #fff;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 8 * $olin-width;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: 80 * $olin-width;
      height: 80 * $olin-width;
      line-height: 85 * $olin-height;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      margin-right: 10 * $olin-width;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      width: 80%;
      padding-top: 14 * $olin-height;
      padding-right: 10 * $olin-width;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -10 * $olin-height;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 90 * $olin-width;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 70 * $olin-width;
      vertical-align: middle;
    }
  }

  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    height: 100vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 32 * $olin-width;
        padding-top: 40 * $olin-height;
        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: 20 * $olin-height;
      margin-top: 30 * $olin-height;
      margin-bottom: 200 * $olin-height;

      ul {
        padding-left: 20 * $olin-width;

        li {
          padding-bottom: 10 * $olin-height;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 52 * $olin-width;
      margin: 0;
      padding-bottom: 20 * $olin-height;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: 34 * $olin-width;
      margin-bottom: 30 * $olin-height;
      color: #fff;
      width: 100%;
      float: left;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 12 * $olin-width;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: 30 * $olin-width;
      width: 60 * $olin-width;
      height: 60 * $olin-width;
      line-height: 60 * $olin-height;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10 * $olin-width;
      width: 80%;
      padding-top: 12 * $olin-height;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -7 * $olin-height;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      //@include fluid-type(margin-top, 1440px, 1920px, -5px, -7px);
      margin-top: -7 * $olin-height;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 80 * $olin-width;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 70 * $olin-width;
      vertical-align: middle;
    }
  }
}

// ====================
// URIS LIBRARY DISPLAY
// ====================

.uris {
  padding-left: 15 * $uris-width;


  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    height: 61vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 65 * $uris-height;
        padding-top: 70 * $uris-width;
        margin: 0;
    }

    // Device container
    .device-type {
      padding-bottom: 30 * $uris-width;
      margin-top: 50 * $uris-width;
      margin-bottom: 200 * $uris-width;


      ul {
        padding-left: 20 * $uris-height;

        li {
          padding-bottom: 30 * $uris-width;
          padding-top: 30 * $uris-width;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 75 * $uris-height;

      margin: 0;
      padding-bottom: 10 * $uris-width;

    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: 45 * $uris-height;
      color: #fff;

      i {
        font-size: 55 * $uris-height;
        padding-right: 10 * $uris-width;
      }
    }

    .device-type__info--icon {
      padding-right: 12 * $uris-height;
      padding-left: 12 * $uris-height;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: 90 * $uris-height;
      height: 90 * $uris-height;
      line-height: 90 * $uris-width;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      width: 80%;
      padding-top: 10 * $olin-height;
      padding-right: 10 * $olin-width;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -10 * $olin-height;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      vertical-align: middle;
    }
  }

  // ===============
  // OLIN CONTAINER
  // ===============

  .oku-circ.oku-circ__olin {

    height: 39vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 40 * $uris-height;
        padding-top: 10 * $uris-width;

        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: 10 * $uris-width;
      margin-top: 15 * $uris-width;
      margin-bottom: 0;
      width: 50%;
      float: left;

      ul {
        padding-left: 20 * $uris-height;

        li {
          padding-bottom: 20 * $uris-width;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 48 * $uris-height;
      margin: 0;
      padding-bottom: 30 * $uris-width;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: 32 * $uris-height;
      margin-bottom: 20 * $uris-width;
      color: #fff;
      width: 100%;
      float: left;

      i {
        padding-right: 10 * $uris-height;
        font-size: 45 * $uris-height;
      }
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 12 * $uris-height;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: 40 * $uris-height;
      width: 80 * $uris-height;
      height: 80 * $uris-height;
      line-height: 80 * $uris-width;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10 * $uris-height;
      width: 80%;

      padding-top: 12 * $uris-width;
      line-height: 50 * $uris-width;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -7 * $uris-width;

    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 80 * $uris-height;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 60 * $uris-height;
      vertical-align: middle;
    }
  }
}
</style>
