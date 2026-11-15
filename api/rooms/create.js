const db = require("../../db");

function code() {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";

  for (let i = 0; i < 5; i++) {
    s += a[Math.floor(Math.random() * a.length)];
  }

  return s;
}

async function createRoom(req, res) {
  try {
    const { playerId, name, challengeDays = 7 } = req.body || {};

    if (!playerId || !name) {
      return res.status(400).json({
        error: "Add your commander name first."
      });
    }

    let roomCode = code();

    for (let i = 0; i < 5; i++) {
      const q = await db.query(
        "SELECT id FROM outpost_rooms WHERE code=$1",
        [roomCode]
      );

      if (!q.rows.length) break;

      roomCode = code();
    }

    const days = [7, 15, 30].includes(Number(challengeDays))
      ? Number(challengeDays)
      : 7;

    const state = {
      status: "lobby",
      hostId: playerId,
      challengeDays: days,
      day: 1,
      players: [
        {
          id: String(playerId),
          name: String(name).slice(0, 16),
          role: "crew",
          alive: true
        }
      ],
      resources: {
        air: 100,
        water: 100,
        power: 100,
        food: 100,
        health: 100
      },
      chaos: 0,
      log: ["Mission control welcomes your crew to Crater Camp."],
      tasks: [],
      votes: {},
      meeting: false
    };

    const q = await db.query(
      "INSERT INTO outpost_rooms(code,host_id,state) VALUES($1,$2,$3::jsonb) RETURNING id,code,state",
      [roomCode, String(playerId), JSON.stringify(state)]
    );

    res.json({
      room: {
        id: q.rows[0].id,
        code: q.rows[0].code
      },
      state: q.rows[0].state
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Could not create a room. Try again."
    });
  }
}

module.exports = createRoom;