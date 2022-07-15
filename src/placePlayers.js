const placePlayers = (players) => {
  const symbols = ['X', 'O'];

  return (req, res, next) => {
    const { sessionId: playerId, username } = req.session;
  
    if (!players[playerId]) {
      const player = {
        name: username, playerId, symbol: symbols.reverse()[0], moves: []
      };
      players[playerId] = player;
    }
    next();
  };
};

module.exports = { placePlayers };
