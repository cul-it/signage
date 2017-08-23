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
    top: calc(30 * 0.092vh);
    color: #fff;
    //padding-right: 20px;
    padding-right: calc(20 * 0.053vw);
    text-align: right;
    z-index: 9999;
    //@include fluid-type(font-size, 1440px, 1920px, 14px, 20px);
    font-size: calc(30 * 0.053vw);
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
      padding-left: calc(70 * 0.053vw);

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
      padding-left: calc(50 * 0.053vw);

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
      font-size: calc(30 * 0.053vw);
      //right: 20px;
      right: calc(20 * 0.053vw);

    }

    .oku-circ__olin {
      //padding: 20px;
      padding: calc(20 * 0.053vh);
      padding-left: calc(30 * 0.053vh);
      //padding-left: 30px;
      background-color: $bg-medium-blue;
      //padding-top: 40px;
      padding-top: calc(30 * 0.092vh);
      order: 2;
    }

    .oku-circ__uris {
      background-color: $bg-dark-blue;
      border-bottom: 1px solid rgba(255,255,255,.2);
      border-left: none;
      //padding-left: 30px;
      padding-left: calc(30 * 0.053vw);
      //padding-top: 20px;
      padding-top: calc(20 * 0.092vh);
      //padding-bottom: 40px;
      padding-bottom: calc(40 * 0.092vh);

      order: 1;
    }
  }

</style>
