const fp = require('fastify-plugin');
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCustomToken } = require('firebase/auth');

module.exports = fp(async fastify => {
  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN)),
  });

  if (process.env.NODE_ENV === 'development') {
    await generateTokenForTesting();
  }

  // Fastify middleware to check JWT token
  fastify.decorate('checkAuth', async (request, reply) => {
    console.log('handler called');

    const { authorization } = request.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken;
      request.admin = admin;
    } catch (error) {
      console.error(error);
      reply.status(401).send({ error: error || 'Unauthorized' });
    }
  });
});

async function generateTokenForTesting() {
  // Replace "yourUID" with the UID of the user for whom you are generating a token
  const customToken = await admin
    .auth()
    .createCustomToken('calJYUKMpCQMhN1l89aidFovjNh2');

  // Initialize Firebase
  const app = initializeApp(JSON.parse(process.env.FIREBASE_CLIENT));
  const auth = getAuth(app);

  const userCredentials = await signInWithCustomToken(auth, customToken);
  console.log(userCredentials);
  return userCredentials;
}
