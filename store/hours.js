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
  async fetch ({ commit, state }, payload) {
    // Fetch from LibCal API under any of these scenarios
    // -- a. initial request (empty Vuex store)
    // -- b. cache has expired
    // -- c. the stored change in status has past
    // -- d. the clock has struck midnight (we've crossed over to the next day)
    if (isEmpty(state) || Robin.staleCache(state.updated) || Robin.pastChange(state.statusChange) || Robin.nextDay(state.updated)) {
      let isDesk = typeof payload.desk === 'undefined' ? false : payload.desk
      let feed = await Robin.getHours(this.$axios, payload.location, undefined, isDesk, payload.jsonp)

      const libcalStatus = feed.locations[0].times.status
      const allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
      const status = await Robin.openNow(this.$axios, payload.location, libcalStatus, allHours, isDesk, payload.jsonp)

      // Relabel status under certain circumstances
      let statusLabel = Robin.statusLabel(payload.location, status.current)

      const hoursData = {
        'name': feed.locations[0].name,
        'hours': allHours,
        'status': statusLabel,
        'statusChange': status.change,
        'updated': status.timestamp
      }

      if (isDesk) {
        // Use bullet delimiter for multi-item description
        hoursData['description'] = api.desks[payload.location].description.join(' \u2022 ')
      }

      commit('update', hoursData)
    }
  }
}
