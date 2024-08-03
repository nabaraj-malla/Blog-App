const cookieAuth = (req, res, next) => {
  if (req.cookies.nabarajCookie) {
    next();
  } else {
    return res.redirect("/user/signin");
  }
};

export default cookieAuth;
