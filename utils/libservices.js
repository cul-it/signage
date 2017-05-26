import _ from 'lodash'

const baseUrl = 'http://mannservices.mannlib.cornell.edu/LibServices/'

export default {
  api: {
    endpoints: {
      laptops: baseUrl + 'showLaptopInfo.do?output=json&locationId=',
      phoneChargers: baseUrl + 'showEquipmentInfo.do?output=json&locationId='
    },
    locations: {
      olin: 2,
      uris: 18
    }
  },
  availableEquipmentType: (list, type) => {
    return _.size(
      _.filter(list, {equipmentType: type, dueDate: null})
    )
  }
}
