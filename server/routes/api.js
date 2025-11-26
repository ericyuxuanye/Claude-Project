const express = require('express');
const router = express.Router();
const { buildings } = require('../data/campusData');
const {
  findRoute,
  isEntranceAccessible,
  getBuildingEntrances,
  findEntranceById
} = require('../utils/pathfinding');

// GET /api/buildings - Get all buildings with basic info
router.get('/buildings', (req, res) => {
  const buildingList = Object.values(buildings).map(building => ({
    id: building.id,
    name: building.name,
    coordinates: building.coordinates,
    entrances: building.entrances.map(e => ({
      id: e.id,
      name: e.name,
      requiresCard: e.requiresCard
    }))
  }));

  res.json({ buildings: buildingList });
});

// GET /api/building/:id - Get specific building details
router.get('/building/:id', (req, res) => {
  const building = buildings[req.params.id];

  if (!building) {
    return res.status(404).json({ error: 'Building not found' });
  }

  res.json({ building });
});

// POST /api/route - Calculate route between two buildings
router.post('/route', (req, res) => {
  const { from, to, dateTime } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing from or to parameter' });
  }

  // Parse date/time or use current time
  const routeTime = dateTime ? new Date(dateTime) : new Date();

  const result = findRoute(from, to, routeTime);

  if (result.error) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// POST /api/access/check - Check if an entrance is accessible
router.post('/access/check', (req, res) => {
  const { entranceId, dateTime } = req.body;

  if (!entranceId) {
    return res.status(400).json({ error: 'Missing entranceId parameter' });
  }

  const entrance = findEntranceById(entranceId);

  if (!entrance) {
    return res.status(404).json({ error: 'Entrance not found' });
  }

  const checkTime = dateTime ? new Date(dateTime) : new Date();
  const accessInfo = isEntranceAccessible(entrance, checkTime);

  res.json({
    entranceId,
    entranceName: entrance.name,
    dateTime: checkTime,
    ...accessInfo
  });
});

// GET /api/access/building/:buildingId - Get all entrance access info for a building
router.get('/access/building/:buildingId', (req, res) => {
  const { buildingId } = req.params;
  const dateTimeParam = req.query.dateTime;

  const building = buildings[buildingId];

  if (!building) {
    return res.status(404).json({ error: 'Building not found' });
  }

  const checkTime = dateTimeParam ? new Date(dateTimeParam) : new Date();

  const entranceAccess = building.entrances.map(entrance => {
    const accessInfo = isEntranceAccessible(entrance, checkTime);
    return {
      id: entrance.id,
      name: entrance.name,
      ...accessInfo
    };
  });

  res.json({
    building: building.name,
    dateTime: checkTime,
    entrances: entranceAccess
  });
});

module.exports = router;
