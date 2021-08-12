const urlArticles = 'http://localhost:3000/article/';
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlArticles + searchParam;
console.log(urlApiId);
const articleContainer = document.getElementById("Article");

//Création template pour chaque produit grâce à une boucle
function templateArticle(data){
    let articleElement = '';
    articleElement += `<div class="card col-12 col-md-5 col-lg-3 center">
                                    <div class="card-body">
                                        <h5 class="card-title center">${data.id_user}</h5>
                                        <h5 class="card-title center">${data.titre}</h5>
                                        
                                        <p class="card-text">${data.contenu}</p>
                                        <a href="./article-modif.html?id=${data.id}" class="col-10 offset-1 btn btn-dark"><span>Modifier</span></a>
                                    </div>
                                </div>`;
    articleContainer.innerHTML += articleElement;
    /* <img src="${article.imageUrl}" class="image-accueil card-img-top" alt="${article.name}"> */
};

//Get Function with Fetch
fetch(urlApiId, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  })
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        templateArticle(data)
        })
    )
    .catch((err) => console.log('Erreur : ' + err));
