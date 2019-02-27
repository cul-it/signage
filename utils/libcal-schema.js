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
        b30: {
          id: false,
          hoursId: 2319,
          url: 'https://mannlib.cornell.edu/reserve/classrooms',
          r25: true,
          spaces: [
            {
              id: 705,
              room: 'B30A'
            },
            {
              id: 704,
              room: 'B30B'
            }
          ]
        },
        bissett: {
          id: false,
          spaces: [
            {
              id: 18630,
              room: 'Workstation 1'
            },
            {
              id: 18631,
              room: 'Workstation 2'
            }
          ]
        },
        interview: {
          id: false,
          spaces: [
            {
              id: 18635,
              room: 'Interview Room'
            }
          ]
        },
        room261: {
          id: false,
          spaces: [
            {
              id: 18632,
              room: 'Group Room 261'
            }
          ]
        },
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
      url: 'https://spaces.library.cornell.edu/reserve/olin',
      categories: {
        colab: {
          id: false,
          url: 'https://spaces.library.cornell.edu/reserve/olincolab',
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
