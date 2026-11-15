const db = require("../../db");

async function joinRoom(req, res) {
  try {
    const { playerId, name, code } = req.body || {};

    if (!playerId || !name || !code) {
      return res.status(400).json({
        error: "Enter your name and room code."
      });
    }

    const q = await db.query(
      "SELECT id,code,state FROM outpost_rooms WHERE code=$1",
      [String(code).toUpperCase()]
    );

    if (!q.rows.length) {
      return res.status(404).json({
        error: "That room code was not found."
      });
    }

    const r = q.rows[0];
    const s = r.state;

    if (s.status !== "lobby") {
      return res.status(409).json({
        error: "This mission has already started."
      });
    }

    if (s.players.some(p => p.id === String(playerId))) {
      return res.json({
        room: { id: r.id, code: r.code },
        state: s
      });
    }

    if (s.players.length >= 8) {
      return res.status(409).json({
        error: "This room is full."
      });
    }

    s.players.push({
      id: String(playerId),
      name: String(name).slice(0, 16),
      role: "crew",
      alive: true
    });

    const u = await db.query(
      "UPDATE outpost_rooms SET state=$1::jsonb, revision=revision+1, updated_at=now() WHERE id=$2 RETURNING state",
      [JSON.stringify(s), r.id]
    );

    res.json({
      room: {
        id: r.id,
        code: r.code
      },
      state: u.rows[0].state
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      error: "Could not join this room."
    });
  }
}

module.exports = joinRoom;