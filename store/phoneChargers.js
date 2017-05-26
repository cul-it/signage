import _ from 'lodash'
import {$get} from '~/.nuxt-helpers/axios'
import Batman from '~/utils/libservices'

export const state = {
  locations: {}
}

export const mutations = {
  update (state, feed) {
    state.locations[feed.location] = {}
    _.assign(state.locations[feed.location], feed.availability)
  }
}

export const actions = {
  async fetchStatus ({ commit }, location) {
    let feed = await $get(Batman.api.endpoints.phoneChargers + Batman.api.locations[location])
    const list = feed.equipmentList
    const phoneChargers = {
      'availability': {
        'iphone4Available': Batman.availableEquipmentType(list, 'phone-charger-iphone4'),
        'iphoneAvailable': Batman.availableEquipmentType(list, 'phone-charger-iphone'),
        'microUsbAvailable': Batman.availableEquipmentType(list, 'phone-charger-micro-usb'),
        'usbCAvailable': Batman.availableEquipmentType(list, 'phone-charger-usb-c')
      },
      'location': location
    }
    commit('update', phoneChargers)
  }
}
