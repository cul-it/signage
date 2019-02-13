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
      url: 'https://mannlib.cornell.edu/reserve',
      categories: {
        studyrooms: {
          id: false,
          spaces: [
            {
              id: 20087,
              room: 270,
              capacity: 'group'
            },
            {
              id: 20088,
              room: 271,
              capacity: 'individual'
            },
            {
              id: 20089,
              room: 272,
              capacity: 'individual'
            }
          ]
        }
      }
    },
    mannufactory: {
      id: 96,
      hoursId: 8658,
      categories: {
        multimedia: {
          id: false,
          spaces: [
            {
              id: 33374,
              room: 'Multimedia Studio'
            }
          ]
        }
      }
    },
    olin: {
      id: 528,
      hoursId: 2818,
      // TODO: Allow for URL at category level to override location?
      url: 'https://spaces.library.cornell.edu/reserve/olincolab',
      categories: {
        colab: {
          id: false,
          spaces: [
            {
              id: 42377,
              room: 'Olin CoLab'
            }
          ]
        }
      }
    }
  }
}
