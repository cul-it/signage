const baseUrl = 'https://api2.libcal.com/'
const baseUrlHours = 'https://api3.libcal.com/'

export default {
  endpoints: {
    auth: baseUrl + '1.1/oauth/token',
    hours: baseUrlHours + 'api_hours_date.php?iid=973&format=json&nocache=1&lid=',
    spaces: {
      bookings: baseUrl + '1.1/space/bookings?'
    }
  },
  desks: {
    career: {
      id: 7733,
      description: [
        'CALS student services'
      ]
    },
    ciser: {
      id: 3016,
      description: []
    },
    cscu: {
      id: 3017,
      description: [
        'statistical consulting'
      ]
    },
    'cu-career': {
      id: 7734,
      description: [
        'Graduate',
        'Cornell Career Services'
      ]
    },
    elso: {
      id: 7701,
      description: [
        'english language support'
      ]
    },
    gis: {
      id: 2204,
      description: []
    },
    gws: {
      id: 3303,
      description: [
        'writing',
        'grad',
        'appt only'
      ]
    },
    knight: {
      id: 3018,
      description: [
        'writing',
        'walk-in'
      ]
    },
    rdmsg: {
      id: 3302,
      description: [
        'research data management'
      ]
    },
    reference: {
      id: 1710,
      description: []
    }
  },
  locations: {
    mann: {
      id: 1707,
      categories: {
        studyrooms: {
          id: 3182,
          spaces: [
            {
              id: 20087,
              room: 270
            },
            {
              id: 20088,
              room: 271
            },
            {
              id: 20089,
              room: 272
            }
          ]
        }
      }
    }
  }
}
