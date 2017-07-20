<template>
  <nuxt/>
</template>

<style lang="scss">

  @import '~susy';

  // ==========
  // CSS VARIABLES
  // ==========
  $bg-dark-blue: rgba(18,29,46,.8);
  $bg-medium-blue: rgba(33,43,57,.3);

  // ==========
  // CSS MIXINS
  // ==========
  @mixin border($color) {
    border: 1px solid $color;
  }

  // ==========
  // CSS LAYOUT
  // ==========
  $susy:(
    columns: 12,
    container: auto,
    global-box-sizing: border-box,
    gutters: 0
  );

  @include border-box-sizing;

  body {
    color: #fff;
    background-color: #121D2E;
    background: #121D2E url('~assets/insignia.png') no-repeat bottom right;
    background-size: contain;
    font-family: Montserrat, sans-serif;
    font-weight: 200;
  }

  ul {
    list-style: none;
    margin: 0;
  }
  time {
    position: absolute;
    width: 66%;
    top: 30px;
    color: #fff;
    padding-right: 20px;
    text-align: right;
    z-index: 9999;
    color: #3C96D2;
  }

  .oku-circ {
    position: relative;
  }

  .oku-circ__olin {
    width: span(8 of 12);
    padding: 20px;
    padding-left: 30px;
    float: left;
    background-color: $bg-dark-blue;
  }

  .oku-circ__uris {
    width: span(4 of 12);
    background-color: $bg-medium-blue;
    height: 100vh;
    float: right;
    border-left: 1px solid rgba(255,255,255,.2);
    padding-left: 3%;
  }

  .oku-circ.uris {

    display: flex;
    flex-flow: column;

    time {
      width: 100%;
    }

    .oku-circ__olin {
      padding: 20px;
      padding-left: 30px;
      background-color: $bg-medium-blue;
      height: auto;
      width: 100%;
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
      height: 100%;
      width: 100%;
      order: 1;
    }
  }

</style>
