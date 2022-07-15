const isMoveValid = (players, move) => {
  for (const player in players) {
    const moves = players[player].moves;
    if (moves.includes(move)) {
      return false;      
    }
  }
  return true;
};

const gamePageHandler = (players) => {
  const moves = Array(9).fill(' ');
  let lastPlayerId;

  return (req, res, next) => {
    const { url: { pathname }, method } = req;
    if (pathname === '/' && method === 'GET') {
      res.statusCode = 302;
      res.setHeader('location', '/index.html');
      res.end();
      return;
    }

    if (pathname === '/game-moves' && method === 'GET') {
      const playerId = req.cookies.sessionId;
      const myTurn = lastPlayerId !== playerId;
      
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ myTurn, moves }));
      return;
    }
    
    if (pathname === '/mark' && method === 'POST') {
      const move = req.bodyParams.get('pos');
      const playerId = req.cookies.sessionId;
      const player = players[playerId];
      const myTurn = lastPlayerId !== playerId;
      
      if (isMoveValid(players, move) && lastPlayerId !== playerId) {
        player.moves.push(move);
        moves[move - 1] = player.symbol;
        lastPlayerId = playerId;
      }

      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({myTurn, moves}));
      return;
    }
    next();
  };
};

module.exports = { gamePageHandler };
