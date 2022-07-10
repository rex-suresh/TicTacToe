const { server, showReq, fileHandler, notFoundHandler } =
  require('server-http');

const handlers = [showReq, notFoundHandler];
server(80, handlers);
