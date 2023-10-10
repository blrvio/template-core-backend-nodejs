const { FastifyRequest, FastifyReply } = require('fastify');
const { User } = require('../models/user.model');
const { connectDb, disconnectDb } = require('../services/database/common.database');

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
// Controller para ler dados sobre um usuário específico
async function readUser(request, reply) {
  try {
    const userId = request.params.id;
    await connectDb();
    const user = await User.findById(userId).exec();
    if (user) {
      reply.code(200).send(user);
    } else {
      reply.code(404).send({ error: 'User not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

// Controller para ler dados sobre todos os usuários de uma org específica (com paginação)
async function readAllUsers(request, reply) {
  try {
    const orgId = request.params.orgId;  // Obtém o orgId dos parâmetros da requisição
    if (!orgId) {
      reply.code(400).send({ error: 'Organization ID is required' });
      return;
    }
    await connectDb();
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await User.find({ orgId }).skip(skip).limit(limit).exec();  // Busca usuários baseado no orgId
    reply.code(200).send(users);
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}


// Controller para modificar um usuário específico
async function updateUser(request, reply) {
  try {
    const userId = request.params.id;
    const updateData = request.body;
    await connectDb();
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    if (updatedUser) {
      reply.code(200).send(updatedUser);
    } else {
      reply.code(404).send({ error: 'User not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

// Controller para excluir um usuário específico
async function deleteUser(request, reply) {
  try {
    const userId = request.params.id;
    await connectDb();
    const deletedUser = await User.findByIdAndDelete(userId).exec();
    if (deletedUser) {
      reply.code(200).send({ message: 'User deleted successfully' });
    } else {
      reply.code(404).send({ error: 'User not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

module.exports = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
};
