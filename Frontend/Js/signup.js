const validation = document.getElementById("validate");


validation.addEventListener('click', (e)=>{
        e.preventDefault;
        sendSignup();
    });

function sendSignup(){

    //on verifie que la checkbox est checked

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let contact = {
                firstname : document.getElementById('inputPrenom').value,
                name : document.getElementById('inputNom').value,
                job : document.getElementById('inputJob').value,
                password : document.getElementById('inputPassword').value,
                email : document.getElementById('inputEmail').value
            }; 
            console.log(contact);

        //on POST les infos reccueillies au serveur
            const envoi = fetch("http://localhost:3000/user/signup", {
                method: 'POST',
                body: JSON.stringify(contact),
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

                    sessionStorage.setItem("userId", confirmation.id);
                    sessionStorage.setItem("token", confirmation.token);
                    sessionStorage.setItem("userName", confirmation.userName);
                    sessionStorage.setItem("userFirstname", confirmation.userFirstname);
                    /* window.location.href ="./accueil.html"; */

                    
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
        };
}
