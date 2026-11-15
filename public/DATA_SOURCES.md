# OUTPOST: Moonbase Mayhem — data sources and assumptions

## Scope
OUTPOST is a fictional, child-friendly game. Room, role, task, resource, sabotage, emergency and victory values are game mechanics, not measurements of an actual lunar base. The game is designed to remain playable without external NASA services.

## Scientific background references
- NASA Moon to Mars: https://www.nasa.gov/humans-in-space/moon-to-mars/ — context for sustained human exploration beyond Earth.
- NASA Lunar Reconnaissance Orbiter: https://science.nasa.gov/mission/lro/ — lunar surface mapping context; the game map is a fictional crater, not an LRO-derived navigation product.
- NASA Space Weather: https://science.nasa.gov/heliophysics/space-weather/ — background on solar activity and space-weather hazards. The game does not ingest live alerts; incidents are fictional.
- NASA Environmental Control and Life Support System: https://www.nasa.gov/reference/environmental-control-and-life-support-system-eclss/ — background on spacecraft air and water systems.
- NASA Deep Space Network: https://deepspace.jpl.nasa.gov/ — background on communicating with distant spacecraft. The game does not model live signal or precise Earth–Moon latency.
- NASA Veggie: https://www.nasa.gov/mission/station/research-explorer/investigation/?#id=758 — background on plant-growth research in space.

## Assumptions
- Five resource meters are abstract percentages for child-friendly decision-making.
- Map, base buildings, avatars and character names are fictional original game art made with emoji and CSS shapes.
- Crew-versus-saboteur is a fictional social-deduction layer, not a representation of astronaut procedures.
- This compact round uses a task list and simplified win conditions for a quick multiplayer demonstration.
- The game uses a shared PostgreSQL room state and event notifications. It needs no external AI service or NASA API key.
- Room codes and nicknames are temporary gameplay identifiers, not real identity verification. Do not enter personal information.

## Offline and resilience
Game mechanics, task descriptions, room state and educational explanations are served by the application. Gameplay continues if NASA websites or other external references are unavailable. External links are optional reading only.

## Limitations
The current build is a browser-based turn/action multiplayer game, not a real-time physics simulation. Realtime events notify clients of state changes; PostgreSQL remains the source of truth. Players need network access to share a room. No live NASA data is currently ingested or represented as current observation.