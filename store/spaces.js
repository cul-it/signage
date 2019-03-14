import { isEmpty } from 'lodash'
import libCal from '~/utils/libcal'
import R25 from '~/utils/r25'

export const state = () => ({
})

export const mutations = {
  prime: (state, data) => data.forEach(d => (state[d.name] = {'id': d.id, 'capacity': d.capacity, 'name': d.name})),
  update: (state, data) => Object.keys(data).forEach(d => (Object.assign(state[d], data[d])))
}

export const actions = {
  async fetchSchedule ({ commit, state }, payload) {
    // Fetch from LibCal API under any of these scenarios
    // -- a. initial request (empty Vuex store)
    // -- b. cache has expired
    // -- c. the stored change in status has past
    // -- d. the clock has struck midnight (we've crossed over to the next day)
    if (isEmpty(state) || libCal.staleCache(state.updated) || libCal.pastChange(state.statusChange) || libCal.nextDay(state.updated)) {
      const isR25 = R25.isR25(payload.location, payload.category)
      // Accommodate API variations from reservation systems
      // -- R25 (Registrar reservation system) requires separate request per space
      // -- LibCal offers endpoint for all spaces within a single location (aka library)
      if (isR25) {
        var apiTarget = R25
        var apiSpaces = Object.values(state)
      } else {
        apiTarget = libCal
        apiSpaces = [payload.location]
        var spacesToProcess = state
      }

      for (const space of apiSpaces) {
        // For R25, dealing with one space at a time vs potential set/group of spaces provided via LibCal
        if (isR25) spacesToProcess = { [space.name]: space }

        let feed = await apiTarget.getReservations(this.$axios, space)

        let schedule = apiTarget.buildSchedule(feed, spacesToProcess, await libCal.openingTime(this.$axios, payload.location, payload.category), await libCal.closingTime(this.$axios, payload.location, payload.category))

        commit('update', schedule)
      }
    }
  },
  primeSpaces: ({ commit }, spaces) => commit('prime', spaces)
}
