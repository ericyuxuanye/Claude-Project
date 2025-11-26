# UW Campus Navigation System

A smart navigation system for University of Washington campus that accounts for time-based building access restrictions.

## Features

- **Time-aware routing**: Calculates optimal paths based on current time and building access schedules
- **Building access restrictions**: Accounts for entrance availability by time of day and day of week
- **Smart pathfinding**: Uses Dijkstra's algorithm with access constraints
- **Real-time validation**: Warns users about access restrictions

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Algorithm**: Dijkstra's pathfinding with time constraints

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## Project Structure

```
├── server/
│   ├── index.js           # Express server
│   ├── data/              # Campus data
│   ├── routes/            # API routes
│   └── utils/             # Pathfinding algorithms
├── public/
│   ├── index.html         # Frontend UI
│   ├── style.css          # Styles
│   └── app.js             # Frontend logic
└── package.json
```

## API Endpoints

- `GET /api/buildings` - Get all buildings with access info
- `POST /api/route` - Calculate optimal route between two locations
- `GET /api/access/:buildingId` - Check building access at specific time

## How It Works

The system maintains a graph of campus locations (buildings, intersections, entrances) with:
- Distance/time weights between nodes
- Access schedules for each entrance
- Real-time filtering based on current time

Routes are calculated using a modified Dijkstra's algorithm that excludes inaccessible paths.
