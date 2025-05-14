import User from '../models/User.js';
const checkAuth = async (req, res, next) => {
    //Extraer token del header
    //Importante la s en headers
    const authToken = req.headers.authorization;
    let token;

    //Comprobar si hay token
    if (authToken && authToken.startsWith('Bearer')) {
        try {
            //Extraer token sin el Bearer
            token = authToken.split(' ')[1];
            //Toma dos parametros: token y la palabra secreta
            //decoded nos devuelve el id del usuario pq lo incluimos al generar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //veterinario me trae todo el objeto del veterinario, pero la contraseña no la quiero
            const user = await User.findById(decoded.uid)
                    .select('-password -token -confirmado');
            req.user = user;
            return next();
        } catch (error) {
            res.status(403).json({msg: 'No valid token'});
        }
    }
    
    //Si no hay token 
    //No hace rfalta return pq tengo next();
    if (!token) {
        res.status(401).json({msg: 'No token, no access'});
    }

    next();
}

export default checkAuth;