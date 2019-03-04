import libServices from '~/utils/libservices'

export const state = () => ({
  locations: {}
})

export const mutations = {
  update (state, feed) {
    state.locations[feed.location] = {
      windowsAvailable: Number(feed.laptopAvailable),
      windowsNextDue: feed.laptopNextAvailable,
      macAvailable: Number(feed.macbookAvailable),
      macNextDue: feed.macbookNextAvailable
    }
  }
}

export const actions = {
  async fetchStatus ({ commit }, location) {
    let feed = await this.$axios.$get(libServices.api.endpoints.laptops + libServices.api.locations[location])
    feed['location'] = location
    commit('update', feed)
  }
}
