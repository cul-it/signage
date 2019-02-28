import { assign } from 'lodash'
import libServices from '~/utils/libservices'

export const state = () => ({
  locations: {}
})

export const mutations = {
  update (state, feed) {
    state.locations[feed.location] = {}
    assign(state.locations[feed.location], feed.availability)
  }
}

export const actions = {
  async fetchStatus ({ commit }, location) {
    let feed = await this.$axios.$get(libServices.api.endpoints.phoneChargers + libServices.api.locations[location])
    const list = feed.equipmentList
    const phoneChargers = {
      'availability': {
        'iphone4Available': libServices.availableEquipmentType(list, 'phone-charger-iphone4'),
        'iphoneAvailable': libServices.availableEquipmentType(list, 'phone-charger-iphone'),
        'microUsbAvailable': libServices.availableEquipmentType(list, 'phone-charger-micro-usb'),
        'usbCAvailable': libServices.availableEquipmentType(list, 'phone-charger-usb-c')
      },
      'location': location
    }
    commit('update', phoneChargers)
  }
}
