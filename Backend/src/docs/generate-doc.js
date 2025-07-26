// Backend/src/doc/generate-docs.js
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger options
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
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
  apis: [path.join(__dirname, '../../routes/**/*.js')], // Update this path
};

// Generate spec
const swaggerSpec = swaggerJSDoc(options);

// Write to openapi.yaml in root
fs.writeFileSync(
  path.join(__dirname, '../../../openapi.yaml'),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log('✅ openapi.yaml generated successfully');
