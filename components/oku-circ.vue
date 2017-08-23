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
        font-size: calc(50 * 0.053vw);
        padding-top: calc(50 * 0.092vh);
        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: calc(20 * 0.092vh);
      margin-top: calc(30 * 0.092vh);
      margin-bottom: calc(180 * 0.092vh);


      ul {
        padding-left: calc(20 * 0.053vw);

        li {
          padding-top: calc(20 * 0.092vh);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: calc(67 * 0.053vw);
      margin: 0;
      padding-bottom: calc(30 * 0.092vh);
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: calc(44 * 0.053vw);
      color: #fff;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: calc(8 * 0.053vw);
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: calc(80 * 0.053vw);
      height: calc(80 * 0.053vw);
      line-height: calc(80 * 0.092vh);
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      margin-right: calc(10 * 0.053vw);
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      width: 80%;
      padding-top: calc(14 * 0.092vh);
      padding-right: calc(10 * 0.053vw);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: calc(-10 * 0.092vh);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: calc(90 * 0.053vw);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: calc(70 * 0.053vw);
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
        font-size: calc(32 * 0.053vw);
        padding-top: calc(40 * 0.092vh);
        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: calc(20 * 0.092vh);
      margin-top: calc(30 * 0.092vh);
      margin-bottom: calc(200 * 0.092vh);

      ul {
        padding-left: calc(20 * 0.053vw);

        li {
          padding-bottom: calc(10 * 0.092vh);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: calc(52 * 0.053vw);
      margin: 0;
      padding-bottom: calc(20 * 0.092vh);
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: calc(34 * 0.053vw);
      margin-bottom: calc(30 * 0.092vh);
      color: #fff;
      width: 100%;
      float: left;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: calc(12 * 0.053vw);
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: calc(30 * 0.053vw);
      width: calc(60 * 0.053vw);
      height: calc(60 * 0.053vw);
      line-height: calc(60 * 0.092vh);
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: calc(10 * 0.053vw);
      width: 80%;
      padding-top: calc(12 * 0.092vh);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: calc(-7 * 0.092vh);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      //@include fluid-type(margin-top, 1440px, 1920px, -5px, -7px);
      margin-top: calc(-7 * 0.092vh);
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: calc(80 * 0.053vw);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: calc(70 * 0.053vw);
      vertical-align: middle;
    }
  }
}

// ====================
// URIS LIBRARY DISPLAY
// ====================

.uris {
  padding-left: calc(15 * 0.092vw);

  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    height: 61vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: calc(65 * 0.053vh);
        padding-top: calc(70 * 0.092vw);
        margin: 0;
    }

    // Device container
    .device-type {
      padding-bottom: calc(30 * 0.092vw);
      margin-top: calc(50 * 0.092vw);
      margin-bottom: calc(200 * 0.092vw);


      ul {
        padding-left: calc(20 * 0.053vh);

        li {
          padding-bottom: calc(30 * 0.092vw);
          padding-top: calc(30 * 0.092vw);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: calc(75 * 0.053vh);
      margin: 0;
      padding-bottom: calc(10 * 0.092vw);

    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: calc(45 * 0.053vh);
      color: #fff;

      i {
        font-size: calc(55 * 0.053vh);
        //padding-right: calc(10 * 0.092vw);
      }
    }

    .device-type__info--icon {
      padding-right: calc(12 * 0.053vh);
      //padding-left: calc(12 * 0.053vh);
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: calc(90 * 0.053vh);
      height: calc(90 * 0.053vh);
      line-height: calc(90 * 0.092vw);
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
      padding-top: calc(10 * 0.092vh);
      padding-right: calc(10 * 0.053vw);
      padding-left: calc(20 * 0.053vw);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: calc(-10 * 0.092vh);
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
        font-size: calc(40 * 0.053vh);
        padding-top: calc(10 * 0.092vw);

        margin: 0;
    }

    // Device container
    .device-type {
      padding-top: calc(10 * 0.092vw);
      margin-top: calc(15 * 0.092vw);
      margin-bottom: 0;
      width: 50%;
      float: left;

      ul {
        padding-left: calc(20 * 0.053vh);

        li {
          padding-bottom: calc(20 * 0.092vw);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: calc(48 * 0.053vh);
      margin: 0;
      padding-bottom: calc(30 * 0.092vw);
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: calc(32 * 0.053vh);
      margin-bottom: calc(20 * 0.092vw);
      color: #fff;
      width: 100%;
      float: left;

      i {
        padding-right: calc(10 * 0.053vh);
        font-size: calc(45 * 0.053vh);
      }
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: calc(12 * 0.053vh);
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: calc(40 * 0.053vh);
      width: calc(80 * 0.053vh);
      height: calc(80 * 0.053vh);
      line-height: calc(80 * 0.092vw);
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: calc(10 * 0.053vh);
      width: 80%;
      padding-top: calc(12 * 0.092vw);
      line-height: calc(50 * 0.092vw);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: calc(-7 * 0.092vw);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: calc(80 * 0.053vh);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: calc(60 * 0.053vh);
      vertical-align: middle;
    }
  }
}
</style>
