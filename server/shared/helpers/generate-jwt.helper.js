import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateJWT = (uid = '') => {
  const secretKey = process.env.TOKEN_KEY || 'default_secret_key_workshop';

  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: '4h', // Un poco más que Water para este workshop
      },
      (err, token) => {
        if (err) {
          console.error('Error al generar JWT:', err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      },
    );
  });
};
