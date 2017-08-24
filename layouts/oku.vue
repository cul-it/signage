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

  // Width scale factor for Olin
  $olin-width: 0.053vw;

  // Height scale factor for Olin
  $olin-height: 0.092vh;

  // Width scale factor for Uris
  $uris-width: 0.092vw;

  // Height scale factor for Uris
  $uris-height: 0.053vh;

  // ==========
  // CSS LAYOUT
  // ==========

  * {
    box-sizing: border-box;
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
    width: 64%;
    //top: 30px;
    top: 30 * $olin-height;
    color: #fff;
    //padding-right: 20px;
    padding-right: 20 * $olin-width;
    text-align: right;
    z-index: 9999;
    //@include fluid-type(font-size, 1440px, 1920px, 14px, 20px);
    font-size: 30 * $olin-width;
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
      background-color: $bg-dark-blue;
      margin: 0;
      padding: 0;
      //padding-left: 50px;
      padding-left: 70 * $olin-width;

    }

    .oku-circ__uris {
      width: 35vw;
      height: 100vh;
      float: left;
      background-color: $bg-medium-blue;
      border-left: 1px solid rgba(255,255,255,.2);
      margin: 0;
      padding: 0;
      //padding-left: 50px;
      padding-left: 50 * $olin-width;

    }
  }

  // ====================
  // URIS LIBRARY DISPLAY
  // ====================

  .oku-circ.uris {

    display: flex;
    flex-flow: column;

    time {
      width: 100%;
      //@include fluid-type(font-size, 810px, 1080px, 14px, 30px);
      font-size: 30 * $olin-width;
      //right: 20px;
      right: 20 * $olin-width;

    }

    .oku-circ__olin {
      //padding: 20px;
      padding: 20 * $uris-height;
      padding-left: 30 * $uris-height;
      //padding-left: 30px;
      background-color: $bg-medium-blue;
      //padding-top: 40px;
      padding-top: 30 * $olin-height;
      order: 2;
    }

    .oku-circ__uris {
      background-color: $bg-dark-blue;
      border-bottom: 1px solid rgba(255,255,255,.2);
      border-left: none;
      //padding-left: 30px;
      padding-left: 30 * $olin-width;
      //padding-top: 20px;
      padding-top: 20 * $olin-height;
      //padding-bottom: 40px;
      padding-bottom: 40 * $olin-height;

      order: 1;
    }
  }

</style>
