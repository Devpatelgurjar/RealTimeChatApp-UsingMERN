// docs/swaggerOptions.js

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0', // ✅ Valid version
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Local Server',
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
  apis: ['./src/routes/**/*.js',
    '../../../.github/workflows/push.yaml' ]
, // Your route files with JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(options); // ✅ FIX: generate the spec here
