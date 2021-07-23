//Mise en place des constantes
const urlComments = 'http://localhost:3000/comment/';
const searchArticleParam = new URLSearchParams(window.location.search).get("id");
const urlApiIdComsArticle = urlComments + searchArticleParam;
console.log(urlApiIdComsArticle);

const commentsContainer = document.getElementById("comments-container");

//Création template pour chaque produit grâce à une boucle
function templateComments(data){
    let commentElement = '';
    for (let comment of data){
            commentElement += `<div class="card col-12 col-md-5 col-lg-3 center">
                                    <div class="card-body">
                                        <h5 class="card-title center">${comment.id_user}</h5>
                                        <p class="card-text">${comment.commentaire}</p>
                                    </div>
                                </div>`;
    }
    commentsContainer.innerHTML += commentElement;
    /* <img src="${article.imageUrl}" class="image-accueil card-img-top" alt="${article.name}"> */
};

//Get Function with Fetch
fetch(urlApiIdComsArticle)
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        templateComments(data)
        })
    )
    .catch((err) => console.log('Erreur : ' + err));
