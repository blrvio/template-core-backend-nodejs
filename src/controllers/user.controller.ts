import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/user.model';
import { connectDb, disconnectDb } from '../services/database/common.database';

interface CreateUserRequestBody {
  thumbnail_url: string;
  name: string;
  description: string;
  email: string;
  idp_uuid: string;
  phone: string;
}

// Controlador para Criar um Novo Usuário
async function createUser(
  request: FastifyRequest<{ Body: CreateUserRequestBody }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    
    const userData = {
      resource_data: {
        idp_uuid: request.body.idp_uuid || 'undefined',
        email: request.body.email || 'undefined',
        phone: request.body.phone || 'undefined',
        account_status: 'active',
      },
      name: request.body.name || 'undefined',
      description: request.body.description || 'undefined',
      thumbnail_url: request.body.thumbnail_url || 'undefined',
      kind: 'orgresources:user',
    };
    await connectDb();
    const newUser = new User(userData);
    await newUser.save();
    reply.code(201).send(newUser);
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

// Controlador para Recuperar Usuários
async function listUsers(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    reply.code(500).send({ error: error });
  }
}

// // Controlador para Atualizar um Usuário
// async function updateUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
//   try {
//     const userId = request.params.id;
//     const updateData: Partial<IUser['resource_data']> = request.body as Partial<IUser['resource_data']>;
//     const updatedUser = await User.findByIdAndUpdate(userId, { resource_data: updateData }, { new: true });
//     if (!updatedUser) {
//       reply.code(404).send({ error: 'User not found' });
//       return;
//     }
//     reply.send(updatedUser);
//   } catch (error) {
//     reply.code(500).send({ error: error.message });
//   }
// }

// // Controlador para Deletar um Usuário
// async function deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
//   try {
//     const userId = request.params.id;
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       reply.code(404).send({ error: 'User not found' });
//       return;
//     }
//     reply.send({ message: 'User deleted successfully' });
//   } catch (error) {
//     reply.code(500).send({ error: error.message });
//   }
// }

export {
  createUser,
  listUsers,
  //   updateUser,
  //   deleteUser,
};
