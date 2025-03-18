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
        return client.db('mongodb'); //mongodb nome del nostro database
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

let database

const startServer = async () => {
    database = await connectToDatabase();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}

startServer();