import { User } from '../models/users.js';

// Middleware para verificar si el correo electrónico ya existe (actualización)
const checkEmailUpdate = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailSub = req.user.email;

    // Buscar si ya existe el correo electrónico
    const user = await User.findOne({ where: { email } });

    // Si no existe el usuario, pasamos al siguiente middleware
    if (!user) {
      console.log(`Email not found: ${emailSub}`);
      return next();
    }

    // Si el correo es el mismo que el del usuario actual, pasamos al siguiente middleware
    if (user.email === emailSub) {
      console.log(`User email matches: ${user.email}`);
      return next();
    }

    // Si el correo existe y no es el del usuario actual, respondemos con error
    console.log(`Email already in use: ${user.email}`);
    return res.status(400).json({
      message: 'User with this email already exists.',
    });
  } catch (err) {
    console.error('Error checking email during update:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Middleware para verificar si el correo electrónico ya existe (registro)
const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Buscar si ya existe el correo electrónico
    const user = await User.findOne({ where: { email } });

    // Si no existe el usuario, pasamos al siguiente middleware
    if (!user) {
      console.log('Email not found, proceeding...');
      return next();
    }

    // Si el correo existe, respondemos con error
    console.log(`Email already in use: ${user.email}`);
    return res.status(400).json({
      message: 'User with this email already exists.',
    });
  } catch (err) {
    console.error('Error checking email during registration:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export { checkEmailUpdate, checkEmail };
