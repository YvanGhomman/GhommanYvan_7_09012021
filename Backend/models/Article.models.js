const sql = require("./db.js");


// constructor
const Article = function(client) {
    this.titre = client.titre;
    this.contenu = client.contenu;
    this.user_name = client.user_name;
    this.user_firstname = client.user_firstname;
    this.id_user = client.id_user;
};


Article.create = (newArticle, result) => {
    sql.query("INSERT INTO article SET ?", newArticle, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created article: ", { id: res.insertId, ...newArticle });
      result(null, { id: res.insertId, ...newArticle });
    });
  };

  Article.getAll = result => {
    sql.query("SELECT * FROM article", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("articles: ", res);
      result(null, res);
    });
  };

  Article.findById = (articleId, result) => {
    sql.query(`SELECT * FROM article WHERE id = ${articleId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found article: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found article with the id
      result({ kind: "not_found" }, null);
    });
  };


  Article.updateById = (id, article, result) => {
    sql.query(
      "UPDATE article SET titre = ?, contenu = ? WHERE id = ?",
      [article.titre, article.contenu, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated article: ", { id: id, ...article });
        result(null, { id: id, ...article });
      })};


      Article.remove = (id, result) => {
    sql.query("DELETE FROM article WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted article with id: ", id);
      result(null, res);
    });
  };

  Article.removeAll = result => {
    sql.query("DELETE FROM article", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} articles`);
      result(null, res);
    });
  };


module.exports = Article;