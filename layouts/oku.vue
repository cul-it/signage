<template>
  <nuxt/>
</template>

<style lang="scss">

  @import '~font-awesome/css/font-awesome.min.css';

  // ==========
  // CSS VARIABLES
  // ==========
  $bg-dark-blue: rgba(18,29,46,.3);
  $bg-medium-blue: rgba(33,43,57,.3);

  // ==========
  // CSS LAYOUT
  // ==========

  * { box-sizing: border-box; }

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

  * {
    -webkit-font-smoothing: antialiased;
  }

  body {
    color: #fff;
    background-color: #121D2E;
    background: #121D2E url('~assets/insignia.png') no-repeat bottom right;
    background-size: contain;
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  h2 {
    font-weight: 400;
  }

  ul {
    list-style: none;
    margin: 0;
  }

  // Current date/time
  time {
    position: absolute;
    left: 55%;
    top: 30px;
    color: #fff;
    padding-right: 20px;
    text-align: right;
    z-index: 9999;
    @include fluid-type(font-size, 1440px, 1920px, 14px, 20px);
  }

  .oku-circ {
    position: relative;
    width: 100vw;
  }

  // ====================
  // OLIN LIBRARY DISPLAY
  // ====================

  .oku-circ.olin {

    .oku-circ__olin {
      width: 65vw;
      height: 100vh;
      float: left;
      padding: 20px;
      padding-left: 30px;
      background-color: $bg-dark-blue;
      margin: 0;
      padding: 0;
      padding-left: 50px;
    }

    .oku-circ__uris {
      width: 35vw;
      height: 100vh;
      float: left;
      background-color: $bg-medium-blue;
      border-left: 1px solid rgba(255,255,255,.2);
      margin: 0;
      padding: 0;
      padding-left: 50px;
    }
  }

  // ====================
  // URIS LIBRARY DISPLAY
  // ====================

  .oku-circ.uris {

    display: flex;
    flex-flow: column;

    time {
      @include fluid-type(font-size, 810px, 1080px, 14px, 30px);
      right: 20px;
    }

    .oku-circ__olin {
      padding: 20px;
      padding-left: 30px;
      background-color: $bg-medium-blue;
      padding-top: 40px;
      order: 2;
    }

    .oku-circ__uris {
      background-color: $bg-dark-blue;
      border-bottom: 1px solid rgba(255,255,255,.2);
      border-left: none;
      padding-left: 30px;
      padding-top: 20px;
      padding-bottom: 40px;
      order: 1;
    }
  }

</style>
