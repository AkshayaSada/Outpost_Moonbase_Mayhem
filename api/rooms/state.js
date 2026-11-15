const db = require("../../db");

async function getState(req, res) {
  try {
    const code = String(req.query.code || "").toUpperCase();
    const pid = String(req.query.playerId || "");

    const q = await db.query(
      "SELECT id,code,state FROM outpost_rooms WHERE code=$1",
      [code]
    );

    if (!q.rows.length) {
      return res.status(404).json({
        error: "Room not found."
      });
    }

    const r = q.rows[0];
    const s = r.state;

    if (!s.players.some(p => p.id === pid)) {
      return res.status(403).json({
        error: "You are not in this crew."
      });
    }

    const safe = {
      ...s,
      players: s.players.map(p => ({
        ...p,
        role:
          s.status === "lobby"
            ? "crew"
            : s.status === "ended" || p.id === pid
            ? p.role
            : undefined
      }))
    };

    res.json({
      room: {
        id: r.id,
        code: r.code
      },
      state: safe
    });
  } catch (e) {
    res.status(500).json({
      error: "Could not load mission."
    });
  }
}

module.exports = getState;