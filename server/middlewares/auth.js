var jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const accessToken = req.headers["access-token"];

  if (accessToken) {
    const decoded = jwt.verify(accessToken, "secret");
    if (decoded) {
      req.body.auth = {
        userId: decoded.user_id,
        email: decoded.email,
      };

      next();
    } else {
      res.status(401).send({
        error: "Access token is expired",
      });
    }
  } else {
    res.status(401).send({
      error: "You don't have access to this api",
    });
  }
}

module.exports = auth;
