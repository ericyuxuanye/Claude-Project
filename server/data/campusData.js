// UW Campus Buildings and Locations Data with Real Coordinates

const buildings = {
  'suzzallo': {
    id: 'suzzallo',
    name: 'Suzzallo Library',
    coordinates: { lat: 47.6564, lng: -122.3085 },
    entrances: [
      {
        id: 'suzzallo-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6564, lng: -122.3085 },
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
        id: 'suzzallo-side',
        name: 'East Entrance',
        coordinates: { lat: 47.6564, lng: -122.3082 },
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
      }
    ]
  },
  'ode': {
    id: 'ode',
    name: 'Odegaard Library',
    coordinates: { lat: 47.6564, lng: -122.3098 },
    entrances: [
      {
        id: 'ode-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6564, lng: -122.3098 },
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
  'cse': {
    id: 'cse',
    name: 'Paul G. Allen Center (CSE)',
    coordinates: { lat: 47.6534, lng: -122.3051 },
    entrances: [
      {
        id: 'cse-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6534, lng: -122.3051 },
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
        name: 'Gates Wing Entrance',
        coordinates: { lat: 47.6536, lng: -122.3048 },
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
    coordinates: { lat: 47.6553, lng: -122.3050 },
    entrances: [
      {
        id: 'hub-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6553, lng: -122.3050 },
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
  'kane': {
    id: 'kane',
    name: 'Kane Hall',
    coordinates: { lat: 47.6575, lng: -122.3094 },
    entrances: [
      {
        id: 'kane-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6575, lng: -122.3094 },
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
        coordinates: { lat: 47.6577, lng: -122.3094 },
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
  'iec': {
    id: 'iec',
    name: 'Intellectual Exchange Center (IEC)',
    coordinates: { lat: 47.6549, lng: -122.3078 },
    entrances: [
      {
        id: 'iec-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6549, lng: -122.3078 },
        accessSchedule: {
          monday: { open: '07:00', close: '22:00' },
          tuesday: { open: '07:00', close: '22:00' },
          wednesday: { open: '07:00', close: '22:00' },
          thursday: { open: '07:00', close: '22:00' },
          friday: { open: '07:00', close: '22:00' },
          saturday: { open: '09:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' }
        },
        requiresCard: false
      }
    ]
  },
  'mgh': {
    id: 'mgh',
    name: 'Mary Gates Hall',
    coordinates: { lat: 47.6556, lng: -122.3089 },
    entrances: [
      {
        id: 'mgh-main',
        name: 'Main Entrance',
        coordinates: { lat: 47.6556, lng: -122.3089 },
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
  }
};

// Campus pathways - connections between locations with walking time
const pathways = [
  // Suzzallo connections
  { from: 'suzzallo-main', to: 'suzzallo-side', distance: 50, time: 1 },
  { from: 'suzzallo-main', to: 'kane-main', distance: 150, time: 2 },
  { from: 'suzzallo-main', to: 'ode-main', distance: 100, time: 2 },
  { from: 'suzzallo-main', to: 'mgh-main', distance: 120, time: 2 },

  // Odegaard connections
  { from: 'ode-main', to: 'mgh-main', distance: 80, time: 1 },
  { from: 'ode-main', to: 'iec-main', distance: 150, time: 3 },
  { from: 'ode-main', to: 'hub-main', distance: 200, time: 4 },

  // CSE connections
  { from: 'cse-main', to: 'cse-gates', distance: 40, time: 1 },
  { from: 'cse-main', to: 'hub-main', distance: 180, time: 4 },
  { from: 'cse-gates', to: 'hub-main', distance: 170, time: 3 },

  // HUB connections
  { from: 'hub-main', to: 'iec-main', distance: 100, time: 2 },
  { from: 'hub-main', to: 'mgh-main', distance: 150, time: 3 },

  // Kane connections
  { from: 'kane-main', to: 'kane-north', distance: 30, time: 1 },
  { from: 'kane-north', to: 'suzzallo-side', distance: 100, time: 2 },
  { from: 'kane-main', to: 'mgh-main', distance: 130, time: 3 },

  // IEC connections
  { from: 'iec-main', to: 'mgh-main', distance: 90, time: 2 },

  // Mary Gates Hall connections
  { from: 'mgh-main', to: 'hub-main', distance: 110, time: 2 }
];

module.exports = {
  buildings,
  pathways
};
