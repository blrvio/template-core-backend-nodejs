import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

export default fp(async fastify => {
  fastify.register(helmet); // Adiciona headers de segurança
  fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
//   fastify.register(require('@fastify/auth'));
//   fastify.register(require('fastify-acl-auth'));
});
