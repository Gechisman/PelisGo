import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import generateJWT from '../helpers/generateJWT.js';
import generateId from '../helpers/generateId.js';

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = await User.create({ name, email, password });

        // Respond with the created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const confirmUser = async (req, res) => {
  const {token} = req.params;
  const userConfirm = await User.findOne({ where: { token } });
    if (!userConfirm) {
      return res.status(404).json({ msg: 'Token not valid' });
    }
  
  try{        
    userConfirm.token = null;
    userConfirm.confirmado = true;
    await userConfirm.save();
    res.json({ msg: 'User confirmed successfully' });

  } catch (error) {
    console.error('Error confirming user:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
        // Verificar si está confirmado
        if (!user.confirmado) {
          return res.status(401).json({ msg: 'Account not confirmed' });
        }        
    
        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ msg: 'Incorrect password' });
        } else {
            res.json({token: generarJWT(usuario.id)});
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Server error' });
      }
}

export { registerUser, authenticate, confirmUser };