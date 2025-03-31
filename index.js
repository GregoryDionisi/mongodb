const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const {MongoClient} = require(`mongodb`);
require('dotenv').config();
 
const app = express();
app.use(cors());
app.use(bodyParser.json())

const connectToDatabase = async () => {
    try{
        const client = await MongoClient.connect(process.env.MONGO_URI) //process del file appena creato e la variabile a cui hai associato il link
        console.log('Connected to database');
        return client.db('mongodb'); //"mongodb" nome del nostro database
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

let database

const startServer = async () => {
    database = await connectToDatabase();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`) //col pc del lab non funziona, ma a casa sì
    })
}

startServer();


// get all data
app.get('/utenti', async () => { //"users" è il nome della collezione del db
    if (!database){
        return res.status(500).json({message: 'Database is not connected'});
    }
    try{
        const result = await database.collection('users').find({}).toArray();
        res.json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error get users'});
    }
})


// post utente
app.post('/utente', async(req, res) => {
    if (!database){
        return res.status(500).json({message: 'Database is not connected'});
    }
    try{
        const {id, nome, cognome, username, email, password} = req.body //spacchettare nei vari campi
        const result = await database.collection('users').insertOne({
            id,
            nome,
            cognome,
            username, 
            email,
            password
        })
        res.status(201).json({message: 'Utente creato'}); //201 richiesta accettata per aver inserito una nuova risorsa
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error creating utente'});
    }
})



// delete utente
app.post('/utente/:username', async(req, res) => {
    if (!database){
        return res.status(500).json({message: 'Database is not connected'});
    }
    try{
        const {id, nome, cognome, username, email, password} = req.body //spacchettare nei vari campi
        const result = await database.collection('users').insertOne({
            id,
            nome,
            cognome,
            username, 
            email,
            password
        })
        res.status(201).json({message: 'Utente creato'}); //201 richiesta accettata per aver inserito una nuova risorsa
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error creating utente'});
    }
})

// indirizzo: http://localhost:3000/utenti