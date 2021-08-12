//Mise en place des constantes
const urlArticles = 'http://localhost:3000/article/';
const articlesContainer = document.getElementById("articles-container");

console.log(sessionStorage);
let confirmationUser = JSON.parse(sessionStorage.getItem("confirm"));
console.log(confirmationUser);
let user_id = confirmationUser.userId;
console.log(user_id);





//Création template pour chaque produit grâce à une boucle
function templateArticles(data){
    let articleElement = '';
    for (let article of data){
            articleElement += `<div class="card col-12 col-md-5 col-lg-3 center">
                                    <div class="card-body">
                                        <h5 class="card-title center">${article.user_name} ${article.user_firstname}</h5>
                                        <h5 class="card-title center">${article.titre}</h5>    
                                        <p class="card-text">${article.contenu}</p>
                                        <a href="./article.html?id=${article.id}" class="col-10 offset-1 btn btn-dark"><span class="gradient">Voir détails</span></a>
                                    </div>
                                </div>`;
    }
    articlesContainer.innerHTML += articleElement;
    /* <img src="${article.imageUrl}" class="image-accueil card-img-top" alt="${article.name}"> */
};
 
//Get Function with Fetch
fetch(urlArticles, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  })
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        templateArticles(data)
        })
    )
    .catch((err) => console.log('Erreur : ' + err));
