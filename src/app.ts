import apm from './services/apm.service';
import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  logger: true,
};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {

  if (apm.isStarted()) {
    console.info("APM started");
    fastify.setErrorHandler((error, request, reply) => {
      // seu código para lidar com erros
      apm.captureError(error);
      reply.send(error);
    });
    fastify.setNotFoundHandler((request, reply) => {
      // seu código para lidar com erros 404
      apm.captureError('Route not found');
      reply.code(404).send({ error: 'Not Found' });
    });
  } else {
    console.info("APM not started");
  }

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app, options };
