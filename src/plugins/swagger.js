// Disabling ESLint rules can be done at the top of the file
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

// Importing necessary modules
const fp = require('fastify-plugin');
const swagger = require('@fastify/swagger');
const swaggerUI = require('@fastify/swagger-ui');

// Exporting the plugin as a default export
module.exports = fp(async fastify => {
  // Registering the swagger plugin with fastify
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Skinhealth API',
        description: 'API documentation for the App',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        bearerToken: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Please enter JWT with Bearer prefix into field',
        },
      },
      security: [
        {
          bearerToken: [],
        },
      ],
    },
  });

  // Registering the swagger UI plugin with fastify
  await fastify.register(swaggerUI, {
    routePrefix: '/apidocs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
      supportedSubmitMethods: ['get', 'put', 'post', 'delete'],
    },
    uiHooks: {
      onRequest(request, reply, next) {
        next();
      },
      preHandler(request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    transformSpecification: (swaggerObject, request) => {
      swaggerObject.host = request.hostname; // Adjusts the hostname dynamically
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});
