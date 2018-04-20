import { assign, isEmpty } from 'lodash'
import api from '~/utils/libcal-schema'
import Robin from '~/utils/libcal'

export const state = () => ({
})

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
      let feed = await Robin.getHours(this.$axios, payload.desk, undefined, true, payload.jsonp)

      // Use bullet delimiter for multi-item description
      let description = api.desks[payload.desk].description.join(' \u2022 ')

      const libcalStatus = feed.locations[0].times.status
      const allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
      const status = await Robin.openNow(this.$axios, payload.desk, libcalStatus, allHours, true, payload.jsonp)

      // Relabel status under certain circumstances
      let statusLabel = Robin.statusLabel(payload.desk, status.current)

      const deskData = {
        'name': feed.locations[0].name,
        'description': description,
        'hours': allHours,
        'status': statusLabel,
        'statusChange': status.change,
        'updated': status.timestamp
      }

      commit('update', deskData)
    }
  }
}
