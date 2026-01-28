import argon2 from 'argon2';
import { Op } from 'sequelize';
import { User } from '../users/user.model.js';
import { Role } from '../roles/role.model.js';
import { generateJWT } from '../../shared/helpers/generate-jwt.js';


export const registerUser = async (data) => {
  const {
    name,
    surname,
    username,
    email,
    password,
    dateOfBirth,
    phone,
    roles,
  } = data;

  if (!name || !surname || !username || !email || !password) {
    throw new Error('Faltan campos obligatorios (name, surname, username, email, password)');
  }

  const hashedPassword = await argon2.hash(password);
  const user = await User.create({
    name,
    surname,
    username,
    email,
    password: hashedPassword,
    dateOfBirth,
    phone,
  });

  if (roles && roles.length > 0) {
    const rolesDB = await Role.findAll({ where: { name: roles } });
    await user.setRoles(rolesDB);
  } else {
    const defaultRole = await Role.findOne({ where: { name: 'USER_ROLE' } });
    if (defaultRole) await user.setRoles([defaultRole]);
  }

  return user;
};


export const loginUser = async ({ userLog, password }) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: userLog || '' }, { username: userLog || '' }],
    },
    include: [{ model: Role, through: { attributes: [] } }],
  });

  if (!user || !user.status) {
    throw new Error('Credenciales inválidas');
  }

  const validPassword = await argon2.verify(user.password, password);
  if (!validPassword) {
    throw new Error('Credenciales inválidas');
  }

  const token = await generateJWT(user.id);
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      roles: user.roles.map((r) => r.name),
    },
  };
};
