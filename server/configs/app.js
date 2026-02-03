'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './db.js';
import { Role } from '../src/roles/role.model.js';
import { seedData } from './seeder.js';
import authRoutes from '../src/auth/auth.routes.js';
import aiRoutes from '../src/ai/ai.routes.js';

dotenv.config();

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
};

const routes = (app) => {
  // Rutas con prefijo api/v1
  app.get('/api/v1/health', (req, res) =>
    res.json({ status: 'API is running' }),
  );
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/ai', aiRoutes);
  // Manejo de 404
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint no encontrado',
    });
  });
};

const seedRoles = async () => {
  try {
    const count = await Role.count();
    if (count === 0) {
      const roles = [
        { name: 'ADMIN_ROLE', description: 'Administrador total' },
        { name: 'USER_ROLE', description: 'Usuario estándar' },
        { name: 'SYSTEM_ROLE', description: 'Uso interno sistema' },
        { name: 'SALES_ROLE', description: 'Gestión de ventas' },
      ];
      await Role.bulkCreate(roles);
      console.log('Roles iniciales creados.');
    }
  } catch (error) {
    console.error('Error al crear los roles iniciales:', error);
  }
};

export const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  try {
    await connectDB();

    // Sincronizar modelos
    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada.');

    // Seeding de roles
    await seedRoles();
    // Seeding de datos masivos (usuarios)
    await seedData();

    middlewares(app);
    routes(app);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error(`Error al iniciar el servidor: ${err.message}`);
  }
};
