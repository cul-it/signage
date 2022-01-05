import schema from '~/utils/schema'

const okapi = {
  api: {
    endpoints: {
      auth: 'okapi/authn/login',
      items: 'okapi/inventory/items?query=(' + encodeURIComponent('holdingsRecords.statisticalCodeIds=7509bbd4-9fb7-4fb7-ab65-cc4017709e2d and effectiveLocationId==')
    }
  },
  async getEquipment (axios, location) {
    const url = okapi.api.endpoints.items + schema.locations[location].okapiId + ')'
    let authorize = await axios.post(okapi.api.endpoints.auth)
    axios.setHeader('X-Okapi-Tenant', schema.okapi.tenant)
    axios.setHeader('X-Okapi-Token', authorize.headers['x-okapi-token'])

    return axios.$get(url)
  }
}

export default okapi
