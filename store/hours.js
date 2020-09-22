import { assign, isEmpty } from 'lodash'
import schema from '~/utils/schema'
import libCal from '~/utils/libcal'
import moment from 'moment'

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
      const isCirc = typeof payload.circ === 'undefined' ? false : payload.circ
      const feed = await libCal.getHours(this.$axios, payload.location, category, undefined, isDesk, isCirc)

      // Account for locations that were removed from LibCal hours
      // -- but signage config has not yet been updated/synced
      if (feed.locations.length) {
        // If location exists in LibCal hours, proceed as usual...
        const libCalStatus = feed.locations[0].times.status
        var locationName = feed.locations[0].name

        // Account for locations open 24 hours
        if (libCalStatus === '24hours') {
          var allHours = libCalStatus
        } else {
          allHours = typeof feed.locations[0].times.hours === 'undefined' ? null : feed.locations[0].times.hours
        }
        var status = await libCal.openNow(this.$axios, payload.location, category, libCalStatus, allHours, isDesk, isCirc)
      } else {
        // Otherwise, set some fallbacks (aka fail gracefully)...
        locationName = 'undefined'
        status = {
          'change': null,
          'current': 'closed',
          'timestamp': moment()
        }
      }

      // Relabel status under certain circumstances
      let statusLabel = libCal.statusLabel(payload.location, status.current)

      const hoursData = {
        'name': locationName,
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
