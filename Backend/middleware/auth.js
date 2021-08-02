const jwt = require('jsonwebtoken');
require('dotenv').config();

 module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Requête non authentifiée !'});
  }
}; 

/* 
// Exportation de la fonction d'authentification
module.exports = (req, res, next) => {
    // Récupération du token dans les paramètres
    const authHeader = req.headers.authorization;

    // Si l'utilisateur possède une autorisation,
    // on déclare le token et on le vérifie, s'il n'y a pas
    // d'erreur, on le next, sinon on renvoie un statut 403
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.DB_TOK, (err, user) => {
            if (err) {
                return res.status(403);
            }
            next();
        });
    }
    // Sinon, on renvoie le statut 401 Unauthorized
    else {
        res.status(401).json({error:"accès non authorisé"});
    }
}; */