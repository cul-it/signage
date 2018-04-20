import { assign, isEmpty } from 'lodash'
import Robin from '~/utils/libcal'

export const state = () => ({
})

export const mutations = {
  prime: (state, data) => data.forEach(d => (state[d] = {})),
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
      let feed = await Robin.getReservations(this.$axios, payload.location, payload.category)

      const schedule = Robin.buildSchedule(feed, await Robin.openingTime(this.$axios, payload.location), await Robin.closingTime(this.$axios, payload.location))

      commit('update', schedule)
    }
  },
  primeSpaces: ({ commit }, spaces) => commit('prime', spaces)
}
