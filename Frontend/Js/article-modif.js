//Mise en place des constantes
const urlArticles = 'http://localhost:3000/article/';
const searchParam = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlArticles + searchParam;
console.log(urlApiId);

const validation = document.getElementById("validateModif");


validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendModifArticle();
    });

function sendModifArticle(){

    //on verifie que la checkbox est checked

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let articleModif = {
                titre : document.getElementById('inputTitre').value,
                contenu : document.getElementById('textarea').value
            }; 
            console.log(articleModif);

        //on POST les infos reccueillies au serveur
            const envoi = fetch(urlApiId, {
                method: 'PUT',
                body: JSON.stringify(articleModif),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                    console.log(response);
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    console.log(confirmation);


                    window.location.href ="./accueil.html";

                    
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
}
