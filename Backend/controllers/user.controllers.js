const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User.models.js');
require('dotenv').config();


// Create and Save a new user
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const utilisateur = new User({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          firstname: req.body.firstname,
          job: req.body.job,
          admin: 0
        });
        
          User.create(utilisateur, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Une erreur est servenue lors de la création du User."
              });
            else res.send(data);
          });
      })
      .catch(error => res.status(500).json({ error }));
};


 
exports.login = (req, res, next) => { 
  User.findOne({ email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.DB_TOK,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Retrieve all users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est servenue lors de la récupération des Users."
        });
      else res.send(data);
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
          });
        } else {
          res.status(500).send({
            message: "Erreur de récupération du User avec l'id " + req.params.userId
          });
        }
      } else res.send(data);
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
      res.status(400).send({
        message: "Le champ ne peut pas être vide !"
      });
    }
  
    User.updateById(req.params.userId, new User(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
            });
          } else {
            res.status(500).send({
              message: "Erreur de mise à jour du User avec l'id " + req.params.userId
            });
          }
        } else 

        bcrypt.hash(data.password, 10)
        .then(hash => {
        new User({
          email: data.email,
          password: hash,
          name: data.name,
          firstname: data.firstname,
          job: data.job,
          admin: data.admin
        });
        res.send(data);
      }
      ).catch(error => res.status(500).json({ error }));
})};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Le User avec l'id ${req.params.userId} n'a pas été trouvé.`
          });
        } else {
          res.status(500).send({
            message: "Erreur de suppression du User avec l'id " + req.params.userId
          });
        }
      } else res.send({ message: `Le User a été supprimé !` });
    });
};


// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression de tout les Users."
        });
      else res.send({ message: `Les Users ont été supprimés !` });
    });
};

