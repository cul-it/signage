<template>
<div class="oku-circ" v-bind:class="'oku-circ__' + location">
  <h1>{{ location }}</h1>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-laptop device-type__header--icon-laptop" aria-hidden="true"></i> Laptops </h2>

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

// ==========
// MIXIN FOR MAKING FONTS LIQUID
// libsass (v3.3.6)
// PRECISE CONTROL OVER RESPONSIVE TYPOGRAPHY FOR SASS
// Indrek Paas @indrekpaas
// Inspired by Mike Riethmuller's Precise control over responsive typography
// http://madebymike.com.au/writing/precise-control-responsive-typography/
// `strip-unit()` function by Hugo Giraudel
// ==========

@mixin fluid-type($properties, $min-vw, $max-vw, $min-value, $max-value) {

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
        @include fluid-type(font-size, 1440px, 1920px, 38px, 50px);
        @include fluid-type(padding-top, 1440px, 1920px, 20px, 50px);
        margin: 0;
    }

    // Device container
    .device-type {
      @include fluid-type(padding-top, 1440px, 1920px, 10px, 20px);
      @include fluid-type(margin-top, 1440px, 1920px, 20px, 30px);
      @include fluid-type(margin-bottom, 1440px, 1920px, 120px, 180px);


      ul {
        padding-left: 20px;

        li {
          @include fluid-type(padding-bottom, 1440px, 1920px, 30px, 40px);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 1440px, 1920px, 40px, 67px);
      margin: 0;
      @include fluid-type(padding-bottom, 1440px, 1920px, 27px, 30px);

    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      @include fluid-type(font-size, 1440px, 1920px, 26px, 44px);
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
      @include fluid-type(width, 1440px, 1920px, 60px, 80px);
      @include fluid-type(height, 1440px, 1920px, 60px, 80px);
      @include fluid-type(line-height, 1440px, 1920px, 60px, 80px);
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
      @include fluid-type(padding-top, 1440px, 1920px, 12px, 14px);
      padding-right: 10px;
      width: 80%;
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      @include fluid-type(margin-top, 1440px, 1920px, -5px, -10px);

    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 1440px, 1920px, 70px, 90px);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 1440px, 1920px, 50px, 70px);
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
        @include fluid-type(font-size, 1440px, 1920px, 24px, 32px);
        @include fluid-type(padding-top, 1440px, 1920px, 20px, 40px);
        margin: 0;
    }

    // Device container
    .device-type {
      @include fluid-type(padding-top, 1440px, 1920px, 10px, 20px);
      @include fluid-type(margin-top, 1440px, 1920px, 20px, 30px);
      @include fluid-type(margin-bottom, 1440px, 1920px, 120px, 200px);

      ul {
        padding-left: 20px;

        li {
          @include fluid-type(padding-bottom, 1440px, 1920px, 7px, 10px);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 1440px, 1920px, 38px, 52px);
      margin: 0;
      @include fluid-type(padding-bottom, 1440px, 1920px, 15px, 20px);
    }

    // Device info: count, availavility, ...
    .device-type__info {
      @include fluid-type(font-size, 1440px, 1920px, 22px, 34px);
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
      @include fluid-type(font-size, 1440px, 1920px, 22px, 30px);
      @include fluid-type(width, 1440px, 1920px, 40px, 60px);
      @include fluid-type(height, 1440px, 1920px, 40px, 60px);
      @include fluid-type(line-height, 1440px, 1920px, 40px, 60px);
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      padding-left: 10px;
      width: 80%;
      @include fluid-type(padding-top, 1440px, 1920px, 7px, 12px);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      @include fluid-type(margin-top, 1440px, 1920px, -5px, -7px);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      @include fluid-type(margin-top, 1440px, 1920px, -5px, -7px);
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 1440px, 1920px, 50px, 80px);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 1440px, 1920px, 40px, 70px);
      vertical-align: middle;
    }
  }
}

// ====================
// URIS LIBRARY DISPLAY
// ====================

.uris {
  @include fluid-type(padding-left, 810px, 1080px, 10px, 15px);


  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    height: 61vh;

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        @include fluid-type(font-size, 810px, 1080px, 45px, 65px);
        @include fluid-type(padding-top, 810px, 1080px, 50px, 70px);
        margin: 0;
    }

    // Device container
    .device-type {
      @include fluid-type(padding-bottom, 810px, 1080px, 15px, 30px);
      @include fluid-type(margin-top, 810px, 1080px, 35px, 50px);
      @include fluid-type(margin-bottom, 810px, 1080px, 160px, 200px);

      ul {
        padding-left: 20px;

        li {
          @include fluid-type(padding-bottom, 810px, 1080px, 20px, 30px);
          @include fluid-type(padding-top, 810px, 1080px, 20px, 30px);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 810px, 1080px, 60px, 75px);
      margin: 0;
      @include fluid-type(padding-bottom, 810px, 1080px, 10px, 10px);
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: 50%;
      float: left;
      @include fluid-type(font-size, 810px, 1080px, 35px, 45px);
      color: #fff;

      i {
        padding-right: 10px;
        @include fluid-type(font-size, 810px, 1080px, 40px, 55px);
      }
    }

    .device-type__info--icon {
      @include fluid-type(padding-right, 810px, 1080px, 2px, 8px);
      @include fluid-type(padding-left, 810px, 1080px, 4px, 8px);
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      @include fluid-type(width, 810px, 1080px, 65px, 90px);
      @include fluid-type(height, 810px, 1080px, 65px, 90px);
      @include fluid-type(line-height, 810px, 1080px, 65px, 90px);
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      @include fluid-type(padding-top, 810px, 1080px, 12px, 20px);
      width: 80%;
      @include fluid-type(padding-left, 810px, 1080px, 8px, 20px);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      @include fluid-type(margin-top, 810px, 1080px, -5px, -10px);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 810px, 1080px, 80px, 110px);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 810px, 1080px, 60px, 80px);
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
        @include fluid-type(font-size, 810px, 1080px, 30px, 40px);
        @include fluid-type(padding-top, 810px, 1080px, 0, 10px);
        margin: 0;
    }

    // Device container
    .device-type {
      @include fluid-type(padding-top, 810px, 1080px, 10px, 10px);
      @include fluid-type(margin-top, 810px, 1080px, 10px, 15px);
      margin-bottom: 0;
      width: 50%;
      float: left;

      ul {
        padding-left: 20px;

        li {
          @include fluid-type(padding-bottom, 810px, 1080px, 7px, 20px);

          p {
            margin: 0;
          }
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 810px, 1080px, 34px, 48px);
      margin: 0;
      @include fluid-type(padding-bottom, 810px, 1080px, 20px, 30px);
    }

    // Device info: count, availavility, ...
    .device-type__info {
      @include fluid-type(font-size, 810px, 1080px, 24px, 32px);
      @include fluid-type(margin-bottom, 810px, 1080px, 10px, 20px);
      color: #fff;
      width: 100%;
      float: left;

      i {
        padding-right: 10px;
        @include fluid-type(font-size, 810px, 1080px, 26px, 45px);
      }
    }

    .device-type__info--icon {
      color: #fff;
      @include fluid-type(padding-right, 810px, 1080px, 6px, 12px);
    }

    // Device count
    .device-type__info--count {
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      display: inline-block;
      float: left;
      @include fluid-type(font-size, 810px, 1080px, 28px, 40px);
      @include fluid-type(width, 810px, 1080px, 55px, 80px);
      @include fluid-type(height, 810px, 1080px, 55px, 80px);
      @include fluid-type(line-height, 810px, 1080px, 55px, 80px);
    }

    // Device type availability
    .device-type__info--availability {
      vertical-align: middle;
      display: inline-block;
      @include fluid-type(padding-left, 810px, 1080px, 9px, 10px);
      width: 80%;
      @include fluid-type(padding-top, 810px, 1080px, 10px, 12px);
      @include fluid-type(line-height, 810px, 1080px, 40px, 50px);
    }

    .available {
      vertical-align: middle;
      color: $light-blue;
      display: inline-block;
      @include fluid-type(margin-top, 810px, 1080px, -5px, -7px);
    }

    .unavailable {
      vertical-align: middle;
      color: $red;
      display: inline-block;
      @include fluid-type(margin-top, 810px, 1080px, -5px, -7px);
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 810px, 1080px, 50px, 80px);
      vertical-align: middle;
      display: inline-block;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 810px, 1080px, 40px, 60px);
      vertical-align: middle;
    }
  }
}
</style>
