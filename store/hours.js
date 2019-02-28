import { assign, isEmpty } from 'lodash'
import schema from '~/utils/schema'
import libCal from '~/utils/libcal'

export const state = () => ({
})

export const mutations = {
  update (state, data) {
    assign(state, data)
  }
}

export const actions = {
  async fetch ({ commit, state }, payload) {
    // Fetch from libCal API under any of these scenarios
    // -- a. initial request (empty Vuex store)
    // -- b. cache has expired
    // -- c. the stored change in status has past
    // -- d. the clock has struck midnight (we've crossed over to the next day)
    if (isEmpty(state) || libCal.staleCache(state.updated) || libCal.pastChange(state.statusChange) || libCal.nextDay(state.updated)) {
      const category = payload.category || null
      const isDesk = typeof payload.desk === 'undefined' ? false : payload.desk
      const feed = await libCal.getHours(this.$axios, payload.location, category, undefined, isDesk)

      const libCalStatus = feed.locations[0].times.status
      const allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
      const status = await libCal.openNow(this.$axios, payload.location, category, libCalStatus, allHours, isDesk)

      // Relabel status under certain circumstances
      let statusLabel = libCal.statusLabel(payload.location, status.current)

      const hoursData = {
        'name': feed.locations[0].name,
        'hours': allHours,
        'status': statusLabel,
        'statusChange': status.change,
        'updated': status.timestamp
      }

      if (isDesk) {
        // Use bullet delimiter for multi-item description
        hoursData['description'] = schema.desks[payload.location].description.join(' \u2022 ')
      }

      commit('update', hoursData)
    }
  }
}
