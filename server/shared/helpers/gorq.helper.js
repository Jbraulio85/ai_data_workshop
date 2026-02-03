import axios from 'axios';

// Utilidad pura para llamar a la API de Groq y obtener SQL
export const callGroq = async (question, schema) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY no configurada');

  const prompt = [
    'Dada la siguiente estructura de base de datos:',
    schema,
    '',
    'INSTRUCCIONES: Genera ÚNICAMENTE una consulta SQL válida para responder:',
    `"${question}"`,
    '',
    'Responde SOLO con la consulta SQL.',
    'Ejemplos:',
    '- "¿Primer usuario registrado?": SELECT name FROM users ORDER BY created_at ASC LIMIT 1;',
    '- "¿Cuántos usuarios?": SELECT COUNT(*) AS count FROM users;',
    '- "¿Usuarios por role?": SELECT r.name AS role, COUNT(*) AS count FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id GROUP BY r.name;',
    '- "¿Muestra todos los usuarios?": SELECT name, surname, email FROM users LIMIT 10;',
    '- "¿Cuál es el promedio de edad por role?": SELECT r.name AS role, AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, u.date_of_birth))) AS avg_age FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id GROUP BY r.name;',
    '- "admin más viejo": SELECT u.name FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE r.name = \'ADMIN_ROLE\' ORDER BY u.date_of_birth ASC LIMIT 1;',
    '- "Usuarios con nombre María": SELECT name, surname, email FROM users WHERE LOWER(name) LIKE LOWER(\'%María%\');',
    'Nota: "Primer usuario registrado" se refiere al usuario con created_at más antiguo en users.',
    'Reglas: Usa LIKE LOWER para búsquedas de texto. Selecciona solo campos relevantes (name, surname, email, phone).',
    '',
    `Pregunta: ${question}`,
  ].join('\n');

  try {
    console.log('Calling Groq API with prompt:', prompt);
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const sql = response.data.choices[0].message.content.trim();
    console.log('Groq response:', sql);

    // Limpiar respuesta de markdown y explicaciones
    let cleanSql = sql.trim();

    // Remover bloques de código markdown
    if (cleanSql.includes('```')) {
      const sqlMatch = cleanSql.match(/```(?:sql)?\s*([\s\S]*?)\s*```/);
      if (sqlMatch) {
        cleanSql = sqlMatch[1].trim();
      }
    }

    // Si aún contiene texto explicativo, intentar extraer solo la primera línea que parezca SQL
    const hasNewlines = cleanSql.includes('\n');
    const startsWithSqlKeyword = cleanSql
      .toUpperCase()
      .trim()
      .match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/);

    if (hasNewlines && !startsWithSqlKeyword) {
      const lines = cleanSql
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      // Buscar la primera línea que empiece con una palabra clave SQL
      for (const line of lines) {
        if (
          line
            .toUpperCase()
            .match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/)
        ) {
          cleanSql = line;
          break;
        }
      }
    }

    // Asegurar que termine con punto y coma
    if (!cleanSql.endsWith(';')) {
      cleanSql += ';';
    }

    console.log('Clean SQL:', cleanSql);
    return cleanSql;
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    throw new Error(`Error al llamar a Groq: ${error.message}`);
  }
};
