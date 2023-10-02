import apm from './services/apm.service';
import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
const options: AppOptions = {
  logger: true,
};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {

  if (apm.isStarted()) {
    console.info("APM started");
    fastify.setErrorHandler((err, request, reply) => {
      apm.captureError(err);
      reply.send(err);
    });
    fastify.setNotFoundHandler((request, reply) => {
      var err = new Error('Route Not Found')
      apm.captureError(err);
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
