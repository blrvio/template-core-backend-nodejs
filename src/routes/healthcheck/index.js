const { FastifyPluginAsync } = require('fastify');

const healthCheck = async (fastify) => {
  fastify.get('/', async function (_request, reply) {
    try {
      // Simula uma verificação de saúde, substitua pelo seu próprio código
      const isDatabaseHealthy = true; // substitua por uma verificação real do banco de dados
      const isExternalApiHealthy = true; // substitua por uma verificação real da API externa

      if (isDatabaseHealthy && isExternalApiHealthy) {
        reply.status(200).send({ status: 'ok' });
      } else {
        reply
          .status(500)
          .send({
            status: 'error',
            details: 'database or external API is down',
          });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Health check failed:', error);
      reply.status(500).send({ status: 'error', details: error });
    }
  });
};

module.exports = healthCheck;
