const express = require('express');
const { logReq } = require('./src/logReq.js');
const { gameMoves, markMove } = require('./src/gamePageHandler.js');
const { injectCookies } = require('./src/injectCookies.js');
const { addCookie, attachSession, serveLoginPage, checkCredentials }
  = require('./src/loginHandler.js');
const { placePlayers } = require('./src/placePlayers.js');
const { directToPage } = require('./gamePage.js');

const players = {};
const sessions = {};
const game = { moves: Array(9).fill(' '), win: false, lastPlayerId: null};

const app = express();
app.use(logReq);
app.use(injectCookies);
app.use(express.urlencoded({ extended: true }));
app.get('/login', serveLoginPage(sessions));
app.post('/login', addCookie(sessions));
app.use(attachSession(sessions));
app.use('/', directToPage);
app.use(checkCredentials(sessions));
app.use(placePlayers(players));

app.get('/game-moves', gameMoves(players, game));
app.post('/mark', markMove(players, game));
app.use(express.static('public'));

app.listen(80, () => console.log('started listening on 80'));
