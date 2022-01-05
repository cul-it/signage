import okapi from '~/utils/okapi'

export const state = () => ({
  locations: {}
})

export const mutations = {
  update (state, feed) {
    state.locations[feed.location] = feed.items
  }
}

export const actions = {
  async fetchStatus ({ commit }, location) {
    let feed = await okapi.getEquipment(this.$axios, location)
    feed['location'] = location
    console.log('hiya', feed)

    commit('update', feed)
  }
}
