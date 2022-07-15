const addCookie = (sessions) => (req, res) => {
  const username = req.body.name;
  const time = new Date();
  const sessionId = time.getTime();

  sessions[sessionId] = {
    username,
    time: time.toLocaleDateString(),
    sessionId
  };

  const script = '<script>setTimeout(() => window.location = `/`, 1000)</script>';
  const message = `<div>${username} is logged in !!!<div>`
  
  res.cookie('sessionId', `${sessionId}`);
  res.append('content-type', 'text/html');
  res.send(`${script}${message}`);
};


const serveLoginPage = (sessions) => (req, res) => {
  const sessionId = req.cookies?.sessionId;
  
  if (!sessionId || !sessions[sessionId]) {
    res.sendFile('/registerPage.html', {root: process.cwd().concat('/public')});
    return;
  }

  res.send('You are already logged in !');
};

const attachSession = (sessions) => (req, res, next) => {
  const session = sessions[req.cookies?.sessionId];
  if (session) {
    req.session = session;
    next();
    return;
  }
  next();
};

const checkCredentials = (sessions) => (req, res, next) => {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId || !sessions[sessionId]) {
    res.statusCode = 401;
    res.send('Entry Denied!!!');
    return;
  }

  next();
};

module.exports = {
  checkCredentials, attachSession, addCookie, serveLoginPage
};
