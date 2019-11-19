<template>
  <div
    :class="groupinated"
    class="mann-circ__group"
  >
    <h1
      v-if="group !== 'Lobby'"
      class="mann-circ__group-name"
    >
      {{ group }}
    </h1>

    <div class="mann-circ__spaces">
      <mann-circ-space
        v-for="space in groupSpaces($store.state.spaces, group)"
        :key="space"
        :space="space"
        :hours="hours"
      />
    </div>
  </div>
</template>

<script>
import { filter, kebabCase } from 'lodash'
import MannCircSpace from '~/components/MannCircSpace'

export default {
  components: {
    MannCircSpace
  },
  props: {
    group: {
      type: String,
      required: true
    }
  },
  computed: {
    groupinated () {
      return kebabCase(this.group)
    },
    hours () {
      return this.$store.state.hours
    }
  },
  methods: {
    groupSpaces (spaces, group) {
      return filter(spaces, { 'group': kebabCase(group) }).map(g => g.name)
    }
  }
}
</script>

<style lang="scss">
.mann-circ__group {
  text-align: center;
}

.mann-circ__group-name {
  padding-left: 7.5vw;
}

.mann-circ__spaces {
  .lobby & {
    display: flex;
  }

  display: grid;
  /* grid-template-columns: .75fr 3fr; */
  grid-template-columns: .5fr 3fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  height: 65vh;
}

.classrooms {
  grid-column: 5 / span 1;
}

.conference-rooms {
  grid-column: 1 / span 1;
}

.lobby {
  grid-row: 3;
  grid-column: span 5;
}
</style>
