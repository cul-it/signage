<template>
  <div id="live-occupancy">
    <i
      class="status-icon fa-3x"
      :class="iconClass"
      aria-hidden="true"
    />
    <template v-if="vacancy">
      <span class="remaining"> {{ remaining }} people may enter</span>
      <span class="occupancy"> Occupancy {{ occupancy.current }} / Max {{ occupancy.capacity }}</span>
    </template>
    <template v-else>
      <span class="remaining">Please do not enter</span>
      <span class="occupancy">At max capacity</span>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    iconClass () {
      const keepOut = 'max far fa-times-circle'
      const enter = 'fas fa-sign-in-alt'
      return this.vacancy ? enter : keepOut
    },
    occupancy () {
      return this.$store.state.occupancy
    },
    remaining () {
      return this.occupancy.capacity - this.occupancy.current
    },
    vacancy () {
      return this.remaining > 0
    }
  },
  async fetch () {
    await this.$store.dispatch('occupancy/fetch', {
      location: this.$route.params.location
    })
  },
  mounted () {
    // Check occupancy every two minutes
    setInterval(() => {
      this.$fetch()
    }, 1000 * 120)
  }
}
</script>

<style lang="scss">
  #live-occupancy {
    display: flex;
    font-size: 8.5vw;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .occupancy {
    margin-top: .5em;
    font-size: .5em;
    font-weight: 200;
  }
  .status-icon {
    color: #009edd;

    &.max {
      color: #b42b5a;
    }
  }
</style>
