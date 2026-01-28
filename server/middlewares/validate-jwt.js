import jwt from 'jsonwebtoken';
import { User } from '../src/users/user.model.js';
import { Role } from '../src/roles/role.model.js';

export const validateJWT = async (req, res, next) => {
  const token =
    req.header('x-token') ||
    req.headers['authorization']?.replace(/^Bearer\s+/, '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No hay token en la petición',
    });
  }

  try {
    const secretKey = process.env.TOKEN_KEY || 'default_secret_key_workshop';
    const { uid } = jwt.verify(token, secretKey);

    // Leer el usuario que corresponde al uid e incluir sus roles
    const user = await User.findByPk(uid, {
      include: [{ model: Role, through: { attributes: [] } }],
    });

    if (!user || !user.status) {
      return res.status(401).json({
        success: false,
        message: 'Token no válido - Usuario inexistente o inactivo',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error en validateJWT:', error);
    return res.status(401).json({
      success: false,
      message: 'Token no válido',
    });
  }
};
