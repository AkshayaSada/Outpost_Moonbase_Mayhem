const db = require("../../db");

async function roomAction(req, res) {
  res.json({
    success: true,
    message: "Action endpoint temporarily disabled"
  });
}

module.exports = roomAction;