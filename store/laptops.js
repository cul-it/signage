import libServices from '~/utils/libservices'

export const state = () => ({
  locations: {}
})

export const mutations = {
  update (state, feed) {
    state.locations[feed.location] = {
      chromebookAvailable: Number(feed.chromebookAvailable),
      chromebookNextDue: feed.chromebookNextAvailable,
      macAvailable: Number(feed.macbookAvailable),
      macNextDue: feed.macbookNextAvailable,
      windowsAvailable: Number(feed.laptopAvailable),
      windowsNextDue: feed.laptopNextAvailable
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
