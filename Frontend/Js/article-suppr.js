
//Mise en place des constantes
const urlArticles2 = 'http://localhost:3000/article/';
const searchParam2 = new URLSearchParams(window.location.search).get("id");
const urlApiId2 = urlArticles2 + searchParam2;
console.log(urlApiId2);

const validation2 = document.getElementById("Supprimer");


validation2.addEventListener('click', (e)=>{
        e.preventDefault;
        if (window.confirm(`Are you sure ?`)) {
            Suppression();
            window.location.href = "./accueil.html";
        } else {
            window.location.href = "./accueil.html";
        };
        
    });

function Suppression(){

        //on POST les infos reccueillies au serveur
            const envoi = fetch(urlApiId2, {
                method: 'DELETE',
            });
        //traitement de la réponse du serveur
            envoi.then(async response =>{
                try{
                    window.location.href ="./accueil.html";
 
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };