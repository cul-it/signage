<template>
  <div class="mann-consult">
    <h1
      :class="[desk, statusClass]"
      class="desk"
    >
      {{ formattedDesk }}
    </h1>

    <p
      v-if="hours.description"
      class="description"
    >
      {{ hours.description }}
    </p>

    <div class="status">
      <span
        :class="hours.status"
        class="status__current"
      >{{ hours.status }}</span>
      <span class="until knockout">until</span>
      <time
        class="status__change"
      >
        {{ relativeStatusChange }}
      </time>
    </div>
  </div>
</template>

<script>
import libCal from '~/utils/libcal'

export default {
  head () {
    return {
      htmlAttrs: {
        class: this.statusClass
      },
      title: this.desk.toUpperCase(),
      titleTemplate: '%s - Mann Consultation',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700' }
      ]
    }
  },
  data () {
    return {
      desk: this.$route.params.desk
    }
  },
  computed: {
    formattedDesk () {
      return libCal.formatDeskName(this.desk)
    },
    hours () {
      return this.$store.state.hours
    },
    relativeStatusChange () {
      return libCal.formatStatusChange(this.hours.statusChange)
    },
    statusClass () {
      return 'status--' + this.hours.status.replace(/\s/g, '-')
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('hours/fetch', {
      location: params.desk,
      desk: true
    })
  },
  mounted () {
    // Update desk status every 30 seconds
    setInterval(() => {
      this.$store.dispatch('hours/fetch', {
        location: this.$route.params.desk,
        desk: true
      })
    }, 1000 * 30)
  }
}
</script>

<style lang="scss">
  html {
    &.status {
      &--by-appt,
      &--reserved {
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

  .description {
    grid-row: 2;
    margin: 0;
    padding-right: .4em;
    font-size: 6vh;
    font-weight: 100;
    line-height: .8em;
    text-align: right;
  }

  .desk {
    grid-row: 3;
    margin: 0;
    margin-left: -.04em;
    padding-left: .04em;
    border-top: solid 1vh;
    font-size: 29vh;
    letter-spacing: 14vw;
    overflow: hidden;
    line-height: .9em;
    text-transform: uppercase;

    &.status--by-appt,
    &.status--reserved {
      background: #657c8a;
      border-color: #41515a;
    }

    &.status--closed {
      background: #d93663;
      border-color: #a42751;
    }

    &.status--open {
      background: #30776b;
      border-color: #37867b;
    }

    &.ciser {
      letter-spacing: 9.6vw;
    }

    &.cit {
      padding: .1em 0 0;
      font-size: 23.2vh;
      letter-spacing: -1vw;
    }

    &.elso {
      letter-spacing: 15.1vw;
    }

    &.knight {
      padding-left: 0;
      letter-spacing: 3vw;
    }

    &.reference {
      padding: .05em 0 0;
      font-size: 25.6vh;
      letter-spacing: -1vw;
    }

    &.copyright {
      padding: .05em 0 0;
      font-size: 25.6vh;
      letter-spacing: -1vw;
    }
  }

  .knockout {
    opacity: .5;
  }

  .mann-consult {
    display: grid;
    grid-template-rows: 1fr 7vh 28vh;
    height: 100vh;
    padding-left: .5em;
    font-family: 'Lato', sans-serif;
  }

  .status {
    padding-top: 1.5em;

    &__change {
      display: block;
      font-size: 14.2vh;
      line-height: .8em;
    }

    &__current {
      font-size: 27vh;
      text-transform: capitalize;

      &.reserved {
        font-size: 24vh;
      }
    }
  }

  .until {
    margin-left: .18em;
    font-size: 15vh;
    font-weight: 100;
  }
</style>
