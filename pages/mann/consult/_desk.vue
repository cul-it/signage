<template>
  <div class="mann-consult">
    <h1 class="desk" :class="[desk, statusClass]">{{ desk }}</h1>

    <p v-if="description">{{ description }}</p>

    <div class="status">
      <span class="status__current">{{ deskInfo.status }}</span> <span class="until knockout">until</span>
      <time class="status__change" v-html="deskInfo.statusChange"/>
    </div>
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
    grid-row: 2;
    margin: 0;
    margin-left: -.04em;
    font-size: 29vh;
    letter-spacing: 14vw;
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

    &.ciser {
      letter-spacing: 10vw;
    }

    &.knight {
      letter-spacing: 3vw;
    }

    &.rdmsg {
      letter-spacing: 5vw;
    }
  }

  .knockout {
    opacity: .5;
  }

  .mann-consult {
    display: grid;
    grid-template-rows: 1fr 27vh;
    height: 100vh;
    padding-left: .5em;
    font-family: 'Lato', sans-serif;
  }

  .status {
    padding-top: 1.5em;

    &__change {
      display: block;
      font-size: 15vh;
      line-height: .8em;
    }

    &__current {
      font-size: 27vh;
      text-transform: capitalize;
    }
  }

  .until {
    margin-left: .18em;
    font-size: 15vh;
    font-weight: 100;
  }
</style>
