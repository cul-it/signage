import schema from '~/utils/schema'

export default {
  api: {
    endpoints: {
      publicData: 'labstats/api/public/GetPublicApiData/'
    },
    locations: {
      mann: 1001
    }
  },
  isLabstats: function (location, category) {
    return schema.locations[location].categories[category].labstats || false
  }
}
