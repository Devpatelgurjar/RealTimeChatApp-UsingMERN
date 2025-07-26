// Backend/src/docs/generate-doc.js
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct path to your route files (Update this to your actual route location)
const routesPath = path.join(__dirname, '../routes/**/*.js');  // If routes are in src/routes

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Real-Time Chat API',
      version: '1.0.0',
      description: 'This is the API documentation for your Real-Time Chat App.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [routesPath], // ✅ Fixed path
};

const swaggerSpec = swaggerJSDoc(options);
const yamlStr = yaml.stringify(swaggerSpec);

// ✅ Save to correct file (inside Backend folder)
fs.writeFileSync(path.join(__dirname, '../../openapi.yaml'), yamlStr, 'utf8');
console.log('✅ Swagger YAML generated at in backend (openapi.yaml)');
