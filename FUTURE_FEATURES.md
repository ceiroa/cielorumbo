# Public App Future Features

This backlog is for the open-source/public CieloRumbo app.

## Planned Public Features

1. Combined PDF export
- Export one clean planning packet to the user's device.
- Include the nav-log tables, route map with related information, and airspace profile.
- Keep export usable without account creation.

2. Personal minimums
- Add a personal minimums section for values such as ceiling, visibility, wind, crosswind, gusts, daylight/night comfort, and forecast timing.
- Use these values in a deterministic flight status calculation.
- Show green/yellow/red status with clear reasons.

3. Deterministic trip-risk scoring
- Compute risk from structured app data, not AI.
- Inputs should include weather category, ceiling, visibility, winds/gusts, crosswind/headwind, forecast timing, route distance, terrain/airspace complexity, aircraft performance margins, and personal minimums.
- Output should include green/yellow/red status and specific risk factors.
- This deterministic score should remain explainable and testable.

4. Select airports directly from the map
- Allow users to choose departure and add destinations by selecting airports on the map.
- Keep the existing form workflow as a fallback.

5. Europe support research
- Parked until data-source decisions are made.
- FAA airspace/charts do not cover Europe.
- Candidate research areas include OpenAIP, OurAirports, AviationWeather-compatible sources where available, and country/EASA-specific datasets.

## Product Boundary Notes

- Account creation, saved trips, sync, and logbook are tentatively reserved for the private/paid app.
- AI-assisted risk review is tentatively reserved for the private/paid app.
- The public app may keep deterministic risk scoring because it is inspectable, testable, and useful without accounts or AI.
