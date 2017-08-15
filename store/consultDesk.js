import _ from 'lodash'
import Robin from '~/utils/libcal'

export const state = {
}

export const mutations = {
  update (state, data) {
    // console.log(data)
    _.assign(state, data)
  }
}

export const actions = {
  async fetchStatus ({ commit }, desk) {
    // console.log(desk)
    let feed = await Robin.getHours(desk)
    // console.log(feed)
    // console.log(feed.locations[0].times)
    const status = feed.locations[0].times.status
    const allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
    const deskData = {
      'name': feed.locations[0].name,
      'hours': allHours,
      'status': Robin.openNow(status, allHours),
      'statusChange': 'some future time'
    }
    console.log(deskData)
    commit('update', deskData)
  }
}
