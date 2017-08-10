import _ from 'lodash'
import {$get} from '~/.nuxt-helpers/axios'
import Robin from '~/utils/libcal'

export const state = {
}

export const mutations = {
  update (state, feed) {
    // console.log(feed)
    _.assign(state, feed)
  }
}

export const actions = {
  async fetchStatus ({ commit }, desk) {
    // console.log(desk)
    let feed = await $get(Robin.api.endpoints.hours + Robin.api.desks[desk])
    // console.log(feed)
    const times = feed.locations[0].times
    // console.log(times)
    const hours = {
      'name': feed.locations[0].name,
      'status': Robin.openNow(times),
      'statusChange': 'some future time'
    }
    // console.log(hours)
    commit('update', hours)
  }
}
