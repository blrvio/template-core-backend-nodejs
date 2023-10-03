/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { FastifyRequest, FastifyReply } from 'fastify';

export default fp(async fastify => {
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

  await fastify.register(swaggerUI, {
    routePrefix: '/apidocs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
      supportedSubmitMethods: ['get', 'put', 'post', 'delete'],
    },
    uiHooks: {
      onRequest(request: FastifyRequest, reply: FastifyReply, next: Function) {
        next();
      },
      preHandler(request: FastifyRequest, reply: FastifyReply, next: Function) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: string) => header,
    transformSpecification: (swaggerObject: any, request: FastifyRequest) => {
      swaggerObject.host = request.hostname; // Ajusta o hostname dinamicamente
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});
