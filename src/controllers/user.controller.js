const { FastifyRequest, FastifyReply } = require('fastify');
const { User } = require('../models/user.model');
const { connectDb, disconnectDb } = require('../services/database/common.database');

/**
 * @typedef CreateUserRequestBody
 * @property {string} thumbnail_url - Thumbnail URL
 * @property {string} name - User name
 * @property {string} description - User description
 * @property {string} email - User email
 * @property {string} idp_uuid - IDP UUID
 * @property {string} phone - User phone
 */

/**
 * Controller for creating a new user.
 *
 * @param {FastifyRequest<{ Body: CreateUserRequestBody }>} request - The Fastify request object
 * @param {FastifyReply} reply - The Fastify reply object
 * @returns {Promise<void>}
 */
async function createUser(request, reply) {
  try {
    if (!request.user) {
      reply.code(400).send({ error: 'User not authenticated' });
      return;
    }
    const userData = {
      resource_data: {
        idp_uuid: request.user.uid || 'undefined',
        email: request.user.email || 'undefined',
        phone: request.user.phoneNumber || 'undefined',
        account_status: 'active',
      },
      name: request.user.displayName || 'Meu Nome',
      description: request.body.description || 'Mais sobre mim',
      thumbnail_url: request.user.photoURL || 'undefined',
      kind: 'orgresources:user',
    };
    await connectDb();
    const newUser = new User(userData);
    await newUser.save();
    request.admin.auth().setCustomUserClaims(request.user.uid, {
      appuid: newUser.id,
    });
    reply.code(201).send(newUser);
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

/**
 * Controller for listing users.
 *
 * @param {FastifyRequest} request - The Fastify request object
 * @param {FastifyReply} reply - The Fastify reply object
 * @returns {Promise<void>}
 */
async function listUsers(request, reply) {
  try {
    await connectDb();
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

module.exports = {
  createUser,
  listUsers
};
