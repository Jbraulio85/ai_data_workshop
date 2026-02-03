import { getDbSchema } from '../../shared/helpers/schema.helper.js';
import { callGroq } from '../../shared/helpers/gorq.helper.js';
import { sequelize } from '../../configs/db.js';

// Servicio de lógica de negocio para procesar consultas naturales a SQL
export const processNaturalQuery = async (question) => {
  if (!question || typeof question !== 'string') {
    throw new Error('La pregunta es obligatoria y debe ser una cadena');
  }

  // Preprocesar la pregunta para mapear roles comunes
  const processedQuestion = question
    .replace(/\brole\s+user\b/gi, 'role USER_ROLE')
    .replace(/\brole\s+admin\b/gi, 'role ADMIN_ROLE')
    .replace(/\brole\s+system\b/gi, 'role SYSTEM_ROLE')
    .replace(/\brole\s+sales\b/gi, 'role SALES_ROLE')
    .replace(/\b(admin|usuario|user|system|sales)\b/gi, (match) => {
      const roleMap = {
        admin: 'ADMIN_ROLE',
        usuario: 'USER_ROLE',
        user: 'USER_ROLE',
        system: 'SYSTEM_ROLE',
        sales: 'SALES_ROLE',
      };
      return roleMap[match.toLowerCase()] || match;
    });

  // Obtener esquema de la base de datos
  const schema = await getDbSchema();

  // Llamar a Groq para obtener SQL
  const sql = await callGroq(processedQuestion, schema);
  if (!sql) throw new Error('No se pudo generar la consulta SQL');

  // Ejecutar el SQL generado
  const [result] = await sequelize.query(sql, { raw: true });

  // Filtrar resultados inválidos
  let filteredResult = result;
  if (Array.isArray(result)) {
    filteredResult = result.filter((row) => {
      // Excluir filas con date_of_birth null si la consulta incluye date_of_birth
      if (
        sql.toLowerCase().includes('date_of_birth') &&
        row.date_of_birth === null
      ) {
        return false;
      }
      return true;
    });
  }

  return { sql, result: filteredResult };
};
