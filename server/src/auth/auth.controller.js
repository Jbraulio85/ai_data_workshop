
import { registerUser, loginUser } from './auth.service.js';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'El username o email ya están registrados',
        errors: error.errors?.map((e) => e.message),
      });
    }
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación en los datos',
        errors: error.errors?.map((e) => e.message),
      });
    }
    if (error.message && error.message.includes('Faltan campos obligatorios')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Error en login:', error);
    if (error.message && error.message.includes('Credenciales inválidas')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

