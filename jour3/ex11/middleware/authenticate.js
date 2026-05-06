const jwt = require("jsonwebtoken")


function authenticateUser(req, res, next) { 
  const token = req.headers.authorization;

  if(!token)
    return res.status(401).json({message : "non autorisé"});

  next();

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err){
      return res.sendStatus(403);
    }
    res.user = user;

    next();
  })
}

module.exports = authenticateUser;