<template>
<div class="oku-circ" v-bind:class="'oku-circ__' + location">
  <h1>{{ location }}</h1>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-laptop device-type__header--icon-laptop" aria-hidden="true"></i> Laptops: </h2>

    <ul>
      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ laptops[location].windowsAvailable }}</span>
        <span class="device-type__info--availability"><i class="fa fa-apple device-type__info--icon" aria-hidden="true"></i> available</span></p>
        <!--{{ laptops[location].windowsNextDue }}-->
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ laptops[location].macAvailable }}</span>
        <span class="device-type__info--availability"><i class="fa fa-windows device-type__info--icon" aria-hidden="true"></i> available</span></p>
        <!--{{ laptops[location].macNextDue }}-->
      </li>
    </ul>
  </section>

  <section class="device-type">

    <h2 class="device-type__header"><i class="fa fa-battery-quarter device-type__header--icon-charger" aria-hidden="true"></i> Phone Chargers: </h2>

    <ul>
      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].iphone4Available }}</span> <span class="device-type__info--availability">iPhone 4 available</span></p>
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].iphoneAvailable}}</span> <span class="device-type__info--availability">iPhone 5 &amp; up available</span></p>
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].microUsbAvailable }}</span> <span class="device-type__info--availability">Micro USB available</span></p>
      </li>

      <li class="device-type__info">
        <p><span class="device-type__info--count">{{ phoneChargers[location].usbCAvailable }}</span> <span class="device-type__info--availability">USB-C available</span></p>
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
//libsass (v3.3.6)
//PRECISE CONTROL OVER RESPONSIVE TYPOGRAPHY FOR SASS
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

// ===============
// OLIN LIBRARY DISPLAY
// ===

.olin {
  // ===============
  // OLIN CONTAINER
  // ===============

  .oku-circ.oku-circ__olin {

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        @include fluid-type(font-size, 1440px, 3866px, 38px, 90px);
        margin: 0;
        font-weight: 400;
        padding-top: 20px;
    }

    li {
        width: span(4 of 8);
        float: left;
    }

    // Device container
    .device-type {
      padding-top: 20px;
      @include fluid-type(margin-bottom, 1440px, 3866px, 150px, 300px);


      ul {
        padding-left: 0;

        li {
          padding-bottom: 0;
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 1440px, 3866px, 38px, 100px);
      margin: 0;
      padding-bottom: 0;
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: span(4 of 8);
      @include fluid-type(font-size, 1440px, 3866px, 28px, 80px);
      @include fluid-type(padding-bottom, 1440px, 3866px, 28px, 80px);
      color: $light-blue;

      p {
        @include fluid-type(margin-top, 1440px, 3866px, 10px, 28px);
        @include fluid-type(margin-bottom, 1440px, 3866px, 10px, 28px);
      }
    }

    .device-type__info--icon {
      color: #fff;
    }

    // Device count
    .device-type__info--count {
      @include fluid-type(padding-top, 1440px, 3866px, 13px, 38px);
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      @include fluid-type(width, 1440px, 3866px, 63px, 171px);
      @include fluid-type(height, 1440px, 3866px, 63px, 171px);
      display: inline-block;
      text-align: center;
      @include fluid-type(font-size, 1440px, 3866px, 30px, 80px);
      @include fluid-type(margin-right, 1440px, 3866px, 10px, 30px);
      vertical-align: middle;
    }

    // Device availability
    .device-type__info--availability {
      display: inline-block;
      vertical-align: middle;
      width: auto;
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 1440px, 3866px, 80px, 130px);
      vertical-align: middle;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 1440px, 3866px, 60px, 90px);
      vertical-align: middle;
    }
  }

  // ===============
  // URIS CONTAINER
  // ===============
  .oku-circ.oku-circ__uris {

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        @include fluid-type(font-size, 1440px, 3866px, 26px, 65px);
        margin: 0;
        font-weight: 400;
        padding-top: 40px;
    }

    li {
        width: span(4 of 8);
        float: left;
    }

    // Device container
    .device-type {
      padding-top: 20px;
      @include fluid-type(margin-bottom, 1440px, 3866px, 100px, 250px);

      ul {
        padding-left: 0;

        li {
          padding-bottom: 0;
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 1440px, 3866px, 30px, 105px);
      margin: 0;
      padding-bottom: 0;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      width: span(4 of 8);
      @include fluid-type(font-size, 1440px, 3866px, 22px, 60px);
      @include fluid-type(padding-bottom, 1440px, 3866px, 28px, 80px);
      color: $light-blue;

      p {
        @include fluid-type(margin-top, 1440px, 3866px, 10px, 20px);
        @include fluid-type(margin-bottom, 1440px, 3866px, 10px, 20px);
      }

    }

    .device-type__info--icon{
      color: #fff;
    }

    // Device count
    .device-type__info--count {
      @include fluid-type(padding-top, 1440px, 3866px, 10px, 28px);
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      @include fluid-type(width, 1440px, 3866px, 50px, 132px);
      @include fluid-type(height, 1440px, 3866px, 50px, 132px);
      display: inline-block;
      text-align: center;
      @include fluid-type(font-size, 1440px, 3866px, 24px, 60px);
      @include fluid-type(margin-right, 1440px, 3866px, 10px, 30px);
      vertical-align: middle;
    }

    // Device availability
    .device-type__info--availability {
      display: inline-block;
      vertical-align: middle;
      @include fluid-type(width, 1440px, 3866px, 140px, 400px);

    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 1440px, 3866px, 55px, 130px);
      vertical-align: middle;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 1440px, 3866px, 43px, 100px);
      vertical-align: middle;
    }
  }
}

// ===============
// URIS LIBRARY DISPLAY
// ===============

.uris {
  // ===============
  // URIS CONTAINER
  // ===============

  .oku-circ.oku-circ__uris {

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        @include fluid-type(font-size, 1440px, 3866px, 38px, 90px);
        margin: 0;
        font-weight: 400;
        padding-top: 20px;
    }

    li {
        width: span(4 of 8);
        float: left;
    }

    // Device container
    .device-type {
      padding-top: 20px;
      @include fluid-type(margin-bottom, 1440px, 3866px, 150px, 300px);


      ul {
        padding-left: 0;

        li {
          padding-bottom: 0;
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 1440px, 3866px, 38px, 100px);
      margin: 0;
      padding-bottom: 0;
    }

    // Device info: count, availavility, ..
    .device-type__info {
      width: span(4 of 8);
      @include fluid-type(font-size, 1440px, 3866px, 28px, 80px);
      @include fluid-type(padding-bottom, 1440px, 3866px, 28px, 80px);
      color: $light-blue;

      p {
        @include fluid-type(margin-top, 1440px, 3866px, 10px, 28px);
        @include fluid-type(margin-bottom, 1440px, 3866px, 10px, 28px);
      }
    }

    .device-type__info--icon {
      color: #fff;
    }

    // Device count
    .device-type__info--count {
      @include fluid-type(padding-top, 1440px, 3866px, 13px, 38px);
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      @include fluid-type(width, 1440px, 3866px, 63px, 171px);
      @include fluid-type(height, 1440px, 3866px, 63px, 171px);
      display: inline-block;
      text-align: center;
      @include fluid-type(font-size, 1440px, 3866px, 30px, 80px);
      @include fluid-type(margin-right, 1440px, 3866px, 10px, 30px);
      vertical-align: middle;
    }

    // Device availability
    .device-type__info--availability {
      display: inline-block;
      vertical-align: middle;
      @include fluid-type(width, 1440px, 3866px, 290px, 1200px);
    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 1440px, 3866px, 80px, 130px);
      vertical-align: middle;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 1440px, 3866px, 60px, 90px);
      vertical-align: middle;
    }
  }

  // ===============
  // OLIN CONTAINER
  // ===============
  .oku-circ.oku-circ__olin {

    // Unit library title
    h1 {
        text-transform: capitalize;
        font-weight: normal;
        @include fluid-type(font-size, 1440px, 3866px, 26px, 65px);
        margin: 0;
        font-weight: 400;
        padding-top: 40px;
    }

    li {
        width: span(4 of 8);
        float: left;
    }

    // Device container
    .device-type {
      padding-top: 20px;
      @include fluid-type(margin-bottom, 1440px, 3866px, 100px, 250px);

      ul {
        padding-left: 0;

        li {
          padding-bottom: 0;
        }
      }
    }

    // Device type (laptops, chargers, ...)
    .device-type__header {
      @include fluid-type(font-size, 1440px, 3866px, 30px, 105px);
      margin: 0;
      padding-bottom: 0;
    }

    // Device info: count, availavility, ...
    .device-type__info {
      width: span(4 of 8);
      @include fluid-type(font-size, 1440px, 3866px, 22px, 60px);
      @include fluid-type(padding-bottom, 1440px, 3866px, 28px, 80px);
      color: $light-blue;

      p {
        @include fluid-type(margin-top, 1440px, 3866px, 10px, 20px);
        @include fluid-type(margin-bottom, 1440px, 3866px, 10px, 20px);
      }

    }

    .device-type__info--icon{
      color: #fff;
    }

    // Device count
    .device-type__info--count {
      @include fluid-type(padding-top, 1440px, 3866px, 10px, 28px);
      color: $light-blue;
      border-radius: 50%;
      background-color: #fff;
      @include fluid-type(width, 1440px, 3866px, 50px, 132px);
      @include fluid-type(height, 1440px, 3866px, 50px, 132px);
      display: inline-block;
      text-align: center;
      @include fluid-type(font-size, 1440px, 3866px, 24px, 60px);
      @include fluid-type(margin-right, 1440px, 3866px, 10px, 30px);
      vertical-align: middle;
    }

    // Device availability
    .device-type__info--availability {
      display: inline-block;
      vertical-align: middle;
      width: auto;

    }

    // Laptop icon
    .device-type__header--icon-laptop {
      @include fluid-type(font-size, 1440px, 3866px, 55px, 130px);
      vertical-align: middle;
    }

    // Charger icon
    .device-type__header--icon-charger {
      @include fluid-type(font-size, 1440px, 3866px, 43px, 100px);
      vertical-align: middle;
    }
  }
}

</style>
