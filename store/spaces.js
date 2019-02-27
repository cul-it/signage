import { assign, isEmpty } from 'lodash'
import Robin from '~/utils/libcal'
import R25 from '~/utils/r25'

export const state = () => ({
})

export const mutations = {
  prime: (state, data) => data.forEach(d => (state[d.name] = {'id': d.id, 'capacity': d.capacity})),
  update: (state, data) => assign(state, data)
}

export const actions = {
  async fetchSchedule ({ commit, state }, payload) {
    // Fetch from LibCal API under any of these scenarios
    // -- a. initial request (empty Vuex store)
    // -- b. cache has expired
    // -- c. the stored change in status has past
    // -- d. the clock has struck midnight (we've crossed over to the next day)
    if (isEmpty(state) || Robin.staleCache(state.updated) || Robin.pastChange(state.statusChange) || Robin.nextDay(state.updated)) {
      // Special handling for spaces managed in R25 (Registrar)
      if (R25.isR25(payload.location, payload.category)) {
        const requestedSpaces = state

        // FIXME: Need to fetch reservations for each classroom!
        let feed = await R25.getReservations(this.$axios, Object.values(requestedSpaces)[0])

        var schedule = R25.buildSchedule(feed, state, await Robin.openingTime(this.$axios, payload.location, payload.category), await Robin.closingTime(this.$axios, payload.location, payload.category))
      } else {
        // Otherwise, proceed with default reservation handling via LibCal
        let feed = await Robin.getReservations(this.$axios, payload.location)

        schedule = Robin.buildSchedule(feed, state, await Robin.openingTime(this.$axios, payload.location, payload.category), await Robin.closingTime(this.$axios, payload.location, payload.category))
      }
      commit('update', schedule)
    }
  },
  primeSpaces: ({ commit }, spaces) => commit('prime', spaces)
}
