<template>
<div :class="'oku-circ__component--' + location" class="oku-circ__component">
  <header v-bind:class="location + '-header'">
    <h1>{{ location }}</h1>
  </header>

  <h2 v-bind:class="location + '-laptops'"><i class="fa fa-laptop icon-laptop" aria-hidden="true"></i> Laptops </h2>

  <div v-bind:class="location + '-laptops__availability'">
    <p>
      <span class="device-count">{{ laptops[location].macAvailable }}</span>
      <i class="fa fa-apple device-icon" aria-hidden="true"></i>
      <span class="available">available<!--{{ OR laptops[location].macNextDue }}--></span>
    </p>
    <p>
      <span class="device-count">{{ laptops[location].windowsAvailable }}</span>
      <i class="fa fa-windows device-icon" aria-hidden="true"></i>
      <span class="available">available<!--{{ OR laptops[location].windowsNextDue }}--></span>
    </p>
  </div>
  <h2 v-bind:class="location + '-phone-chargers'">
        <i class="fa fa-battery-quarter icon-charger" aria-hidden="true"></i> Phone Chargers
  </h2>
  <div v-bind:class="location + '-phone-chargers__availability'">
    <p>
      <span class="device-count"> {{ phoneChargers[location].iphone4Available }}</span>
      <span class="device-type__info--availability">iPhone 4</span>
      <span class="available">available</span>
    </p>
    <p>
      <span class="device-count">{{ phoneChargers[location].iphoneAvailable}}</span>
      <span class="device-type__info--availability">iPhone 5 &amp; up</span>
      <span class="available">available</span>
    </p>
    <p>
      <span class="device-count">{{ phoneChargers[location].microUsbAvailable }}</span>
      <span class="device-type__info--availability">Micro USB</span>
      <span class="available">available</span>
    </p>
    <p>
      <span class="device-count">{{ phoneChargers[location].usbCAvailable }}</span>
      <span class="device-type__info--availability">USB-C</span>
      <span class="available">available</span>
    </p>
  </div>
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
/**
 ** VARIABLES
 **/
$bg-dark-blue: rgba(18,29,46,.3);
$bg-medium-blue: rgba(33,43,57,.3);
$light-blue: #3C96D2;
$red: #D0011B;
// Landscape width scale factor
$lw: 0.053vw;
// Landscape height scale factor
$lh: 0.092vh;
// Portrait width scale factor
$pw: 0.092vw;
// Portrait height scale factor
$ph: 0.053vh;

* {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

body {
    color: #fff;
    background-color: #121D2E;
    //background: #121D2E url('../images/insignia.png') no-repeat bottom right;
    background-size: contain;
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.oku-circ__component {
    // This would be the silver bullet if better browser support :(
    // -- currently it's just Firefox and Chrome in experimental mode
    // -- http://caniuse.com/#feat=css-display-contents
    // display: subgrid has potential as well, but currently not implemented by any of the browsers
    // Additional background info...
    // -- https://www.rachelandrew.co.uk/archives/2017/03/16/subgrid-moved-to-level-2-of-the-css-grid-specification
    // -- https://rachelandrew.co.uk/archives/2016/01/29/vanishing-boxes-with-display-contents
    // -- https://gridbyexample.com/video/subgrid-display-contents
    @supports(display: contents) {
        display: contents;
    }

    // For all browsers that are NOT Firefox, here's some initial setup
    // -- Ensuring that the .oku-circ__component fills the appropriate grid areas
    // -- So it can be used as a nested grid (not yet implemented)
    grid-row: 1 / 6;

    &--olin {
        grid-column: 1 / 3;
    }

    &--uris {
        grid-column: 3;
    }
}

time {
    background-color: $bg-dark-blue;
    color: #fff;
    font-size: 20 * $lw;
    text-align: right;
    padding-right: 20 * $lw;
    padding-top: 30 * $lh;

}
/**
 ** OLIN DISPLAY CONTENT
 **/

.olin-display {

    .grid {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-columns: 33vw 32vw 35vw;
        grid-template-rows: 152*$lh 129*$lh 226*$lh 129*$lh auto;
    }

    time {
        grid-column: 2 / 3;
        grid-row: 1;
    }

    .olin-header {
        grid-column: 1 / 2;
        grid-row: 1;
        background-color: $bg-dark-blue;
        padding-left: 50 * $lw;

        h1 {
            text-transform: capitalize;
            font-weight: normal;
            font-size: 50 * $lw;
            padding-top: 50 * $lh;
            margin: 0;
        }
    }

    .olin-laptops {
        grid-column: 1 / 3;
        grid-row: 2;
        background-color: $bg-dark-blue;
        margin: 0;
        font-size: 67 * $lw;
        font-weight: 400;
        padding-bottom: 30 * $lh;
        padding-left: 50 * $lw;

        .icon-laptop {
            font-size: 90 * $lw;
            display: inline-block;
        }
    }

    .olin-laptops__availability {
        grid-column: 1 / 3;
        grid-row: 3;
        background-color: $bg-dark-blue;
        padding-left: 50 * $lw;
        font-size: 44 * $lw;
        color: #fff;
        display: flex;

        p {
            flex-grow: 1;
            margin-top: 10 * $lh;
        }
    }

    .olin-phone-chargers {
        grid-column: 1 / 3;
        grid-row: 4;
        background-color: $bg-dark-blue;
        font-size: 67 * $lw;
        font-weight: 400;
        padding-bottom: 30 * $lh;
        padding-left: 50 * $lw;
        margin: 0;
    }

    .olin-phone-chargers__availability {
        grid-column: 1 / 3;
        grid-row: 5;
        background-color: $bg-dark-blue;
        padding-left: 50 * $lw;
        font-size: 44 * $lw;
        color: #fff;
        display: flex;
        flex-flow: row wrap;

        .icon-charger {
            padding-right: 8 * $lw;
        }

        p {
            width: 50%;
            //height: auto;
            margin: 10 * $lh 0 0;
            //height: 118 * $lh;
            &:nth-child(3),
            &:nth-child(4) {
                display: inline-block;
                margin-top: -100 * $lh;
            }
        }
    }

    .device-count {
        color: $light-blue;
        border-radius: 50%;
        width: 80 * $lw;
        height: 80 * $lw;
        line-height: 80 * $lw;
        background-color: #fff;
        text-align: center;
        display: inline-block;
        margin-right: 10 * $lw;
    }

    .available {
        vertical-align: middle;
        color: $light-blue;
        display: inline-block;
        margin-top: -14 * $lh;
        padding-left: 10 * $lw;
    }

    .unavailable {
        vertical-align: middle;
        color: $red;
        display: inline-block;
        margin-top: -14 * $lh;
        padding-left: 10 * $lw;
    }

    .olin-phone-chargers__availability .available,
    .olin-phone-chargers__availability .unavailable {
        padding-left: 90 * $lw;
        display: block;
    }

    .uris-header {
        grid-column: 3;
        grid-row: 1;
        background-color: $bg-medium-blue;
        padding-left: 50 * $lw;
        border-left: 1px solid rgba(255,255,255,.2);
        padding-top: 10 * $lh;

        h1 {
            text-transform: capitalize;
            font-weight: normal;
            font-size: 40 * $lw;
            padding-top: 50 * $lh;
            margin: 0;
        }
    }

    .uris-laptops {
        grid-column: 3;
        grid-row: 2 / 3;
        background-color: $bg-medium-blue;
        margin: 0;
        font-size: 47 * $lw;
        font-weight: 400;
        padding-bottom: 30 * $lh;
        padding-left: 50 * $lw;
        border-left: 1px solid rgba(255,255,255,.2);
    }

    .uris-laptops__availability {
        grid-column: 3;
        grid-row: 3 / 4;
        background-color: $bg-medium-blue;
        border-left: 1px solid rgba(255,255,255,.2);
        margin-top: -30 * $lh;
        padding-left: 50 * $lw;
        font-size: 30 * $lw;
        color: #fff;
        display: flex;
        flex-flow: column wrap;

        .icon-charger {
            padding-right: 8 * $lw;
        }

        .device-count {
            width: 60 * $lw;
            height: 60 * $lw;
            line-height: 60 * $lw;
            margin-right: 10 * $lw;
        }

        p {
            margin: 0 0 30 * $lh;
        }
    }

    .uris-phone-chargers {
        grid-column: 3;
        grid-row: 4 / 5;
        background-color: $bg-medium-blue;
        font-size: 47 * $lw;
        font-weight: 400;
        padding-bottom: 30 * $lh;
        padding-left: 50 * $lw;
        margin: 0;
        border-left: 1px solid rgba(255,255,255,.2);

        .icon-charger {
            font-size: 40 * $lw;
            display: inline-block;
        }
    }

    .uris-phone-chargers__availability {
        grid-column: 3;
        grid-row: 5;
        background-color: $bg-medium-blue;
        padding-left: 50 * $lw;
        font-size: 30 * $lw;
        color: #fff;
        display: flex;
        flex-flow: column wrap;
        border-left: 1px solid rgba(255,255,255,.2);
        margin-top: -30 * $lh;

        .device-count {
            width: 60 * $lw;
            height: 60 * $lw;
            line-height: 60 * $lw;
        }

        p {
            margin: 0 0 30 * $lh;

            .available {
                margin-top: -8 * $lh;
            }

            .unavailable {
                margin-top: -8 * $lh;
            }
        }
    }
}

/**
** URIS DISPLAY CONTENT
**/

.uris-display {

    .grid {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-columns: .8fr 1.2fr;
        grid-template-rows: 230*$ph 140*$ph 205*$ph 140*$ph 367*$ph 60*$ph 160*$ph 120*$ph auto;
    }

    time {
        grid-column: 2 / 3;
        grid-row: 1;
        font-size: 25 * $pw;
        align-self: top;
        padding-right: 20 * $ph;

    }

    .uris-header {
        grid-column: 1 / 2;
        grid-row: 1;
        background-color: $bg-dark-blue;
        padding-left: 50 * $ph;
        padding-top: 100 * $ph;


        h1 {
            text-transform: capitalize;
            font-weight: normal;
            font-size: 75 * $ph;
            margin: 0;
        }
    }

    .uris-laptops {
        grid-column: 1 / 3;
        grid-row: 2;
        background-color: $bg-dark-blue;
        margin: 0;
        font-size: 85 * $pw;
        font-weight: 400;
        padding-bottom: 30 * $ph;
        padding-left: 50 * $pw;

        .icon-laptop {
            font-size: 110 * $pw;
            display: inline-block;
        }
    }

    .uris-laptops__availability {
        grid-column: 1 / 3;
        grid-row: 3;
        background-color: $bg-dark-blue;
        padding-left: 50 * $pw;
        font-size: 50 * $pw;
        color: #fff;
        display: flex;

        p {
            flex-grow: 1;
            margin-top: 10 * $ph;
        }
    }

    .uris-phone-chargers {
        grid-column: 1 / 3;
        grid-row: 4;
        background-color: $bg-dark-blue;
        font-size: 85 * $pw;
        font-weight: 400;
        padding-bottom: 30 * $ph;
        padding-left: 50 * $pw;
        margin: 0;
    }

    .uris-phone-chargers__availability {
        grid-column: 1 / 3;
        grid-row: 5;
        background-color: $bg-dark-blue;
        padding-left: 50 * $pw;
        font-size: 50 * $pw;
        color: #fff;
        display: flex;
        flex-flow: row wrap;

        .icon-charger {
            padding-right: 8 * $pw;
        }

        p {
            flex-grow: 1;
            width: 50%;
            //height: auto;
            margin: 10 * $ph 0 0;
            //height: 118 * $ph;
            &:nth-child(3),
            &:nth-child(4) {
                display: inline-block;
            }
        }
    }

    .device-count {
        color: $light-blue;
        border-radius: 50%;
        width: 100 * $pw;
        height: 100 * $pw;
        line-height: 100 * $pw;
        background-color: #fff;
        text-align: center;
        display: inline-block;
        margin-right: 20 * $pw;
    }

    .available {
        vertical-align: middle;
        color: $light-blue;
        display: inline-block;
        margin-top: -14 * $ph;
        padding-left: 15 * $pw;
    }

    .unavailable {
        vertical-align: middle;
        color: $red;
        display: inline-block;
        margin-top: -14 * $ph;
        padding-left: 15 * $pw;
    }

    .uris-phone-chargers__availability .available,
    .uris-phone-chargers__availability .unavailable {
        padding-left: 120 * $pw;
        display: block;
    }

    .olin-header {
        grid-column: 1 / 3;
        grid-row: 7;
        background-color: $bg-medium-blue;
        padding-left: 50 * $pw;
        border-top: 1px solid rgba(255,255,255,.2);
        padding-top: 10 * $ph;
        //margin-top: 100 * $ph;

        h1 {
            text-transform: capitalize;
            font-weight: normal;
            font-size: 55 * $pw;
            padding-top: 50 * $ph;
            margin: 0;
        }
    }

    .olin-laptops {
        grid-column: 1 / 2;
        grid-row: 8;
        background-color: $bg-medium-blue;
        margin: 0;
        font-size: 54 * $pw;
        font-weight: 400;
        padding-bottom: 30 * $ph;
        padding-left: 50 * $pw;
        border-left: 1px solid rgba(255,255,255,.2);
    }

    .olin-laptops__availability {
        grid-column: 1 / 2;
        grid-row: 9;
        background-color: $bg-medium-blue;
        border-left: 1px solid rgba(255,255,255,.2);
        margin-top: -30 * $ph;
        padding-left: 50 * $pw;
        font-size: 38 * $pw;
        color: #fff;
        display: flex;
        flex-flow: column wrap;

        .icon-charger {
            padding-right: 8 * $pw;
        }

        .device-count {
            width: 70 * $pw;
            height: 70 * $pw;
            line-height: 70 * $pw;
            margin-right: 15 * $pw;
        }

        p {
            margin: 0 0 30 * $ph;
        }
    }

    .olin-phone-chargers {
        grid-column: 2 / 3;
        grid-row: 8;
        background-color: $bg-medium-blue;
        font-size: 54 * $pw;
        font-weight: 400;
        padding-bottom: 30 * $ph;
        padding-left: 50 * $pw;
        margin: 0;

        .icon-charger {
            font-size: 43 * $pw;
            display: inline-block;
        }
    }

    .olin-phone-chargers__availability {
        grid-column: 2 / 3;
        grid-row: 9;
        background-color: $bg-medium-blue;
        padding-left: 50 * $pw;
        font-size: 38 * $pw;
        color: #fff;
        display: flex;
        flex-flow: column wrap;
        // border-left: 1px solid rgba(255,255,255,.2);
        margin-top: -30 * $ph;

        .device-count {
            width: 70 * $pw;
            height: 70 * $pw;
            line-height: 70 * $pw;
        }

        p {
            margin: 0 0 30 * $ph;

            .available {
                margin-top: -8 * $ph;
            }

            .unavailable {
                margin-top: -8 * $ph;
            }
        }
    }
}

.blink {
    animation: blinker infinite cubic-bezier(1.0,0,0,1.0) 1s;
}

@keyframes blinker {
    from {
        opacity: 1.0;
    }
    to {
        opacity: 0.0;
    }
}
</style>
