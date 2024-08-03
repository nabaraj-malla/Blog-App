const auth = (req, res, next) => {
  if (req.session.userEmail) {
    next();
  } else {
    return res.redirect("/user/signin");
  }
};

export default auth;
