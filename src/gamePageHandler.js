const isMoveValid = (players, move) => {
  for (const player in players) {
    const moves = players[player].moves;
    if (moves.includes(move)) {
      return false;      
    }
  }
  return true;
};

const isWon = ({ moves }) => {
  const winningMoves = ['123', '456', '789', '147', '258', '369', '159', '357'];
  return winningMoves.some(
    winMove => winMove.split('').every(move => moves.includes(move)));
};

const gameMoves = (players, game) => (req, res) => {
  const { moves, lastPlayerId, won } = game;
  const playerId = req.cookies.sessionId;
  const myTurn = lastPlayerId !== playerId && !won;

  const win = isWon(players[playerId]);
  res.append('content-type', 'application/json');
  res.json({ myTurn, moves, win });
};

const markMove = (players, game) => (req, res) => {
  const { moves, lastPlayerId, won } = game;
  
  const move = req.body.pos;
  const playerId = req.cookies.sessionId;
  const player = players[playerId];
  const myTurn = lastPlayerId !== playerId && !won;

  if (isMoveValid(players, move) && lastPlayerId !== playerId && !won) {
    player.moves.push(move);
    moves[move - 1] = player.symbol;
    game.lastPlayerId = playerId;
    
    if (isWon(players[playerId])) {
      game.won = true;
    }
  }

  res.append('content-type', 'application/json');
  res.json({ myTurn, moves, win: false });
};

module.exports = { gameMoves, markMove };
