<template>
  <div class="mann-circ">
    <!-- <div class="mann-circ__conference-rooms" /> -->
    <!-- <div class="mann-circ__classrooms" /> -->
    <!-- <div class="mann-circ__lobby" /> -->
    <mann-circulation
      v-for="group in groups"
      :key="group"
      :group="group"
    />
  </div>
</template>

<script>
import signage from '~/utils/core'
// import labStats from '~/utils/labstats'
import libCal from '~/utils/libcal'
import MannCirculation from '~/components/MannCirculation'

export default {
  head () {
    return {
      title: 'Circ',
      titleTemplate: signage.capitalize(this.$route.params.location) + ' - %s',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700' },
        // TODO: Use packages for officiaal Vue.js component
        // -- https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous' }
      ]
    }
  },
  components: {
    MannCirculation
  },
  data () {
    return {
      groups: [
        'Conference Rooms',
        'Classrooms',
        'Lobby'
      ]
    }
  },
  fetch: async ({ store, params }) => {
    await store.dispatch('spaces/primeSpaces', libCal.requestedCircSpaces(params.location))
    await store.dispatch('hours/fetch', {
      location: params.location,
      circ: true
    })
    await store.dispatch('spaces/fetchSchedule', {
      location: params.location,
      category: params.audience
    })
    // Fetch desktop availability from LabStats only when applicable
    // if (labStats.isLabstats(params.location, params.category)) {
    //   await store.dispatch('desktops/fetchStatus', params.location)
    // }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

.mann-circ {
  display: grid;
  grid-template-columns: 1fr repeat(3, 2vw) 1fr;
  grid-template-rows: 1fr 7vh 16vh;
  align-content: stretch;
  height: 100vh;
  padding: 0 .5em;
  font-family: 'Lato', sans-serif;
  overflow: hidden;
}

</style>
