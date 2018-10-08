export default {
  endpoints: {
    auth: 'libcal/1.1/oauth/token',
    hours: 'libcal-hours/api_hours_date.php?iid=973&format=json&nocache=1&lid=',
    spaces: {
      bookings: 'libcal/1.1/space/bookings?limit=100&'
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
        'multimedia': {
          id: false,
          spaces: [
            {
              category: 8958,
              id: 33374,
              room: 'Multimedia Studio'
            }
          ]
        },
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
