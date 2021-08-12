//Mise en place des constantes
const urlComments = 'http://localhost:3000/comment/';
const searchArticleParam = new URLSearchParams(window.location.search).get("id");

const urlApiIdComsArticle = urlComments + searchArticleParam + '/comment';
console.log(urlApiIdComsArticle);

const commentsContainer = document.getElementById("comments-container");

//Création template pour chaque produit grâce à une boucle
function templateComments(data){
    let commentElement = '';
    for (let comment of data){
            commentElement += `<div class="card col-12 col-md-5 col-lg-3 center">
                                    <div class="card-body">
                                        <p class="card-text">${comment.commentaire}</p>
                                    </div>
                                </div>`;
      }   
    commentsContainer.innerHTML += commentElement;


    /*  <h5 class="card-title center">${donnee.id_user}</h5> */
    /* <img src="${article.imageUrl}" class="image-accueil card-img-top" alt="${article.name}"> */
};

//Get Function with Fetch
fetch(urlApiIdComsArticle, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  })
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        /* for (const [key, value] of Object.entries(data)){
           console.log(`${key}: ${value}`); */
           console.log('test');
            templateComments(data);
            
 /*        }  */

        })
    )
    .catch((err) => console.log('Erreur : ' + err));
