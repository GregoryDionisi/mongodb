const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const {MongoClient} = require(`mongodb`);
require('dotenv').config();
 
const app = express();
app.use(cors());
app.use(bodyParser.json())

const connectToDatabase = async () => {
    const client = await MongoClient.connect()
}