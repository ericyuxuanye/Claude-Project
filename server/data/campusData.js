// UW Campus Buildings and Locations Data with Real Coordinates
// Expanded with through-building routing optimization

const buildings = {
  // === LIBRARIES ===
  'suzzallo': {
    id: 'suzzallo',
    name: 'Suzzallo Library',
    coordinates: { lat: 47.65584447835264, lng: -122.30870759622584 },
    category: 'library',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'suzzallo-main',
        name: 'Main Entrance (West)',
        coordinates: { lat: 47.65584447835264, lng: -122.30870759622584 },
        accessSchedule: {
          monday: { open: '07:30', close: '23:00' },
          tuesday: { open: '07:30', close: '23:00' },
          wednesday: { open: '07:30', close: '23:00' },
          thursday: { open: '07:30', close: '23:00' },
          friday: { open: '07:30', close: '20:00' },
          saturday: { open: '10:00', close: '18:00' },
          sunday: { open: '10:00', close: '23:00' }
        },
        requiresCard: false
      },
      {
        id: 'suzzallo-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65566661884187, lng: -122.30716510601894 },
        accessSchedule: {
          monday: { open: '07:30', close: '18:00' },
          tuesday: { open: '07:30', close: '18:00' },
          wednesday: { open: '07:30', close: '18:00' },
          thursday: { open: '07:30', close: '18:00' },
          friday: { open: '07:30', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'suzzallo-allen',
        name: 'Allen Library Connection',
        coordinates: { lat: 47.65545, lng: -122.30780 },
        accessSchedule: {
          monday: { open: '07:30', close: '23:00' },
          tuesday: { open: '07:30', close: '23:00' },
          wednesday: { open: '07:30', close: '23:00' },
          thursday: { open: '07:30', close: '23:00' },
          friday: { open: '07:30', close: '20:00' },
          saturday: { open: '10:00', close: '18:00' },
          sunday: { open: '10:00', close: '23:00' }
        },
        requiresCard: false,
        isInternal: true
      }
    ]
  },
  'allen-library': {
    id: 'allen-library',
    name: 'Allen Library (South)',
    coordinates: { lat: 47.65520, lng: -122.30695 },
    category: 'library',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'allen-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65480, lng: -122.30720 },
        accessSchedule: {
          monday: { open: '07:30', close: '23:00' },
          tuesday: { open: '07:30', close: '23:00' },
          wednesday: { open: '07:30', close: '23:00' },
          thursday: { open: '07:30', close: '23:00' },
          friday: { open: '07:30', close: '20:00' },
          saturday: { open: '10:00', close: '18:00' },
          sunday: { open: '10:00', close: '23:00' }
        },
        requiresCard: false
      },
      {
        id: 'allen-suzzallo',
        name: 'Suzzallo Connection',
        coordinates: { lat: 47.65545, lng: -122.30780 },
        accessSchedule: {
          monday: { open: '07:30', close: '23:00' },
          tuesday: { open: '07:30', close: '23:00' },
          wednesday: { open: '07:30', close: '23:00' },
          thursday: { open: '07:30', close: '23:00' },
          friday: { open: '07:30', close: '20:00' },
          saturday: { open: '10:00', close: '18:00' },
          sunday: { open: '10:00', close: '23:00' }
        },
        requiresCard: false,
        isInternal: true
      }
    ]
  },
  'ode': {
    id: 'ode',
    name: 'Odegaard Library',
    coordinates: { lat: 47.65640633836168, lng: -122.31004678595927 },
    category: 'library',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'ode-main',
        name: 'Main Entrance (East)',
        coordinates: { lat: 47.65640633836168, lng: -122.31004678595927 },
        accessSchedule: {
          monday: { open: '00:00', close: '23:59' },
          tuesday: { open: '00:00', close: '23:59' },
          wednesday: { open: '00:00', close: '23:59' },
          thursday: { open: '00:00', close: '23:59' },
          friday: { open: '00:00', close: '23:59' },
          saturday: { open: '00:00', close: '23:59' },
          sunday: { open: '00:00', close: '23:59' }
        },
        requiresCard: false
      },
      {
        id: 'ode-west',
        name: 'West Entrance',
        coordinates: { lat: 47.65650, lng: -122.31080 },
        accessSchedule: {
          monday: { open: '00:00', close: '23:59' },
          tuesday: { open: '00:00', close: '23:59' },
          wednesday: { open: '00:00', close: '23:59' },
          thursday: { open: '00:00', close: '23:59' },
          friday: { open: '00:00', close: '23:59' },
          saturday: { open: '00:00', close: '23:59' },
          sunday: { open: '00:00', close: '23:59' }
        },
        requiresCard: false
      }
    ]
  },

  // === STUDENT UNION & SERVICES ===
  'hub': {
    id: 'hub',
    name: 'Husky Union Building (HUB)',
    coordinates: { lat: 47.65543412447449, lng: -122.30551785064522 },
    category: 'student-services',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'hub-north',
        name: 'North Entrance',
        coordinates: { lat: 47.65590, lng: -122.30545 },
        accessSchedule: {
          monday: { open: '07:00', close: '23:00' },
          tuesday: { open: '07:00', close: '23:00' },
          wednesday: { open: '07:00', close: '23:00' },
          thursday: { open: '07:00', close: '23:00' },
          friday: { open: '07:00', close: '23:00' },
          saturday: { open: '09:00', close: '22:00' },
          sunday: { open: '09:00', close: '22:00' }
        },
        requiresCard: false
      },
      {
        id: 'hub-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65500, lng: -122.30560 },
        accessSchedule: {
          monday: { open: '07:00', close: '23:00' },
          tuesday: { open: '07:00', close: '23:00' },
          wednesday: { open: '07:00', close: '23:00' },
          thursday: { open: '07:00', close: '23:00' },
          friday: { open: '07:00', close: '23:00' },
          saturday: { open: '09:00', close: '22:00' },
          sunday: { open: '09:00', close: '22:00' }
        },
        requiresCard: false
      },
      {
        id: 'hub-east',
        name: 'East Entrance (Near Flagpole)',
        coordinates: { lat: 47.65543412447449, lng: -122.30480 },
        accessSchedule: {
          monday: { open: '07:00', close: '23:00' },
          tuesday: { open: '07:00', close: '23:00' },
          wednesday: { open: '07:00', close: '23:00' },
          thursday: { open: '07:00', close: '23:00' },
          friday: { open: '07:00', close: '23:00' },
          saturday: { open: '09:00', close: '22:00' },
          sunday: { open: '09:00', close: '22:00' }
        },
        requiresCard: false
      }
    ]
  },
  'ima': {
    id: 'ima',
    name: 'Intramural Activities Building (IMA)',
    coordinates: { lat: 47.65340, lng: -122.30120 },
    category: 'recreation',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'ima-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65340, lng: -122.30120 },
        accessSchedule: {
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '21:00' },
          saturday: { open: '08:00', close: '21:00' },
          sunday: { open: '08:00', close: '23:00' }
        },
        requiresCard: true
      },
      {
        id: 'ima-west',
        name: 'West Entrance',
        coordinates: { lat: 47.65350, lng: -122.30200 },
        accessSchedule: {
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '21:00' },
          saturday: { open: '08:00', close: '21:00' },
          sunday: { open: '08:00', close: '23:00' }
        },
        requiresCard: true
      }
    ]
  },

  // === COMPUTER SCIENCE & ENGINEERING ===
  'cse': {
    id: 'cse',
    name: 'Paul G. Allen Center (CSE)',
    coordinates: { lat: 47.65356455436204, lng: -122.30559860767016 },
    category: 'engineering',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'cse-main',
        name: 'Main Entrance (West)',
        coordinates: { lat: 47.65356455436204, lng: -122.30559860767016 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' }
        },
        requiresCard: false
      },
      {
        id: 'cse-gates',
        name: 'Gates Wing Entrance (South)',
        coordinates: { lat: 47.653092140912875, lng: -122.30514806847312 },
        accessSchedule: {
          monday: { open: '07:00', close: '20:00' },
          tuesday: { open: '07:00', close: '20:00' },
          wednesday: { open: '07:00', close: '20:00' },
          thursday: { open: '07:00', close: '20:00' },
          friday: { open: '07:00', close: '20:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: true
      },
      {
        id: 'cse-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65340, lng: -122.30480 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' }
        },
        requiresCard: false
      }
    ]
  },
  'cse2': {
    id: 'cse2',
    name: 'Bill & Melinda Gates Center (CSE2)',
    coordinates: { lat: 47.65290, lng: -122.30510 },
    category: 'engineering',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'cse2-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65290, lng: -122.30510 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: false
      },
      {
        id: 'cse2-bridge',
        name: 'Bridge to Allen Center',
        coordinates: { lat: 47.65310, lng: -122.30520 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '20:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: true,
        isInternal: true
      }
    ]
  },

  // === ENGINEERING BUILDINGS ===
  'meb': {
    id: 'meb',
    name: 'Mechanical Engineering Building',
    coordinates: { lat: 47.65310, lng: -122.30410 },
    category: 'engineering',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'meb-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65310, lng: -122.30410 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: { open: '09:00', close: '17:00' },
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'meb-north',
        name: 'North Entrance',
        coordinates: { lat: 47.65350, lng: -122.30400 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'eeb': {
    id: 'eeb',
    name: 'Electrical & Computer Engineering Building',
    coordinates: { lat: 47.65370, lng: -122.30380 },
    category: 'engineering',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'eeb-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65370, lng: -122.30380 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: { open: '09:00', close: '17:00' },
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'eeb-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65340, lng: -122.30360 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'loew': {
    id: 'loew',
    name: 'Loew Hall',
    coordinates: { lat: 47.65390, lng: -122.30320 },
    category: 'engineering',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'loew-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65390, lng: -122.30320 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'fluke': {
    id: 'fluke',
    name: 'Fluke Hall',
    coordinates: { lat: 47.65420, lng: -122.30350 },
    category: 'engineering',
    allowsThroughTraffic: false,
    entrances: [
      {
        id: 'fluke-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65420, lng: -122.30350 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: true
      }
    ]
  },
  'guggenheim': {
    id: 'guggenheim',
    name: 'Guggenheim Hall (Aeronautics)',
    coordinates: { lat: 47.65440, lng: -122.30300 },
    category: 'engineering',
    allowsThroughTraffic: false,
    entrances: [
      {
        id: 'guggenheim-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65440, lng: -122.30300 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'ieb': {
    id: 'ieb',
    name: 'Interdisciplinary Engineering Building',
    coordinates: { lat: 47.65501059321182, lng: -122.30383265445965 },
    category: 'engineering',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'ieb-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65501059321182, lng: -122.30383265445965 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' }
        },
        requiresCard: false
      },
      {
        id: 'ieb-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65500, lng: -122.30350 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' }
        },
        requiresCard: false
      }
    ]
  },

  // === RED SQUARE & CENTRAL CAMPUS ===
  'kane': {
    id: 'kane',
    name: 'Kane Hall',
    coordinates: { lat: 47.65640305483598, lng: -122.30936434738139 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'kane-main',
        name: 'Main Entrance (South)',
        coordinates: { lat: 47.65640305483598, lng: -122.30936434738139 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: false
      },
      {
        id: 'kane-north',
        name: 'North Entrance',
        coordinates: { lat: 47.656662887084074, lng: -122.30874547917324 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'kane-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65650, lng: -122.30850 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'mgh': {
    id: 'mgh',
    name: 'Mary Gates Hall',
    coordinates: { lat: 47.65512818639898, lng: -122.30801192558745 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'mgh-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65512818639898, lng: -122.30801192558745 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: false
      },
      {
        id: 'mgh-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65510, lng: -122.30740 },
        accessSchedule: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: false
      }
    ]
  },
  'meany': {
    id: 'meany',
    name: 'Meany Hall',
    coordinates: { lat: 47.65690, lng: -122.30980 },
    category: 'arts',
    allowsThroughTraffic: false,
    entrances: [
      {
        id: 'meany-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65690, lng: -122.30980 },
        accessSchedule: {
          monday: { open: '08:00', close: '22:00' },
          tuesday: { open: '08:00', close: '22:00' },
          wednesday: { open: '08:00', close: '22:00' },
          thursday: { open: '08:00', close: '22:00' },
          friday: { open: '08:00', close: '22:00' },
          saturday: { open: '10:00', close: '22:00' },
          sunday: { open: '12:00', close: '18:00' }
        },
        requiresCard: false
      }
    ]
  },

  // === SOCIAL SCIENCES & HUMANITIES ===
  'gowen': {
    id: 'gowen',
    name: 'Gowen Hall',
    coordinates: { lat: 47.65620, lng: -122.30750 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'gowen-main',
        name: 'Main Entrance (West)',
        coordinates: { lat: 47.65620, lng: -122.30780 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'gowen-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65620, lng: -122.30700 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'smith': {
    id: 'smith',
    name: 'Smith Hall',
    coordinates: { lat: 47.65680, lng: -122.30830 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'smith-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65680, lng: -122.30830 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'smith-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65650, lng: -122.30840 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'savery': {
    id: 'savery',
    name: 'Savery Hall',
    coordinates: { lat: 47.65730, lng: -122.30900 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'savery-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65730, lng: -122.30900 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'savery-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65700, lng: -122.30890 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'thomson': {
    id: 'thomson',
    name: 'Thomson Hall',
    coordinates: { lat: 47.65480, lng: -122.30950 },
    category: 'academic',
    allowsThroughTraffic: false,
    entrances: [
      {
        id: 'thomson-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65480, lng: -122.30950 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },

  // === THE QUAD ===
  'denny': {
    id: 'denny',
    name: 'Denny Hall',
    coordinates: { lat: 47.65850, lng: -122.30850 },
    category: 'academic',
    allowsThroughTraffic: false,
    entrances: [
      {
        id: 'denny-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65850, lng: -122.30850 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'raitt': {
    id: 'raitt',
    name: 'Raitt Hall',
    coordinates: { lat: 47.65820, lng: -122.30780 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'raitt-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65820, lng: -122.30780 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'raitt-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65790, lng: -122.30790 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'miller': {
    id: 'miller',
    name: 'Miller Hall',
    coordinates: { lat: 47.65780, lng: -122.30700 },
    category: 'academic',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'miller-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65780, lng: -122.30700 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'miller-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65750, lng: -122.30710 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },

  // === SCIENCES ===
  'pab': {
    id: 'pab',
    name: 'Physics-Astronomy Building',
    coordinates: { lat: 47.65300, lng: -122.31150 },
    category: 'science',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'pab-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65300, lng: -122.31150 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'pab-north',
        name: 'North Entrance',
        coordinates: { lat: 47.65340, lng: -122.31140 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'bagley': {
    id: 'bagley',
    name: 'Bagley Hall (Chemistry)',
    coordinates: { lat: 47.65360, lng: -122.31050 },
    category: 'science',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'bagley-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65360, lng: -122.31050 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'bagley-east',
        name: 'East Entrance',
        coordinates: { lat: 47.65370, lng: -122.30980 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },
  'johnson': {
    id: 'johnson',
    name: 'Johnson Hall (Earth Sciences)',
    coordinates: { lat: 47.65450, lng: -122.31100 },
    category: 'science',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'johnson-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65450, lng: -122.31100 },
        accessSchedule: {
          monday: { open: '07:00', close: '21:00' },
          tuesday: { open: '07:00', close: '21:00' },
          wednesday: { open: '07:00', close: '21:00' },
          thursday: { open: '07:00', close: '21:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'johnson-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65420, lng: -122.31090 },
        accessSchedule: {
          monday: { open: '07:00', close: '18:00' },
          tuesday: { open: '07:00', close: '18:00' },
          wednesday: { open: '07:00', close: '18:00' },
          thursday: { open: '07:00', close: '18:00' },
          friday: { open: '07:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: false
      }
    ]
  },

  // === BUSINESS ===
  'paccar': {
    id: 'paccar',
    name: 'PACCAR Hall (Foster School)',
    coordinates: { lat: 47.65870, lng: -122.30550 },
    category: 'business',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'paccar-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65870, lng: -122.30550 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '20:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: false
      },
      {
        id: 'paccar-south',
        name: 'South Entrance',
        coordinates: { lat: 47.65840, lng: -122.30560 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '20:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: '10:00', close: '18:00' }
        },
        requiresCard: false
      }
    ]
  },
  'dempsey': {
    id: 'dempsey',
    name: 'Dempsey Hall (Foster School)',
    coordinates: { lat: 47.65850, lng: -122.30480 },
    category: 'business',
    allowsThroughTraffic: true,
    entrances: [
      {
        id: 'dempsey-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.65850, lng: -122.30480 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '20:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: null
        },
        requiresCard: false
      }
    ]
  }
};

// =====================================================
// PATHWAY TYPES:
// - outdoor: Standard outdoor walking path
// - indoor: Through-building route (weather protected)
// - bridge: Elevated connection between buildings
// =====================================================

const pathways = [
  // ===========================================
  // INTERNAL BUILDING CONNECTIONS (through-building)
  // ===========================================
  
  // Suzzallo-Allen Library internal connection
  { from: 'suzzallo-main', to: 'suzzallo-allen', distance: 40, time: 1, type: 'indoor' },
  { from: 'suzzallo-east', to: 'suzzallo-allen', distance: 30, time: 1, type: 'indoor' },
  { from: 'suzzallo-allen', to: 'allen-suzzallo', distance: 5, time: 0.2, type: 'indoor' },
  { from: 'allen-suzzallo', to: 'allen-south', distance: 40, time: 1, type: 'indoor' },
  
  // Suzzallo main to east (through reading room)
  { from: 'suzzallo-main', to: 'suzzallo-east', distance: 60, time: 1.5, type: 'indoor' },
  
  // Odegaard through-building
  { from: 'ode-main', to: 'ode-west', distance: 50, time: 1, type: 'indoor' },
  
  // Kane Hall through-building (great for rainy days)
  { from: 'kane-main', to: 'kane-north', distance: 40, time: 1, type: 'indoor' },
  { from: 'kane-main', to: 'kane-east', distance: 30, time: 0.8, type: 'indoor' },
  { from: 'kane-north', to: 'kane-east', distance: 35, time: 0.8, type: 'indoor' },
  
  // Mary Gates Hall through-building
  { from: 'mgh-main', to: 'mgh-east', distance: 35, time: 0.8, type: 'indoor' },
  
  // HUB through-building (major shortcut)
  { from: 'hub-north', to: 'hub-south', distance: 80, time: 1.5, type: 'indoor' },
  { from: 'hub-north', to: 'hub-east', distance: 60, time: 1.2, type: 'indoor' },
  { from: 'hub-south', to: 'hub-east', distance: 70, time: 1.3, type: 'indoor' },
  
  // CSE Allen Center through-building
  { from: 'cse-main', to: 'cse-gates', distance: 50, time: 1, type: 'indoor' },
  { from: 'cse-main', to: 'cse-east', distance: 40, time: 0.8, type: 'indoor' },
  { from: 'cse-gates', to: 'cse-east', distance: 45, time: 1, type: 'indoor' },
  
  // CSE to CSE2 bridge connection
  { from: 'cse-gates', to: 'cse2-bridge', distance: 20, time: 0.5, type: 'bridge' },
  { from: 'cse2-bridge', to: 'cse2-main', distance: 30, time: 0.6, type: 'indoor' },
  
  // MEB through-building
  { from: 'meb-main', to: 'meb-north', distance: 40, time: 0.8, type: 'indoor' },
  
  // EEB through-building  
  { from: 'eeb-main', to: 'eeb-south', distance: 35, time: 0.7, type: 'indoor' },
  
  // Gowen through-building
  { from: 'gowen-main', to: 'gowen-east', distance: 45, time: 1, type: 'indoor' },
  
  // Smith through-building
  { from: 'smith-main', to: 'smith-south', distance: 30, time: 0.7, type: 'indoor' },
  
  // Savery through-building
  { from: 'savery-main', to: 'savery-south', distance: 30, time: 0.7, type: 'indoor' },
  
  // Raitt through-building
  { from: 'raitt-main', to: 'raitt-south', distance: 30, time: 0.7, type: 'indoor' },
  
  // Miller through-building
  { from: 'miller-main', to: 'miller-south', distance: 30, time: 0.7, type: 'indoor' },
  
  // PAB through-building
  { from: 'pab-main', to: 'pab-north', distance: 40, time: 0.8, type: 'indoor' },
  
  // Bagley through-building
  { from: 'bagley-main', to: 'bagley-east', distance: 50, time: 1, type: 'indoor' },
  
  // Johnson through-building
  { from: 'johnson-main', to: 'johnson-south', distance: 35, time: 0.7, type: 'indoor' },
  
  // PACCAR through-building
  { from: 'paccar-main', to: 'paccar-south', distance: 40, time: 0.8, type: 'indoor' },
  
  // IMA through-building
  { from: 'ima-main', to: 'ima-west', distance: 60, time: 1.2, type: 'indoor' },

  // IEB through-building
  { from: 'ieb-main', to: 'ieb-east', distance: 45, time: 0.9, type: 'indoor' },

  // ===========================================
  // RED SQUARE AREA - Outdoor connections
  // ===========================================

  { from: 'suzzallo-main', to: 'kane-main', distance: 100, time: 2, type: 'outdoor' },
  { from: 'suzzallo-east', to: 'kane-north', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'suzzallo-main', to: 'ode-main', distance: 100, time: 2, type: 'outdoor' },
  { from: 'suzzallo-east', to: 'ode-main', distance: 90, time: 1.8, type: 'outdoor' },
  { from: 'kane-main', to: 'ode-main', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'kane-north', to: 'ode-main', distance: 90, time: 1.8, type: 'outdoor' },
  
  // ===========================================
  // MARY GATES & SURROUNDING - Outdoor
  // ===========================================
  
  { from: 'mgh-main', to: 'suzzallo-main', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'mgh-main', to: 'ode-main', distance: 120, time: 2.5, type: 'outdoor' },
  { from: 'mgh-main', to: 'kane-main', distance: 90, time: 1.8, type: 'outdoor' },
  { from: 'mgh-east', to: 'suzzallo-east', distance: 50, time: 1, type: 'outdoor' },
  { from: 'mgh-east', to: 'hub-north', distance: 100, time: 2, type: 'outdoor' },
  { from: 'mgh-main', to: 'gowen-main', distance: 80, time: 1.5, type: 'outdoor' },
  
  // ===========================================
  // HUB CONNECTIONS - Outdoor
  // ===========================================

  { from: 'hub-north', to: 'mgh-east', distance: 100, time: 2, type: 'outdoor' },
  { from: 'hub-north', to: 'suzzallo-east', distance: 110, time: 2.0, type: 'outdoor' },
  { from: 'hub-north', to: 'suzzallo-main', distance: 120, time: 2.2, type: 'outdoor' },
  { from: 'hub-south', to: 'suzzallo-east', distance: 100, time: 1.9, type: 'outdoor' },
  { from: 'hub-south', to: 'suzzallo-main', distance: 110, time: 2.0, type: 'outdoor' },
  { from: 'hub-south', to: 'mgh-main', distance: 110, time: 2.2, type: 'outdoor' },
  { from: 'hub-east', to: 'cse-main', distance: 120, time: 2.5, type: 'outdoor' },
  { from: 'hub-south', to: 'cse-gates', distance: 150, time: 3, type: 'outdoor' },
  { from: 'hub-south', to: 'allen-south', distance: 130, time: 2.5, type: 'outdoor' },
  
  // ===========================================
  // CSE / ENGINEERING AREA - Outdoor
  // ===========================================

  { from: 'cse-main', to: 'mgh-east', distance: 150, time: 3, type: 'outdoor' },
  { from: 'cse-east', to: 'meb-north', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'cse-east', to: 'eeb-main', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'cse2-main', to: 'meb-main', distance: 70, time: 1.4, type: 'outdoor' },
  { from: 'meb-main', to: 'eeb-south', distance: 40, time: 0.8, type: 'outdoor' },
  { from: 'meb-north', to: 'eeb-main', distance: 50, time: 1, type: 'outdoor' },
  { from: 'eeb-main', to: 'loew-main', distance: 50, time: 1, type: 'outdoor' },
  { from: 'loew-main', to: 'fluke-main', distance: 40, time: 0.8, type: 'outdoor' },
  { from: 'fluke-main', to: 'guggenheim-main', distance: 50, time: 1, type: 'outdoor' },
  { from: 'cse-east', to: 'ima-west', distance: 180, time: 3.5, type: 'outdoor' },

  // IEB connections
  { from: 'ieb-main', to: 'hub-south', distance: 90, time: 1.8, type: 'outdoor' },
  { from: 'ieb-east', to: 'hub-east', distance: 100, time: 2, type: 'outdoor' },
  { from: 'ieb-main', to: 'meb-north', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'ieb-east', to: 'eeb-main', distance: 70, time: 1.4, type: 'outdoor' },
  
  // ===========================================
  // GOWEN / SMITH / CENTRAL - Outdoor
  // ===========================================
  
  { from: 'gowen-main', to: 'suzzallo-main', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'gowen-east', to: 'suzzallo-east', distance: 70, time: 1.3, type: 'outdoor' },
  { from: 'gowen-main', to: 'kane-east', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'smith-main', to: 'kane-north', distance: 50, time: 1, type: 'outdoor' },
  { from: 'smith-south', to: 'kane-main', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'smith-main', to: 'gowen-main', distance: 70, time: 1.4, type: 'outdoor' },
  { from: 'smith-main', to: 'savery-south', distance: 50, time: 1, type: 'outdoor' },
  
  // ===========================================
  // SAVERY / MEANY / NORTH CENTRAL - Outdoor
  // ===========================================
  
  { from: 'savery-main', to: 'meany-main', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'savery-south', to: 'smith-main', distance: 50, time: 1, type: 'outdoor' },
  { from: 'meany-main', to: 'ode-west', distance: 70, time: 1.4, type: 'outdoor' },
  { from: 'meany-main', to: 'kane-north', distance: 80, time: 1.5, type: 'outdoor' },
  
  // ===========================================
  // THE QUAD AREA - Outdoor
  // ===========================================
  
  { from: 'denny-main', to: 'raitt-main', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'raitt-main', to: 'miller-main', distance: 70, time: 1.4, type: 'outdoor' },
  { from: 'raitt-south', to: 'savery-main', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'miller-main', to: 'gowen-main', distance: 100, time: 2, type: 'outdoor' },
  { from: 'miller-south', to: 'smith-main', distance: 80, time: 1.5, type: 'outdoor' },
  
  // ===========================================
  // SCIENCES AREA (West Campus) - Outdoor
  // ===========================================
  
  { from: 'pab-main', to: 'bagley-main', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'pab-north', to: 'bagley-main', distance: 70, time: 1.4, type: 'outdoor' },
  { from: 'bagley-main', to: 'johnson-south', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'bagley-east', to: 'thomson-main', distance: 70, time: 1.4, type: 'outdoor' },
  { from: 'johnson-main', to: 'ode-west', distance: 100, time: 2, type: 'outdoor' },
  { from: 'pab-main', to: 'ode-west', distance: 120, time: 2.4, type: 'outdoor' },
  { from: 'thomson-main', to: 'suzzallo-main', distance: 90, time: 1.8, type: 'outdoor' },
  
  // ===========================================
  // BUSINESS SCHOOL (North) - Outdoor
  // ===========================================
  
  { from: 'paccar-main', to: 'dempsey-main', distance: 60, time: 1.2, type: 'outdoor' },
  { from: 'paccar-south', to: 'miller-main', distance: 80, time: 1.5, type: 'outdoor' },
  { from: 'dempsey-main', to: 'guggenheim-main', distance: 120, time: 2.4, type: 'outdoor' },
  { from: 'paccar-main', to: 'denny-main', distance: 100, time: 2, type: 'outdoor' },
  
  // ===========================================
  // IMA CONNECTIONS - Outdoor
  // ===========================================
  
  { from: 'ima-main', to: 'cse2-main', distance: 200, time: 4, type: 'outdoor' },
  { from: 'ima-west', to: 'hub-east', distance: 220, time: 4.5, type: 'outdoor' }
];

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Get all indoor pathways (for weather-protected routing)
 */
function getIndoorPathways() {
  return pathways.filter(p => p.type === 'indoor' || p.type === 'bridge');
}

/**
 * Get pathways that go through a specific building
 */
function getThroughBuildingPaths(buildingId) {
  const building = buildings[buildingId];
  if (!building || !building.allowsThroughTraffic) return [];
  
  const entranceIds = building.entrances.map(e => e.id);
  return pathways.filter(p => 
    (p.type === 'indoor' || p.type === 'bridge') &&
    entranceIds.includes(p.from) && 
    entranceIds.includes(p.to)
  );
}

/**
 * Check if a pathway is available at a given time
 */
function isPathwayAvailable(pathway, dayOfWeek, time) {
  // Outdoor paths are always available
  if (pathway.type === 'outdoor') return true;
  
  // For indoor paths, check building hours
  const fromEntrance = findEntrance(pathway.from);
  const toEntrance = findEntrance(pathway.to);
  
  return isEntranceOpen(fromEntrance, dayOfWeek, time) && 
         isEntranceOpen(toEntrance, dayOfWeek, time);
}

/**
 * Find entrance by ID
 */
function findEntrance(entranceId) {
  for (const building of Object.values(buildings)) {
    const entrance = building.entrances.find(e => e.id === entranceId);
    if (entrance) return entrance;
  }
  return null;
}

/**
 * Check if entrance is open at given time
 */
function isEntranceOpen(entrance, dayOfWeek, time) {
  if (!entrance) return false;
  const schedule = entrance.accessSchedule[dayOfWeek];
  if (!schedule) return false;
  
  return time >= schedule.open && time <= schedule.close;
}

/**
 * Get optimal route considering weather preference
 * @param {boolean} preferIndoor - If true, prioritize indoor routes
 */
function getRouteWeight(pathway, preferIndoor = false) {
  const baseWeight = pathway.time;
  
  if (preferIndoor) {
    // Reduce weight for indoor paths to prefer them
    if (pathway.type === 'indoor') return baseWeight * 0.7;
    if (pathway.type === 'bridge') return baseWeight * 0.8;
  }
  
  return baseWeight;
}

module.exports = {
  buildings,
  pathways,
  getIndoorPathways,
  getThroughBuildingPaths,
  isPathwayAvailable,
  findEntrance,
  isEntranceOpen,
  getRouteWeight
};
