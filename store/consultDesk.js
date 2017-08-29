import { assign, isEmpty } from 'lodash'
import Robin from '~/utils/libcal'

export const state = {
}

export const mutations = {
  update (state, data) {
    assign(state, data)
  }
}

export const actions = {
  async fetchStatus ({ commit, state }, payload) {
    // Fetch from LibCal API under any of these scenarios
    // -- a. initial request (empty Vuex store)
    // -- b. cache has expired
    // -- c. the stored change in status has past
    // -- d. the clock has struck midnight (we've crossed over to the next day)
    if (isEmpty(state) || Robin.staleCache(state.updated) || Robin.pastChange(state.statusChange) || Robin.nextDay(state.updated)) {
      let feed = await Robin.getHours(payload.desk, undefined, payload.jsonp)

      // Use bullet delimiter if description is array
      let description = Robin.api.desks[payload.desk].description
      description = Array.isArray(description) ? description.join(' \u2022 ') : description

      const libcalStatus = feed.locations[0].times.status
      const allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
      const status = await Robin.openNow(payload.desk, libcalStatus, allHours, payload.jsonp)

      const deskData = {
        'name': feed.locations[0].name,
        'description': description,
        'hours': allHours,
        'status': status.current,
        'statusChange': status.change,
        'updated': status.timestamp
      }

      commit('update', deskData)
    }
  }
}