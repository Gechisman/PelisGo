import mongoose from 'mongoose'


const conectarDB = async () => {
    try {
        const conexionDB = await mongoose.connect('mongodb+srv://Gechisman:Tossaybrieta2@cluster0.uqilu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        const url = `${conexionDB.connection.host}:${conexionDB.connection.port}`
        console.log(`MongoDB connected: ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default conectarDB