<template>
<div class="oku-circ" v-bind:class="'oku-circ__' + location">
  <h1>{{ location }}</h1>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-laptop device-type__header--icon-laptop" aria-hidden="true"></i> Laptops: </h2>

    <ul>
      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ laptops[location].windowsAvailable }}</span></p>
        <p class="device-type__info--availability"><i class="fa fa-apple device-type__info--icon" aria-hidden="true"></i> <span class="available">available</span></p>
        <!--{{ laptops[location].windowsNextDue }}-->
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ laptops[location].macAvailable }}</span></p>
        <p class="device-type__info--availability"><i class="fa fa-windows device-type__info--icon" aria-hidden="true"></i> <span class="available">available</span></p>
        <!--{{ laptops[location].macNextDue }}-->
      </li>
    </ul>
  </section>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-battery-quarter device-type__header--icon-charger" aria-hidden="true"></i> Phone Chargers: </h2>

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
        <p class="device-type__info--availability">Micro USB <span class="unavailable">available at 00:00 PM</span></p
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].usbCAvailable }}</span></p>
        <p class="device-type__info--availability">USB-C <span class="unavailable">available at 00:00 PM</span></p>
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

// ==========
// MIXIN FOR MAKING FONTS LIQUID
// libsass (v3.3.6)
// PRECISE CONTROL OVER RESPONSIVE TYPOGRAPHY FOR SASS
// Indrek Paas @indrekpaas
// Inspired by Mike Riethmuller's Precise control over responsive typography
// http://madebymike.com.au/writing/precise-control-responsive-typography/
// `strip-unit()` function by Hugo Giraudel
// ==========

@mixin fluid-type($properties, $min-value, $max-value) {

  $min-vw: 1440px;
  $max-vw: 1920px;

  @each $property in $properties {
    #{$property}: $min-value;
  }

  @media screen and (min-width: $min-vw) {
    @each $property in $properties {
      #{$property}: calc(#{$min-value} + #{strip-unit($max-value - $min-value)} * (100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)});
    }
  }

  @media screen and (min-width: $max-vw) {
    @each $property in $properties {
      #{$property}: $max-value;
    }
  }
}

@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
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
        @include fluid-type(font-size, 38px, 50px);
        @include fluid-type(padding-top, 20px, 50px);
        margin: 0;
    }

    // Device container
    .device-type {
      @include fluid-type(padding-top, 10px, 20px);
      @include fluid-type(margin-top, 20px, 30px);
      @include fluid-type(margin-bottom, 120px, 180px);


      ul {
        padding-left: 20px;

        li {
          @include fluid-type(padding-bottom, 30px, 40px);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 40px, 67px);
      margin: 0;
      @include fluid-type(padding-bottom, 27px, 30px);

    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      @include fluid-type(font-size, 26px, 40px);
      color: #fff;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 8px;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      @include fluid-type(width, 60px, 80px);
      @include fluid-type(height, 60px, 80px);
      @include fluid-type(line-height, 60px, 80px);
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      margin-right: 10px;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      @include fluid-type(padding-top, 12px, 20px);
      padding-right: 10px;
      width: 80%;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      @include fluid-type(margin-top, -5px, -10px);

    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 70px, 90px);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 50px, 70px);
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
        @include fluid-type(font-size, 24px, 32px);
        @include fluid-type(padding-top, 20px, 40px);
        margin: 0;
    }

    // Device container
    .device-type {
      @include fluid-type(padding-top, 10px, 20px);
      @include fluid-type(margin-top, 20px, 30px);
      @include fluid-type(margin-bottom, 120px, 200px);

      ul {
        padding-left: 20px;

        li {
          @include fluid-type(padding-bottom, 7px, 10px);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 38px, 52px);
      margin: 0;
      @include fluid-type(padding-bottom, 15px, 20px);
    }

    // Device info: count, availavility, ...
    .device-type__info {
      @include fluid-type(font-size, 22px, 30px);
      margin-bottom: 30px;
      color: #fff;
      width: 100%;
      float: left;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 12px;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      @include fluid-type(font-size, 22px, 30px);
      @include fluid-type(width, 40px, 60px);
      @include fluid-type(height, 40px, 60px);
      @include fluid-type(line-height, 40px, 60px);
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10px;
      width: 80%;
      @include fluid-type(padding-top, 7px, 12px);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      @include fluid-type(margin-top, -5px, -7px);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      @include fluid-type(margin-top, -5px, -7px);
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 50px, 80px);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 40px, 70px);
      vertical-align: middle;
    }
  }
}

// ====================
// URIS LIBRARY DISPLAY
// ====================

.uris {

  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    height: 50vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 38px;
        margin: 0;
        padding-top: 20px;
    }

    // Device container
    .device-type {
      padding-top: 20px;
      margin-top: 30px;
      margin-bottom: 180px;

      ul {
        padding-left: 20px;

        li {
          padding-bottom: 40px;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 48px;
      margin: 0;
      padding-bottom: 30px;
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      font-size: 33px;
      color: #fff;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 8px;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      line-height: 80px;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      margin-right: 10px;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-right: 10px;
      width: 80%;
      padding-top: 20px;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -10px;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 80px;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 60px;
      vertical-align: middle;
    }
  }

  // ===============
  // OLIN CONTAINER
  // ===============

  .oku-circ.oku-circ__olin {

    height: 50vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        font-size: 33px;
        margin: 0;
        padding-top: 10px;
    }

    // Device container
    .device-type {
      padding-top: 20px;
      margin-bottom: 100px;

      ul {
        padding-left: 20px;

        li {
          padding-bottom: 10px;

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      font-size: 36px;
      margin: 0;
      padding-bottom: 20px;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      font-size: 34px;
      margin-bottom: 20px;
      color: #fff;
      width: 50%;
      float: left;
    }

    .device-type__info--icon {
      color: #fff;
      padding-right: 12px;
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      font-size: 28px;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10px;
      width: 80%;
      padding-top: 12px;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      margin-top: -7px;
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      margin-top: -7px;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      font-size: 90px;
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      font-size: 70px;
      vertical-align: middle;
    }
  }
}

</style>
