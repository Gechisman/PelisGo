import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cors from 'cors';

dotenv.config() //.env file
const app = express(); // Express app

const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests



app.use(cors());

// Middleware to serve static files from the 'public' directory
app.use('/public', express.static('public'));


//Agrega todas las rutas que vamos definiendo en la carpeta rutas. .use abarca todas estas(put, delete, get, set...)
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});