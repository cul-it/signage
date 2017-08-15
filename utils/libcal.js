import {$get} from '~/.nuxt-helpers/axios'
import moment from 'moment'

const baseUrl = 'https://api3.libcal.com/'

export default {
  api: {
    endpoints: {
      hours: baseUrl + 'api_hours_date.php?iid=973&format=json&nocache=1&lid='
    },
    desks: {
      ciser: 3016,
      cscu: 3017,
      gis: 2204,
      gws: 3303,
      knight: 3018,
      rdmsg: 3302
    }
  },
  formatDate: function (date) {
    return moment(date).format('Y-MM-DD')
  },
  getHours: function (desk, date) {
    // console.log(this.api)
    const requestDate = typeof date === 'undefined' ? null : '&date=' + this.formatDate(date)
    return $get(this.api.endpoints.hours + this.api.desks[desk] + requestDate)
  },
  openNow: function (status, hours) {
    const timeFmt = 'ha'

    if (status === 'ByApp') {
      return 'by appointment'
    }

    if (hours) {
      // Account for potential of multiple openings/closings in a given day
      const isOpen = hours.findIndex((hoursBlock) => {
        console.log(hoursBlock)
        return (moment().isBetween(moment(hoursBlock.from, timeFmt), moment(hoursBlock.to, timeFmt), null, []))
      })

      if (isOpen !== -1) {
        return 'open'
      }
    }

    return 'closed'
  }
}
