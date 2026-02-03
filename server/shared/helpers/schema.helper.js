import { sequelize } from '../../configs/db.js';

export const getDbSchema = async () => {
  const [tables] = await sequelize.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
        `);

  let schema = '';

  for (const { table_name } of tables) {
    const [columns] = await sequelize.query(`
                SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = '${table_name}'
            `);
    schema += `Table: ${table_name} (\n`;
    for (const col of columns) {
      schema += `  ${col.column_name} ${col.data_type}, \n`;
    }
    schema += `)\n`;
  }
  return schema;
};
