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
  async fetchStatus ({ commit }, payload) {
    // console.log(payload.desk)

    let feed = await Robin.getHours(payload.desk, undefined, payload.jsonp)
    // console.log(feed)
    // console.log(feed.locations[0].times)
    const libcalStatus = feed.locations[0].times.status
    const allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
    const status = await Robin.openNow(payload.desk, libcalStatus, allHours)
    const deskData = {
      'name': feed.locations[0].name,
      'hours': allHours,
      'status': status.current,
      'statusChange': status.change
    }
    // console.log(deskData)
    commit('update', deskData)
  }
}
