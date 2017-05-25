import {$get} from '~/.nuxt-helpers/axios'

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
    let feed = await $get('http://mannservices.mannlib.cornell.edu/LibServices/showLaptopInfo.do?output=json&locationId=2')
    feed['location'] = location
    commit('update', feed)
  }
}
