// UW Campus Buildings and Locations Data

const buildings = {
  'suzzallo': {
    id: 'suzzallo',
    name: 'Suzzallo Library',
    coordinates: { x: 100, y: 200 },
    entrances: [
      {
        id: 'suzzallo-main',
        name: 'Main Entrance',
        coordinates: { x: 100, y: 200 },
        accessSchedule: {
          monday: { open: '00:00', close: '23:59' },
          tuesday: { open: '00:00', close: '23:59' },
          wednesday: { open: '00:00', close: '23:59' },
          thursday: { open: '00:00', close: '23:59' },
          friday: { open: '00:00', close: '23:59' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' }
        },
        requiresCard: false
      },
      {
        id: 'suzzallo-side',
        name: 'Side Entrance',
        coordinates: { x: 120, y: 210 },
        accessSchedule: {
          monday: { open: '08:00', close: '18:00' },
          tuesday: { open: '08:00', close: '18:00' },
          wednesday: { open: '08:00', close: '18:00' },
          thursday: { open: '08:00', close: '18:00' },
          friday: { open: '08:00', close: '18:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: true
      }
    ]
  },
  'ode': {
    id: 'ode',
    name: 'Odegaard Library',
    coordinates: { x: 250, y: 180 },
    entrances: [
      {
        id: 'ode-main',
        name: 'Main Entrance',
        coordinates: { x: 250, y: 180 },
        accessSchedule: {
          monday: { open: '00:00', close: '23:59' },
          tuesday: { open: '00:00', close: '23:59' },
          wednesday: { open: '00:00', close: '23:59' },
          thursday: { open: '00:00', close: '23:59' },
          friday: { open: '00:00', close: '23:59' },
          saturday: { open: '10:00', close: '22:00' },
          sunday: { open: '10:00', close: '22:00' }
        },
        requiresCard: false
      }
    ]
  },
  'cse': {
    id: 'cse',
    name: 'Paul G. Allen Center (CSE)',
    coordinates: { x: 400, y: 150 },
    entrances: [
      {
        id: 'cse-main',
        name: 'Main Entrance',
        coordinates: { x: 400, y: 150 },
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
        id: 'cse-gate',
        name: 'Gates Wing Entrance',
        coordinates: { x: 420, y: 160 },
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
      }
    ]
  },
  'hub': {
    id: 'hub',
    name: 'Husky Union Building (HUB)',
    coordinates: { x: 200, y: 300 },
    entrances: [
      {
        id: 'hub-main',
        name: 'Main Entrance',
        coordinates: { x: 200, y: 300 },
        accessSchedule: {
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '08:00', close: '22:00' },
          sunday: { open: '08:00', close: '22:00' }
        },
        requiresCard: false
      }
    ]
  },
  'kane': {
    id: 'kane',
    name: 'Kane Hall',
    coordinates: { x: 150, y: 250 },
    entrances: [
      {
        id: 'kane-main',
        name: 'Main Entrance',
        coordinates: { x: 150, y: 250 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '22:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: null
        },
        requiresCard: false
      },
      {
        id: 'kane-north',
        name: 'North Entrance',
        coordinates: { x: 150, y: 230 },
        accessSchedule: {
          monday: { open: '08:00', close: '17:00' },
          tuesday: { open: '08:00', close: '17:00' },
          wednesday: { open: '08:00', close: '17:00' },
          thursday: { open: '08:00', close: '17:00' },
          friday: { open: '08:00', close: '17:00' },
          saturday: null,
          sunday: null
        },
        requiresCard: true
      }
    ]
  },
  'iec': {
    id: 'iec',
    name: 'Intellectual Exchange Center (IEC)',
    coordinates: { x: 300, y: 250 },
    entrances: [
      {
        id: 'iec-main',
        name: 'Main Entrance',
        coordinates: { x: 300, y: 250 },
        accessSchedule: {
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '08:00', close: '20:00' },
          sunday: { open: '09:00', close: '20:00' }
        },
        requiresCard: false
      }
    ]
  }
};

// Campus pathways - connections between locations
const pathways = [
  // Suzzallo connections
  { from: 'suzzallo-main', to: 'suzzallo-side', distance: 25, time: 1 },
  { from: 'suzzallo-main', to: 'kane-main', distance: 80, time: 2 },
  { from: 'suzzallo-main', to: 'ode-main', distance: 180, time: 4 },

  // Odegaard connections
  { from: 'ode-main', to: 'cse-main', distance: 200, time: 5 },
  { from: 'ode-main', to: 'iec-main', distance: 100, time: 3 },

  // CSE connections
  { from: 'cse-main', to: 'cse-gate', distance: 30, time: 1 },
  { from: 'cse-gate', to: 'iec-main', distance: 150, time: 4 },

  // HUB connections
  { from: 'hub-main', to: 'kane-main', distance: 80, time: 2 },
  { from: 'hub-main', to: 'iec-main', distance: 120, time: 3 },
  { from: 'hub-main', to: 'suzzallo-main', distance: 150, time: 4 },

  // Kane connections
  { from: 'kane-main', to: 'kane-north', distance: 20, time: 1 },
  { from: 'kane-north', to: 'suzzallo-side', distance: 50, time: 2 },
  { from: 'kane-main', to: 'iec-main', distance: 180, time: 4 },

  // IEC connections
  { from: 'iec-main', to: 'ode-main', distance: 100, time: 3 }
];

module.exports = {
  buildings,
  pathways
};
