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
  openNow: (times) => {
    // console.log(times)
    if (times.currently_open === true) {
      return 'open'
    } else if (times.status === 'ByApp') {
      return 'by appointment'
    } else {
      return 'closed'
    }
  }
}
