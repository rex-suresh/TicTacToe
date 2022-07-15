const directToPage = (req, res, next) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }
  next()
};

module.exports = { directToPage };
