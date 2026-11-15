async function eventsToken(req, res) {
  res.json({
    message: "Realtime events disabled"
  });
}

module.exports = eventsToken;