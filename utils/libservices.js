import { filter, size } from 'lodash'

const baseUrl = 'https://api.library.cornell.edu/LibServices/'

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
    return size(
      filter(list, { equipmentType: type, dueDate: null })
    )
  }
}
