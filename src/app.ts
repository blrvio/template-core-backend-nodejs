import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
const packageInfo = require('../package.json');
import apm from 'elastic-apm-node';

apm.start({
  serviceName: packageInfo.name,
  secretToken: process.env.APM_TOKEN || '77iy7PN7DklYu9uPO3e739p2',
  serverUrl: process.env.APM_URL || 'https://apm-server-apm-http.logging.svc:8200',
  environment: process.env.NODE_ENV || 'development',
  verifyServerCert: false,
});


export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app, options }
