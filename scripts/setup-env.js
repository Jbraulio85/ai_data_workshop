import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const examplePath = path.join(rootDir, '.env.example');
const envPath = path.join(rootDir, '.env');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const setupEnv = () => {
  if (fs.existsSync(envPath)) {
    console.log('El archivo .env ya existe. Saltando generación automática.');
    return;
  }

  if (!fs.existsSync(examplePath)) {
    console.error('Error: .env.example no encontrado.');
    process.exit(1);
  }

  // Leer ejemplo
  let content = fs.readFileSync(examplePath, 'utf8');

  // Generar tokenKey
  const secret = generateSecret();
  console.log('Generando TOKEN_KEY seguro...');
  content = content.replace(/TOKEN_KEY=.*/, `TOKEN_KEY=${secret}`);

  // Insertar GROQ_API_KEY específico (educativo)
  const groqKey = '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';
  content = content.replace(/GROQ_API_KEY=.*/, `GROQ_API_KEY=${groqKey}`);

  // Escribir .env
  fs.writeFileSync(envPath, content);
  console.log(
    'Archivo .env creado exitosamente con un TOKEN_KEY aleatorio y GROQ_API_KEY educativo.',
  );
};

const createSymlinks = () => {
  const targets = [
    path.join(rootDir, 'server', '.env'),
    path.join(rootDir, 'client', '.env'),
  ];

  targets.forEach((target) => {
    try {
      if (fs.existsSync(target)) {
        fs.unlinkSync(target);
      }
      fs.symlinkSync(path.join('..', '.env'), target);
      console.log(`Symlink creado para: ${target}`);
    } catch (error) {
      console.error(`Error al crear symlink para ${target}:`, error.message);
    }
  });
};

setupEnv();
createSymlinks();
