import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT_INTERNAL || 5432,
    dialect: 'postgres',
    logging: false, // Puedes activarlo para depuración
    define: {
      timestamps: true, // updatedAt y createdAt por defecto
      underscored: true, // Usa snake_case en la BD (opcional, pero recomendado en Postgres)
    },
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
    process.exit(1);
  }
};
