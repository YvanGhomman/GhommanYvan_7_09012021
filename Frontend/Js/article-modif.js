//Mise en place des constantes
const urlArticles = 'http://localhost:3000/article/';
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlArticles + searchParam;
console.log(urlApiId);
const furnitureContainer = document.getElementById("ProduitFurniture");
const btn = document.querySelector(".cart");



/* //fonction pour la quantité
function compteur(){
    let q = parseInt(document.getElementById("quantite").value); //on récupère la quantité indiquée par le client
    if (q > 0) {
        return q; //si elle est positive on la retourne (elle est valide)
    }else {
        q = 1; //sinon on met 1 par défaut
        alert("La donnée indiquée est erronée ! 1 produit a été ajouté à votre panier par défaut");
    }
    return q; //on retourne la valeur
}; */


/* // fonction pour afficher les options de vernis
function choixVernis(data) {
    let choixVernis = document.getElementById("choix-vernis")
    for (let i = 0; i < data.varnish.length; i++) { //boucle pour afficher les options de vernis
      let newChoixVernis = document.createElement("option")
      newChoixVernis.innerText = data.varnish[i];
      choixVernis.append(newChoixVernis);
    }
};
 */




//fonction pour affichage du meuble
function displayFurniture(data){
    let furnitureElement = '';
        furnitureElement += `<div class="card contrecol col-12 col-sm-8 space">
            <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <p class="bold center card-text">${data.price/100}€</p>
            </div>
            <div class="card-footer text-muted">
                <form class="offset-1 col-10 offset-1 ">
                    <div class="form-group">
                        <label for="quantité">Choisissez une quantité</label>
                        <input type="number" class="form-control" id="quantite" name="quantité" min="1" value ="1" required></input>
                    </div>
                    <div class="form-group">
                        <label>Choisissez un vernis</label>
                        <select class="form-control" id="choix-vernis" required></select>
                    </div>
                </form>
            </div>`;
    furnitureContainer.innerHTML += furnitureElement;
};

// Get Function with Fetch
fetch(urlApiId)
    .then((response) =>
        response.json()
    .then((data) => {
        console.log(data);
        displayFurniture(data);
        /* choixVernis(data); */
    //Écoute du bouton ajout au panier
        btn.addEventListener("click",()=>{

        //Création variable avec infos du produit choisi
            let furnitureChoice = {
                furnitureName : data.name,
                furnitureId   : data._id,
                furnitureImage: data.imageUrl,
                furniturePrice: data.price/100,
                furnitureVarnish: document.getElementById("choix-vernis").value,
                furnitureQuantite: compteur(),
                get totalPrice (){
                    return furnitureChoice.furniturePrice * furnitureChoice.furnitureQuantite;
                }   
            };
            console.log(furnitureChoice);

            // Détection du localStorage
            if (typeof localStorage != "undefined"){

            // On recupère la valeur dans le localStorage
                let furnitureStore = JSON.parse(localStorage.getItem("furnitureInCart"));
                if (furnitureStore === null || furnitureStore === "undefined"){ //si le localStorage n'a pas de furnitureStore
                    furnitureStore = [];// on crée un tableau 
                    furnitureStore.push(furnitureChoice); //et on met le produit selectionné dedans
                }else{
                    furnitureStore.push(furnitureChoice); // si le tableau existe on push le choix du meuble dedans
                }
                
            // On redefini localStorage avec la nouvelle valeur
                localStorage.setItem("furnitureInCart", JSON.stringify(furnitureStore));
            // Alert box 
                if (window.confirm(`Vous avez ajouté ${furnitureChoice.furnitureQuantite} ${data.name} à votre panier ! Souhaitez-vous continuer vos achats ? `)){
                    window.location.href = "../index.html";
                } else {
                    window.location.href = "panier.html";
                };

            } else {
                alert("Nos excuses, une erreur est survenue :(");
            }    
        });
    })
    .catch((err) => console.log('Erreur : ' + err)));

