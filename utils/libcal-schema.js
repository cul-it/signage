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
      hoursId: 7733,
      description: [
        'CALS student services'
      ]
    },
    ciser: {
      hoursId: 3016,
      description: []
    },
    cscu: {
      hoursId: 3017,
      description: [
        'statistical consulting'
      ]
    },
    'cu-career': {
      hoursId: 7734,
      description: [
        'Graduate',
        'Cornell Career Services'
      ]
    },
    elso: {
      hoursId: 7701,
      description: [
        'english language support'
      ]
    },
    gis: {
      hoursId: 2204,
      description: []
    },
    gws: {
      hoursId: 3303,
      description: [
        'writing',
        'grad',
        'appt only'
      ]
    },
    knight: {
      hoursId: 3018,
      description: [
        'writing',
        'walk-in'
      ]
    },
    rdmsg: {
      hoursId: 3302,
      description: [
        'research data management'
      ]
    },
    reference: {
      hoursId: 1710,
      description: []
    }
  },
  locations: {
    mann: {
      id: 96,
      hoursId: 1707,
      categories: {
        studyrooms: {
          id: false,
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
