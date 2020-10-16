import { assign } from 'lodash'
import schema from '~/utils/schema'
import sensource from '~/utils/sensource'

// Default to zero for each key instead of empty object
// -- this plays nicer with component async fetch & computed property
export const state = () => ({
  current: 0,
  capacity: 0
})

export const mutations = {
  update (state, data) {
    assign(state, data)
  }
}

export const actions = {
  async fetch ({ commit }, payload) {
    const spaceCode = schema.locations[payload.location].sensourceId

    await Promise.all([
      sensource.getOccupancy(this.$axios, spaceCode),
      sensource.getCapacity(this.$axios, spaceCode)
    ]).then(function (results) {
      const occupancy = {
        current: results[0],
        capacity: results[1].space.maxCapacity
      }

      commit('update', occupancy)
    })
  }
}
