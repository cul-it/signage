import {$get} from '~/.nuxt-helpers/axios'
import Batman from '~/utils/libservices'

export const state = {
  locations: {}
}

export const mutations = {
  update (state, feed) {
    state.locations[feed.location] = {
      windowsAvailable: feed.laptopAvailable,
      windowsNextDue: feed.laptopNextAvailable,
      macAvailable: feed.macbookAvailable,
      macNextDue: feed.macbookNextAvailable
    }
  }
}

export const actions = {
  async fetchStatus ({ commit }, location) {
    let feed = await $get(Batman.api.endpoints.laptops + Batman.api.locations[location])
    feed['location'] = location
    commit('update', feed)
  }
}
