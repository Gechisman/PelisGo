import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

dotenv.config()

conectarDB();

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});