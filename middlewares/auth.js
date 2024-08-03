import { verifyToken } from "./jwt.middleware.js";

function checkAuthentication(cookieName) {
  return function auth(req, res, next) {
    console.log("auth function");
    const tokenValue = req.cookies[cookieName];
    // const tokenValue = req.cookies.token;
    console.log(tokenValue);
    if (!tokenValue) {
      console.log("no token value");
      return next();
    }

    try {
      const payloadData = verifyToken(tokenValue);
      req.user = payloadData;
      return next();
    } catch (error) {
      console.log(error);
      next();
    }
    // next();
  };
}

export default checkAuthentication;
