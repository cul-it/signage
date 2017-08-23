<template>
  <div class="mann-consult">
    <h1 class="desk" :class="statusClass">{{ desk }}</h1>

    <p v-if="description">{{ description }}</p>

    <span class="status-current">{{ deskInfo.status }}</span> <span class="until knockout">until</span>
    <time class="status-change" v-html="deskInfo.statusChange"/>
  </div>
</template>

<script>
export default {
  head () {
    return {
      htmlAttrs: {
        class: this.statusClass
      },
      title: this.desk.toUpperCase(),
      titleTemplate: '%s - Mann Consultation'
    }
  },
  data () {
    return {
      desk: this.$route.params.desk,
      description: ''
    }
  },
  computed: {
    deskInfo () {
      return this.$store.state.consultDesk
    },
    statusClass () {
      return 'status--' + this.deskInfo.status.replace(/\s/g, '-')
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('consultDesk/fetchStatus', params.desk)
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

  html {
    &.status {
      &--by-appointment {
        background: #485963;
      }

      &--closed {
        background: #b42b5a;
      }

      &--open {
        background: #3d9488;
      }
    }
  }

  body {
    margin: 0;
  }

  .desk {
    margin: 0;
    margin-left: -.04em;
    font-size: 29vh;
    letter-spacing: 10vw;
    overflow: hidden;
    line-height: .9em;
    text-transform: uppercase;

    &.status--by-appointment {
      background: #657c8a;
    }

    &.status--closed {
      background: #d93663;
    }

    &.status--open {
      background: #30776b;
    }
  }

  .knockout {
    opacity: .5;
  }

  .mann-consult {
    padding-left: .5em;
    font-family: 'Lato', sans-serif;
  }

  .status-change {
    display: block;
    font-size: 14vh;
  }

  .status-current {
    font-size: 20vh;
    text-transform: capitalize;
  }

  .until {
    margin-left: .18em;
    font-size: 10vh;
    font-weight: 100;
  }
</style>
