    //localhost:300/profile?user=luca può accedere solo se si chima luca
 
    const auth = (req, res, next) => {
        const {user} = req.query
        console.log(user);
        const oraCorrente = new Date().getHours(); // ottieni l'ora attuale
     
        if (oraCorrente >= 10 && oraCorrente < 11) {
             res.send("ACCESSO NEGATO: Il servizio non è disponibile tra le 10 e le 12");
        } else {
            res.send("accesso consentito")
        }
     
     
     
        // if (user === "luca"){
        //     next()
        // }
        // else {
        //     res.send("ACCESSO NEGATO ")
        // }
       
     
            // next()  // dopo essere enrtsto nella rotta fai questo
        }
     
     
     
        module.exports = auth
     
        //crea middleware che blocchi accessi che vengo effettuati accessi tra 10 e 12