<template>
  <div class="mann-consult">
    <h1 class="desk">{{ desk }}</h1>

    <p v-if="description">{{ description }}</p>

    <span class="status">{{ deskInfo.status }}</span> until
    <time v-html="deskInfo.statusChange"/>
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

  .desk {
    text-transform: uppercase;
  }

  .mann-consult {
    font-family: 'Lato', sans-serif;
  }

  .status {
    text-transform: capitalize;

    &--by-appointment {
      background: #485963;
    }

    &--closed {
      background: #B42B5A;
    }

    &--open {
      background: #3D9488;
    }
  }
</style>
