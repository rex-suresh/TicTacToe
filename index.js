const fs = require('fs');
const { server, injectReqParts, logReq } = require('server-http');
const { createRouter, notFoundHandler, fileHandler } = require('server-http');
const { gamePageHandler } = require('./src/gamePageHandler.js');
const { injectCookies } = require('./src/injectCookies.js');
const { loginHandler } = require('./src/loginHandler.js');
const { placePlayers } = require('./src/placePlayers.js');

const players = {};
const sessions = {};

const handlers = [
  injectReqParts,
  logReq,
  injectCookies,
  loginHandler(sessions),
  placePlayers(players),
  gamePageHandler(players),
  fileHandler('public', fs),
  notFoundHandler
];

const router = createRouter(handlers);
server(80, router);
