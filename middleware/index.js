const express = require('express');
const auth = require('./auth.js');
 
 
const app = express();
 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
 
 
const middleware = (req, res, next) => { //utile per autenticazione ad una pagina per ricevere token
    console.log("ciao dal middleware");
    next() //prossima operazione
}

app.use('/about', middleware)

app.get('/', middleware , (req,res) => {
    res.send("HOMEPAGE");
})

app.get('/about', (req,res) => {
    res.send("ABOUT PAGE");
})

app.get('/profile', auth, (req, res) => { //solitamente implementati non nel index auth middleware autenticazione
    res.send("PROFILE PAGE");
})
 
 
 