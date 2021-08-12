const validation = document.getElementById("validateArticle");
const userName = sessionStorage.getItem("userName");
const userFirstname = sessionStorage.getItem("userFirstname");
const user_Id = sessionStorage.getItem("userId");
console.log(sessionStorage);
 const confirmationUser = JSON.parse(sessionStorage.getItem("confirm"));
console.log(confirmationUser);
const id_user = confirmationUser.userId;
console.log(id_user); 

validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendArticle();
    });

function sendArticle(){

    //on verifie que la checkbox est checked

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let article = {
                titre: document.getElementById('inputTitre').value,
                contenu: document.getElementById('textarea').value,
                user_name: userName,
                user_firstname: userFirstname,
                id_user: id_user
            }; 
            console.log(article);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/article", {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
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
