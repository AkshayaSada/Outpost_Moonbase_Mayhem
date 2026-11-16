# OUTPOST: Moonbase Mayhem

A child-friendly multiplayer Moonbase social-deduction game for the NASA Space Apps Challenge.

## Play
Open the app, choose a nickname, create a room and share the five-character code. Friends join with the code. The host starts the round. One astronaut is secretly assigned as saboteur; the rest are crew. Crew members complete science tasks, respond to sabotage and can call a meeting to vote. Crew wins by completing all tasks or finding the saboteur. Saboteur wins by pushing chaos to 100 or outnumbering the crew.

## Stack
- Browser frontend: HTML, CSS and JavaScript
- Backend: JavaScript API
- Database: PostgreSQL (`outpost_rooms`)

## Project files
- `public/index.html`, `public/style.css`, `public/app.js`: game client
- `api/rooms/*`: room creation, joining, state snapshots and actions
- `api/events-token.js`: realtime channel authorization
- `migrations/001_outpost.sql`: persistent room schema
- `public/DATA_SOURCES.md`: science references and simulation assumptions

## Local development
The hosted deployment uses the Hatchable runtime and SDK. The API handlers import `db` and `events` from `hatchable`, so they are not standalone Node/Express routes. For local iteration, serve `public/` with a static server and configure an API-compatible development backend or use the hosted preview. Apply the migration through the platform deployment system.

## Privacy and safety
Nicknames are limited to 16 characters. No account, email, location or personal details are requested. Do not enter real names or sensitive information. Room codes are for friendly private play, not secure invitations for sensitive data.

## Known limitations
- Turn/action-based multiplayer, not high-frequency real-time movement.
- Compact demo loop, not the full 30-day solo survival simulation.
- Character art uses emoji and CSS-built lunar scenery rather than custom 3D models.
- No live NASA telemetry is ingested; science content is supported by NASA references.
- Simultaneous conflicting actions are rejected with a retry message.
- Multiple independent browser sessions still need a live deployment test before a public demonstration.

## Deployment
Deploy through the Hatchable project console/runtime. The migration is applied on deployment. `public/` files are served by the CDN and `api/` files become API endpoints. A personal project may show a platform sign-in wall until the owner changes sharing/visibility in project settings.
