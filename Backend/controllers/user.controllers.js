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
            else {
                  res.status(200).json({
                    userId: data.userId,
                    userName: data.name,
                    userFirstname: data.firstname,
                    token: jwt.sign(
                      { userId: data.userId },
                      process.env.DB_TOK,
                      { expiresIn: '24h' }
                    )
                  });}
          });
      })
      .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
  User.findOne(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Le user avec l'email ${req.body.email} n'a pas été trouvé.`
        });
      } else {
        res.status(500).send({
          message: "Erreur de récupération du user avec l'email " + req.body.email
        });
      }
    } else {
      bcrypt.compare(req.body.password, data.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } else {
            res.status(200).json({
            userId: data.id,
            userName: data.name,
            userFirstname: data.firstname,
            token: jwt.sign(
              { userId: data.id },
              process.env.DB_TOK,
              { expiresIn: '24h' }
            )
          });
          }
        }).catch(error => res.status(500).json({ error }))
  } 
  });
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
exports.update = (req, res, next) => {
  // Validate Request
  if (!req.body) {
      res.status(400).send({
        message: "Le champ ne peut pas être vide !"
      });
    }

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const utilisateur = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        firstname: req.body.firstname,
        job: req.body.job,
        admin: req.body.admin
      });
  
    User.updateById(req.params.userId, utilisateur, (err, data) => {
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
        } else res.send(data);
      }
      )
    })
    .catch(error => res.status(500).json({ error }));
};

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
            err.message || "Une erreur est survenue lors de la suppression de tous les Users."
        });
      else res.send({ message: `Les Users ont été supprimés !` });
    });
};



