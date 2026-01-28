import { fakerES as faker } from '@faker-js/faker';
import argon2 from 'argon2';
import { User } from '../src/users/user.model.js';
import { Role } from '../src/roles/role.model.js';

export const seedData = async () => {
  try {
    const userCount = await User.count();

    // Solo sembramos si la tabla de usuarios está vacía
    if (userCount > 0) {
      console.log(
        'La tabla de usuarios ya tiene datos. Saltando seeding de usuarios.',
      );
      return;
    }

    console.log('Iniciando seeding de 200 usuarios...');

    // Obtenemos los roles disponibles
    const roles = await Role.findAll();
    if (roles.length === 0) {
      console.error(
        'No se encontraron roles en la base de datos. Ejecuta primero el seeding de roles.',
      );
      return;
    }

    // Hasheamos una contraseña genérica una sola vez para optimizar el proceso
    const hashedDevPassword = await argon2.hash('password123');

    const usersToCreate = [];

    for (let i = 0; i < 200; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      // Aseguramos que el username no exceda los 30 caracteres
      const baseUsername = faker.internet
        .username({ firstName, lastName })
        .toLowerCase()
        .substring(0, 25);
      const username = `${baseUsername}${faker.number.int(999)}`;

      usersToCreate.push({
        name: firstName.substring(0, 50),
        surname: lastName.substring(0, 50),
        username: username.substring(0, 30),
        email: faker.internet
          .email({ firstName, lastName })
          .toLowerCase()
          .substring(0, 100),
        password: hashedDevPassword,
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        phone: faker.phone.number().substring(0, 20),
        // Status: 80% probabilidad de ser true
        status: Math.random() < 0.8,
      });
    }

    // Creamos los usuarios en bloque
    const createdUsers = await User.bulkCreate(usersToCreate, {
      validate: true,
    });

    // Asignamos roles aleatorios
    for (const user of createdUsers) {
      // Seleccionamos entre 1 y 2 roles aleatorios
      const numRoles = Math.random() > 0.85 ? 2 : 1;
      const shuffledRoles = [...roles].sort(() => 0.5 - Math.random());
      const selectedRoles = shuffledRoles.slice(0, numRoles);

      await user.setRoles(selectedRoles);
    }

    console.log('Seeding de 100 usuarios completada exitosamente.');
  } catch (error) {
    console.error('Error durante el seeding de datos:');
    if (error.errors) {
      error.errors.forEach((err) =>
        console.error(`- ${err.message} (${err.path})`),
      );
    } else {
      console.error(error);
    }
  }
};
