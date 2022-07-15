const drawOnScreen = ({ response }) => {
  const { myTurn, moves, win } = JSON.parse(response);
  const message = document.getElementById('message');
  message.innerText = '';
  
  if (myTurn) {
    message.innerText = 'Your Turn !';
  }

  if (win) {
    message.innerText = 'You WON! YAY!!!';
  }

  moves.forEach((move, index) => {
    const element = document.getElementById(index + 1);
    element.innerText = move;
  });
};

const postMove = (event) => {
  const move = event.srcElement.id;
  const params = `pos=${move}`;
  xhrReq(drawOnScreen, 'POST', '/mark', params);
};

const onLoad = () => {
  const game = document.querySelector('#game');
  game.addEventListener('click', postMove);
  
  setInterval(() => {
    xhrReq(drawOnScreen, 'GET', '/game-moves');
  }, 500);
};

window.onload = onLoad;