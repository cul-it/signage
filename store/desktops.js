import labStats from '~/utils/labstats'

export const state = () => ({
})

export const mutations = {
  update (state, feed) {
    state[feed.location] = feed.Groups.reduce((accumulator, g) => {
      const currentGroup = { [g.Label]: g.Available }
      return { ...accumulator, ...currentGroup }
    }, 0)
  }
}

export const actions = {
  async fetchStatus ({ commit }, location) {
    let feed = await this.$axios.$get(labStats.api.endpoints.publicData + labStats.api.locations[location])
    feed['location'] = location
    commit('update', feed)
  }
}
