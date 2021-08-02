const validation3 = document.getElementById("validateComment");


const idArticle = new URLSearchParams(window.location.search).get("id");

console.log(idArticle);


validation3.addEventListener('click', (e)=>{
        e.preventDefault;
        sendComment();
    });

function sendComment(){

    //on verifie que la checkbox est checked

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let comment = {
                id_article : idArticle,
                commentaire : document.getElementById('commentTextarea').value,
            }; 
            console.log(comment);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/comment", {
                method: 'POST',
                body: JSON.stringify(comment),
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

                    window.location.href =`./article.html?id=${idArticle}`;

                    
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
}
