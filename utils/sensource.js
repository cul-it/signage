const baseUrl = 'https://display.safespace.io'

export default {
  getOccupancy: function (axios, spaceCode) {
    return axios.$get(`${baseUrl}/value/live/${spaceCode}`)
  },
  getCapacity: function (axios, spaceCode) {
    return axios.$get(`${baseUrl}/entity/space/hash/${spaceCode}`)
  }
}
