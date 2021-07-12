/* 
const User = {
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    job: { type: String, required: true },
    admin: { type: Boolean, required: false, default: 0 },
  }; */

const sql = require("./db.js");

const User = function(client) {
    this.email = client.email;
    this.password = client.password;
    this.name = client.name;
    this.firstname = client.firstname;
    this.job = client.job;
    this.admin = client.admin;
};

User.create = (newUtilisateur, result) => {
    sql.query("INSERT INTO user SET ?", newUtilisateur, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUtilisateur });
      result(null, { id: res.insertId, ...newUtilisateur });
    });
  };


module.exports = User;