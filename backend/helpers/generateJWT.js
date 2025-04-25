import jwt from 'jsonwebtoken';

const generateJWT = (uid) => {
    //Generar un nuevo token con el id del usuario
    return jwt.sign({uid}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export default generateJWT;