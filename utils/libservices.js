import _ from 'lodash'

export default {
  availableEquipmentType: (list, type) => {
    return _.size(
      _.filter(list, {equipmentType: type, dueDate: null})
    )
  }
}
