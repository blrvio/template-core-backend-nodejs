const packageInfo = require('../../package.json');
import apm from 'elastic-apm-node';

if (process.env.APM_ENABLED) {
  apm.start({
    serviceName: packageInfo.name,
    secretToken: process.env.APM_TOKEN || '77iy7PN7DklYu9uPO3e739p2',
    serverUrl:
      process.env.APM_URL || 'https://apm-server-apm-http.logging.svc:8200',
    environment: process.env.NODE_ENV || 'development',
    verifyServerCert: false,
  });
}