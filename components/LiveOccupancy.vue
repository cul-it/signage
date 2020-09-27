<template>
  <div id="live-occupancy">
    <i
      class="status-icon fas fa-sign-in-alt fa-3x"
      aria-hidden="true"
    />
    <span class="remaining"> {{ remaining }} people may enter</span>
    <span class="occupancy"> Occupancy {{ occupancy.current }} / Max {{ occupancy.capacity }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    occupancy () {
      return this.$store.state.occupancy
    },
    remaining () {
      return this.occupancy.capacity - this.occupancy.current
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
      this.$store.dispatch('occupancy/fetch', {
        location: this.$route.params.location
      })
    }, 1000 * 120)
  }
}
</script>

<style lang="scss">
  #live-occupancy {
    display: flex;
    font-size: 13.5vh;
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
  }
</style>
