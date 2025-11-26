const { buildings, pathways } = require('../data/campusData');

// Check if an entrance is accessible at a given time
function isEntranceAccessible(entrance, dateTime) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[dateTime.getDay()];

  const schedule = entrance.accessSchedule[dayName];

  // Not open on this day
  if (!schedule) {
    return { accessible: false, reason: `Closed on ${dayName}s` };
  }

  const currentTime = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;

  if (currentTime < schedule.open || currentTime > schedule.close) {
    return {
      accessible: false,
      reason: `Only open ${schedule.open} - ${schedule.close}`,
      schedule: schedule
    };
  }

  return {
    accessible: true,
    requiresCard: entrance.requiresCard,
    schedule: schedule
  };
}

// Build adjacency list from pathways (bidirectional)
function buildGraph() {
  const graph = {};

  pathways.forEach(pathway => {
    if (!graph[pathway.from]) graph[pathway.from] = [];
    if (!graph[pathway.to]) graph[pathway.to] = [];

    graph[pathway.from].push({
      node: pathway.to,
      distance: pathway.distance,
      time: pathway.time
    });

    // Make it bidirectional
    graph[pathway.to].push({
      node: pathway.from,
      distance: pathway.distance,
      time: pathway.time
    });
  });

  return graph;
}

// Get all entrances for a building
function getBuildingEntrances(buildingId) {
  const building = buildings[buildingId];
  if (!building) return [];
  return building.entrances;
}

// Dijkstra's algorithm with time-based access filtering
function findShortestPath(startEntranceId, endEntranceId, dateTime = new Date()) {
  const graph = buildGraph();
  const distances = {};
  const previous = {};
  const visited = new Set();
  const unvisited = new Set();

  // Initialize distances
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  });

  distances[startEntranceId] = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let currentNode = null;
    let minDistance = Infinity;

    for (let node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        currentNode = node;
      }
    }

    if (currentNode === null || distances[currentNode] === Infinity) {
      break; // No path found
    }

    if (currentNode === endEntranceId) {
      break; // Found destination
    }

    unvisited.delete(currentNode);
    visited.add(currentNode);

    // Check neighbors
    const neighbors = graph[currentNode] || [];

    for (let edge of neighbors) {
      if (visited.has(edge.node)) continue;

      // Check if neighbor entrance is accessible
      const entrance = findEntranceById(edge.node);
      if (entrance) {
        const accessCheck = isEntranceAccessible(entrance, dateTime);
        if (!accessCheck.accessible) {
          continue; // Skip inaccessible entrances
        }
      }

      const altDistance = distances[currentNode] + edge.time;

      if (altDistance < distances[edge.node]) {
        distances[edge.node] = altDistance;
        previous[edge.node] = currentNode;
      }
    }
  }

  // Reconstruct path
  if (distances[endEntranceId] === Infinity) {
    return null; // No path found
  }

  const path = [];
  let current = endEntranceId;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    path: path,
    totalTime: distances[endEntranceId],
    steps: buildSteps(path)
  };
}

// Find entrance by ID across all buildings
function findEntranceById(entranceId) {
  for (let buildingId in buildings) {
    const building = buildings[buildingId];
    const entrance = building.entrances.find(e => e.id === entranceId);
    if (entrance) {
      return entrance;
    }
  }
  return null;
}

// Find building by entrance ID
function findBuildingByEntranceId(entranceId) {
  for (let buildingId in buildings) {
    const building = buildings[buildingId];
    if (building.entrances.some(e => e.id === entranceId)) {
      return building;
    }
  }
  return null;
}

// Build step-by-step directions
function buildSteps(path) {
  const steps = [];
  let previousBuildingId = null;

  for (let i = 0; i < path.length; i++) {
    const entranceId = path[i];
    const entrance = findEntranceById(entranceId);
    const building = findBuildingByEntranceId(entranceId);

    // Skip if same building as previous (unless it's start or end)
    if (i > 0 && i < path.length - 1 && building.id === previousBuildingId) {
      continue;
    }

    if (i === 0) {
      steps.push({
        type: 'start',
        location: building.name,
        entrance: entrance.name,
        description: `Start at ${building.name} (${entrance.name})`
      });
    } else if (i === path.length - 1) {
      steps.push({
        type: 'end',
        location: building.name,
        entrance: entrance.name,
        description: `Arrive at ${building.name} (${entrance.name})`
      });
    } else {
      steps.push({
        type: 'waypoint',
        location: building.name,
        entrance: entrance.name,
        description: `Walk to ${building.name} (${entrance.name})`
      });
    }

    previousBuildingId = building.id;
  }

  return steps;
}

// Find route between two buildings
function findRoute(startBuildingId, endBuildingId, dateTime = new Date()) {
  const startBuilding = buildings[startBuildingId];
  const endBuilding = buildings[endBuildingId];

  if (!startBuilding || !endBuilding) {
    return { error: 'Building not found' };
  }

  // Try all combinations of accessible entrances
  let bestRoute = null;
  let minTime = Infinity;

  for (let startEntrance of startBuilding.entrances) {
    const startAccess = isEntranceAccessible(startEntrance, dateTime);
    if (!startAccess.accessible) continue;

    for (let endEntrance of endBuilding.entrances) {
      const endAccess = isEntranceAccessible(endEntrance, dateTime);
      if (!endAccess.accessible) continue;

      const route = findShortestPath(startEntrance.id, endEntrance.id, dateTime);

      if (route && route.totalTime < minTime) {
        minTime = route.totalTime;
        bestRoute = route;
      }
    }
  }

  if (!bestRoute) {
    return {
      error: 'No accessible route found',
      reason: 'All entrances may be closed at this time'
    };
  }

  return {
    from: startBuilding.name,
    to: endBuilding.name,
    route: bestRoute,
    estimatedMinutes: bestRoute.totalTime
  };
}

module.exports = {
  findRoute,
  isEntranceAccessible,
  getBuildingEntrances,
  findEntranceById,
  findBuildingByEntranceId
};
