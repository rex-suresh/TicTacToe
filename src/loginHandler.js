const fs = require('fs');

const addSession = (sessions) => (req, res) => {
  const username = req.bodyParams.get('name');
  const time = new Date();
  const sessionId = time.getTime();
  sessions[sessionId] = {
    username,
    time: time.toLocaleDateString(),
    sessionId
  };
  
  const script = `setTimeout(() => window.location = '/', 1000)`;
  const message = `${username} is logged in !!!`;
  
  res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  res.setHeader('content-type', 'text/html');
  res.end(`<script>${script}</script><div>${message}</div>`);
  return;
};

// const entryDenied = (req, res) => {
//   res.statusCode = 401;
//   res.end('Entry Denied!!!');
//   return;
// };

const serveLoginPage = (req, res) => {
  const page = fs.readFileSync('public/registerPage.html');

  res.setHeader('Content-type', 'text/html');
  res.end(page);
  return;
};

const attachSession = (sessions) => (req, res, next) => {
  const session = sessions[req.cookies.sessionId];
  if (session) {
    req.session = session;
    next();
    return;
  }

  res.statusCode = 302;
  res.setHeader('Location', '/login');
  res.end();
};

const loginHandler = (sessions) => (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  
  if (req.url.pathname === '/login') { 
    if (req.method === 'POST') {
      addSession(sessions)(req, res);
      return;
    }
    
    if ( sessionId && sessions[sessionId]) {
      res.end('You are already registered !');
      return;
    }
    
    serveLoginPage(req, res);
    return;
  }

  if (!sessionId) {
    serveLoginPage(req, res);
    return;
  }

  attachSession(sessions)(req, res, next);
};

module.exports = { loginHandler };
