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

// Landscpae width scale factor
$lw: 0.053vw;

// Landscpae height scale factor
$lh: 0.092vh;

// Portrait width scale factor
$pw: 0.092vw;

// Portrait height scale factor
$ph: 0.053vh;

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
        font-size: 50 * $lw;
        padding-top: 50 * $lh;
        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: 20 * $lh;
      margin-top: 30 * $lh;
      margin-bottom: 180 * $lh;


      ul {
        padding-left: 20 * $lw;

        li {
          padding-top: 20 * $lh;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 67 * $lw;
      margin: 0;
      padding-bottom: 30 * $lh;
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: 44 * $lw;
      color: #fff;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 8 * $lw;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: 80 * $lw;
      height: 80 * $lw;
      line-height: 80 * $lw;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      margin-right: 10 * $lw;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      width: 80%;
      padding-top: 14 * $lh;
      padding-right: 10 * $lw;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -10 * $lh;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 90 * $lw;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 70 * $lw;
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
        font-size: 32 * $lw;
        padding-top: 40 * $lh;
        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: 20 * $lh;
      margin-top: 30 * $lh;
      margin-bottom: 200 * $lh;

      ul {
        padding-left: 20 * $lw;

        li {
          padding-bottom: 10 * $lh;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 52 * $lw;
      margin: 0;
      padding-bottom: 20 * $lh;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: 34 * $lw;
      margin-bottom: 30 * $lh;
      color: #fff;
      width: 100%;
      float: left;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 12 * $lw;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: 30 * $lw;
      width: 60 * $lw;
      height: 60 * $lw;
      line-height: 60 * $lw;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10 * $lw;
      width: 80%;
      padding-top: 12 * $lh;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -7 * $lh;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      //@include fluid-type(margin-top, 1440px, 1920px, -5px, -7px);
      margin-top: -7 * $lh;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 80 * $lw;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 70 * $lw;
      vertical-align: middle;
    }
  }
}

// ====================
// URIS LIBRARY DISPLAY
// ====================

.uris {
  padding-left: 15 * $pw;


  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    height: 61vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 65 * $ph;
        padding-top: 70 * $pw;
        margin: 0;
    }

    // Device container
    .device-type {
      padding-bottom: 30 * $pw;
      margin-top: 50 * $pw;
      margin-bottom: 200 * $pw;


      ul {
        padding-left: 20 * $ph;

        li {
          padding-bottom: 30 * $pw;
          padding-top: 30 * $pw;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 75 * $ph;

      margin: 0;
      padding-bottom: 10 * $pw;

    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: 45 * $ph;
      color: #fff;

      i {
        font-size: 55 * $ph;
        padding-right: 10 * $pw;
      }
    }

    .device-type__info--icon {
      padding-right: 12 * $ph;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: 90 * $ph;
      height: 90 * $ph;
      line-height: 90 * $ph;
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
      padding-top: 10 * $lh;
      padding-left: 20 * $lw;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -10 * $lh;
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
        font-size: 40 * $ph;
        padding-top: 10 * $pw;

        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: 10 * $pw;
      margin-top: 15 * $pw;
      margin-bottom: 0;
      width: 50%;
      float: left;

      ul {
        padding-left: 20 * $ph;

        li {
          padding-bottom: 20 * $pw;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 48 * $ph;
      margin: 0;
      padding-bottom: 30 * $pw;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: 32 * $ph;
      margin-bottom: 20 * $pw;
      color: #fff;
      width: 100%;
      float: left;

      i {
        padding-right: 10 * $ph;
        font-size: 45 * $ph;
      }
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 12 * $ph;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: 40 * $ph;
      width: 80 * $ph;
      height: 80 * $ph;
      line-height: 80 * $ph;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10 * $ph;
      width: 80%;
      padding-top: 15 * $pw;
      line-height: 50 * $pw;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -7 * $pw;

    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 80 * $ph;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 60 * $ph;
      vertical-align: middle;
    }
  }
}
</style>
