const {
  addUserToOrganization,
  getUserPermissions,
  modifyUserPermissions,
  removeUserFromOrganization,
  listAllPermissions
} = require('./iam.controller');

const iamRoutes = async fastify => {
  fastify.post('/users', {
    schema: {
      description: 'Add a user to an organization with specific permissions',
      tags: ['IAM'],
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID' },
          permissions: { 
            type: 'string',
            description: 'Permissions set: read, write'
          },
        },
        required: ['userId', 'permissions']
      },
    },
    preHandler: fastify.checkAuth,
    handler: addUserToOrganization,
  });

  fastify.put('/users', {
    schema: {
      description: 'Modify permissions of a user in an organization',
      tags: ['IAM'],
      params: {
        type: 'object',
        properties: {
          orgId: { type: 'string', description: 'Organization ID' }
        },
      },
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User ID' },
          permission: { 
            type: 'string',
            description: 'Permissions set: read, write'
          },
        },
        required: ['userId', 'permission']
      },
    },
    preHandler: fastify.checkAuth,
    handler: modifyUserPermissions,
  });

  fastify.delete('/users/:userId', {
    schema: {
      description: 'Remove a user from an organization',
      tags: ['IAM'],
      params: {
        type: 'object',
        properties: {
          orgId: { type: 'string', description: 'Organization ID' },
          userId: { type: 'string', description: 'User ID' },
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Deletion message' },
          },
        },
        403: {
          description: 'Forbidden',
          type: 'object',
          properties: {
            error: { type: 'string' },
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
    handler: removeUserFromOrganization,
  });

  fastify.get('/users/permissions', {
    schema: {
      description: 'List all permissions (all users and their permissions) in an organization',
      tags: ['IAM'],
      params: {
        type: 'object',
        properties: {
          orgId: { type: 'string', description: 'Organization ID' },
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Organization ID' },
            kind: { type: 'string', description: 'Type of resource' },
            resource_permissions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'User ID' },
                  permission: { type: 'string', description: 'Permission type', enum: ['write', 'owner', 'read'] }
                }
              }
            }
          }
        },
        // TODO: ... (outros códigos de status de resposta, como 400, 404, etc., se necessário)
      }
    },
    preHandler: fastify.checkAuth,
    handler: listAllPermissions,
  });
  
};

module.exports = iamRoutes;