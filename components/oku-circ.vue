<template>
  <div class="oku-circ" v-bind:class="'oku-circ__' + okuLocation">
    <h1>{{ okuLocation }}</h1>

    <section class="laptops">
      <h2>Laptops:</h2>

      <ul>
        <li><span>{{ laptops[location].windowsAvailable }}</span> </i><i class="fa fa-windows" aria-hidden="true"></i> available {{ laptops[location].windowsNextDue }}</li>
        <li><span>{{ laptops[location].macAvailable }}</span> <i class="fa fa-apple" aria-hidden="true"></i> available {{ laptops[location].macNextDue }}</li>
      </ul>
    </section>

    <section class="chargers">
      <h2>Phone Chargers:</h2>

      <ul>
        <li><span>{{ phoneChargers[location].iphone4Available }}</span> iPhone 4 available</li>
        <li><span>{{ phoneChargers[location].iphoneAvailable}}</span> iPhone 5 &amp; up available</li>
        <li><span>{{ phoneChargers[location].microUsbAvailable }}</span> Micro USB available</li>
        <li><span>{{ phoneChargers[location].usbCAvailable }}</span> Micro USB-C available</li>
      </ul>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      okuLocation: this.location
    }
  },
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

  // ==========
  // CSS VARIABLES
  // ==========
  $light-blue: #3C96D2;
  $red: #D0011B;

 .oku-circ {
   h1 {
     text-transform: capitalize;
     font-weight: normal;
     font-size: 50px;
     margin: 0;
     font-weight: 400;
   }

   h2 {
     font-size: 40px;
     margin: 0;
     vertical-align: middle;
   }

   .laptops, .chargers {
     padding-top: 20px;
     //border-bottom: 1px solid rgba(255,255,255,.2);
     margin-bottom: 150px;
   }

   li {
     width: span(4 of 8);
     float: left;
     font-size: 30px;

     span {
       padding: 10px;
       color: #3C96D2;
       border-radius: 50%;
       background-color: #fff;
       width: 60px;
       height: 60px;
       display: inline-block;
       text-align: center;
       font-size: 30px;
       vertical-align: middle;
       margin-right: 10px;

       i {
         font-size: 40px;
         color: #fff;
         vertical-align: middle;
       }
     }
   }
 }
</style>
