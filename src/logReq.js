let reqCount = 0;
const logReq = (req, res, next) => {
  console.log(req.method, req.path, ++reqCount);
  next();
};
module.exports = { logReq };
