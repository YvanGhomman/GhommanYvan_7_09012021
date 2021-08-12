const jwt = require('jsonwebtoken');
require('dotenv').config();


 module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    console.log(userId);
    if ( req.body.id_user && req.body.id_user !== userId) {
      throw 'User ID non valable !';
    } else {
      console.log("test");
      console.log(req.body.id_user);
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Requête non authentifiée !'});
  }
}; 