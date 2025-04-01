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
app.get('/utenti', async (req, res) => { //"users" è il nome della collezione del db
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
        const usernameDaEliminare = req.params.username;
        const result = await database.collection('users').deleteOne(
            {username: usernameDaEliminare}
        )
        if (result.deletedCount === 0){ //deletedCount è il numero di oggetti eliminati
            return res.status(404).json({message: 'Utente non trovato'}); //per verificare se l'utente che si vuole eliminare esiste veramente
        }
        res.status(200).json({message: 'Utente eliminato'});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error deleting utente'});
    }
})


// update utente
app.put('/utente/:username', async(req, res) => {
    if (!database){
        return res.status(500).json({message: 'Database is not connected'});
    }
    try{
        const usernameDaModificare = req.params.username;
        const updateData = req.body;
        const result = await database.collection('users').updateOne(
            {username: usernameDaModificare},
            {$set: updateData} //$set aggiorna solo i campi specifici. Update data contiene il corpo della richiesta
        )
        if (result.matchedCount === 0){ //matchedCount è il numero di modifiche
            return res.status(404).json({message: 'Utente non trovato'}); //per verificare se l'utente che si vuole modificare esiste veramente
        }
        res.status(200).json({message: 'Utente modificato'})
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error updating utente'});
    }
})


// get utente by id
app.get('/utente/:username', async(req, res) => {
    if (!database){
        return res.status(500).json({message: 'Database is not connected'});
    }
    try{
        const usernameDaVisualizzare = req.params.username;
        const result = await database.collection('users').findOne(
            {username: usernameDaVisualizzare}
        ) 
        if (!result){
            return res.status(404).json({message: 'Utente non trovato'}); //per verificare se l'utente che si vuole modificare esiste veramente
        }
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error getting utente'});
    }
})


// get query string
/* app.get('/utenti/search', async(req, res) => {
    if (!database){
        return res.status(500).json({message: 'Database is not connected'});
    }
    try{
        const {nome, cognome} = req.query;
        console.log(nome, cognome);
        const result = await database.collection('users').find({
                nome: nome,
                cognome: cognome
            }).toArray 
        if (!result){
            return res.status(404).json({message: 'Utente non trovato'}); //per verificare se l'utente che si vuole modificare esiste veramente
        }
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error getting utente'});
    }
})
 */
// indirizzo: http://localhost:3000/utenti