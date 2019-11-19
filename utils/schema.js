export default {
  desks: {
    ciser: {
      hoursId: 3016,
      description: []
    },
    cit: {
      hoursId: 11307,
      description: [
        'IT service desk consulting'
      ]
    },
    cscu: {
      hoursId: 3017,
      description: [
        'statistical consulting'
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
    knight: {
      hoursId: 3018,
      description: [
        'writing',
        'walk-in'
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
      circ: {
        spaces: {
          classrooms: [
            {
              id: 18628,
              room: 'Stone'
            },
            {
              id: 705,
              room: 'B30A',
              hoursId: 2319,
              r25: true
            },
            {
              id: 704,
              room: 'B30B',
              hoursId: 2319,
              r25: true
            }
          ],
          conferenceRooms: [
            {
              id: 18604,
              room: '100'
            },
            {
              id: 18605,
              room: '102'
            },
            {
              id: 1000,
              room: '160',
              exchange: true
            }
          ],
          lobby: [
            {
              id: 18606,
              room: 'Lobby 1'
            },
            {
              id: 18607,
              room: 'Lobby 2'
            }
          ]
        }
      },
      categories: {
        b30: {
          id: false,
          hoursId: 2319,
          url: 'https://mannlib.cornell.edu/reserve/classrooms',
          r25: true,
          labstats: 'mann',
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
        },
        room104: {
          id: false,
          hoursId: 11395,
          spaces: [
            {
              id: 51625,
              room: 'Olin 104'
            }
          ]
        }
      }
    },
    uris: {
      id: 94,
      hoursId: 2830,
      url: 'https://spaces.library.cornell.edu/reserve/uris',
      categories: {
        cocktail: {
          id: false,
          hoursId: 3657,
          url: 'https://spaces.library.cornell.edu/reserve/uris-cocktail',
          spaces: [
            {
              id: 5647,
              room: '4B02'
            },
            {
              id: 5648,
              room: '4B03'
            },
            {
              id: 5649,
              room: '4B04'
            }
          ]
        },
        interview: {
          id: false,
          url: 'https://spaces.library.cornell.edu/reserve/uris-interview',
          spaces: [
            {
              id: 30587,
              room: 'Uris 108'
            }
          ]
        }
      }
    }
  }
}
