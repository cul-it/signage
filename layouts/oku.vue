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

  // Landscpae width scale factor
  $lw: 0.053vw;

  // Landscpae height scale factor
  $lh: 0.092vh;

  // Portrait width scale factor
  $pw: 0.092vw;

  // Portrait height scale factor
  $ph: 0.053vh;

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
    top: 30 * $lh;
    color: #fff;
    padding-right: 20 * $lw;
    text-align: right;
    z-index: 9999;
    font-size: 30 * $lw;
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
      padding-left: 70 * $lw;

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
      padding-left: 50 * $lw;

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
      font-size: 30 * $lw;
      right: 20 * $lw;
    }

    .oku-circ__olin {
      //padding: 20px;
      padding: 20 * $ph;
      padding-left: 30 * $ph;
      //padding-left: 30px;
      background-color: $bg-medium-blue;
      //padding-top: 40px;
      padding-top: 30 * $lh;
      order: 2;
    }

    .oku-circ__uris {
      background-color: $bg-dark-blue;
      border-bottom: 1px solid rgba(255,255,255,.2);
      border-left: none;
      //padding-left: 30px;
      padding-left: 30 * $lw;
      //padding-top: 20px;
      padding-top: 20 * $lh;
      //padding-bottom: 40px;
      padding-bottom: 40 * $lh;

      order: 1;
    }
  }

</style>
