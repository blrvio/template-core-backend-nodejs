const {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
} = require('../../../controllers/user.controller');

const usersRoutes = async fastify => {
  fastify.post('/', {
    schema: {
      description: 'Create a new user',
      tags: ['user'],
      body: {
        type: 'object',
        properties: {
          thumbnail_url: { type: 'string', description: 'Thumbnail URL' },
          name: { type: 'string', description: 'User name' },
          description: { type: 'string', description: 'User description' },
          email: { type: 'string', description: 'User email' },
          idp_uuid: { type: 'string', description: 'IDP UUID' },
          phone: { type: 'string', description: 'User phone' },
        },
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            name: { type: 'string', description: 'User name' },
            description: { type: 'string', description: 'User description' },
            thumbnail_url: { type: 'string', description: 'Thumbnail URL' },
            kind: { type: 'string', description: 'Kind of user resource' },
            metadata: {
              type: 'object',
              description: 'Metadata of user resource',
              properties: {
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Creation timestamp',
                },
                last_modified: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Last modification timestamp',
                },
              },
            },
            id: { type: 'string', description: 'User ID' },
            resource_data: {
              type: 'object',
              description: 'Resource data of user',
              properties: {
                idp_uuid: { type: 'string', description: 'IDP UUID' },
                email: { type: 'string', description: 'User email' },
                phone: { type: 'string', description: 'User phone' },
                account_status: {
                  type: 'string',
                  description: 'Account status',
                  enum: ['active', 'inactive', 'disabled'],
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    preHandler: fastify.checkAuth,
    handler: createUser,
  });

  // Rota para ler um usuário específico
  fastify.get('/:id', {
    schema: {
      description: 'Get information about a specific user',
      tags: ['user'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User ID' },
        },
      },
    },
    preHandler: fastify.checkAuth,
    handler: readUser,
  });

  // Rota para atualizar um usuário específico
  fastify.patch('/', {
    schema: {
      description: 'Update a specific user',
      tags: ['user'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User ID' },
        },
      },
      body: {
        type: 'object',
        properties: {
          /* Adicione as propriedades que deseja permitir atualizar aqui */
        },
      },
    },
    preHandler: fastify.checkAuth,
    handler: updateUser,
  });

  // Rota para deletar um usuário específico
  fastify.delete('/:id', {
    schema: {
      description: 'Delete a specific user',
      tags: ['user'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User ID' },
        },
      },
    },
    preHandler: fastify.checkAuth,
    handler: deleteUser,
  });
};

module.exports = usersRoutes;
