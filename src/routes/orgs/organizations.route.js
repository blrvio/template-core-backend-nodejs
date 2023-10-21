const { orgResponseSchema, orgListResponseSchema } = require('../../models/openapi/organizations.oas');
const {
  createOrganization,
  readOrganization,
  deleteOrganization,
  updateOrganization,
  readAllOrganizations,
} = require('./organization.controller');

const organizationsRoutes = async fastify => {
  fastify.post('/', {
    schema: {
      description: 'Create a new organization',
      tags: ['organization'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Organization name' },
        },
      },
      response: orgResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: createOrganization,
  });

  fastify.get('/:id', {
    schema: {
      description: 'Get information about a specific organization',
      tags: ['organization'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Organization ID' },
        },
      },
      response: orgResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: readOrganization,
  });

  fastify.get('/', {
    schema: {
      description: 'Get information about all organizations',
      tags: ['organization'],
      response: orgListResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: readAllOrganizations,
  });

  fastify.patch('/:id', {
    schema: {
      description: 'Update a specific organization',
      tags: ['organization'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Organization ID' },
        },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', nullable: true, description: 'Org name' },
          description: { type: 'string', nullable: true, description: 'Org description' },
          thumbnail_url: { type: 'string', format: 'uri', nullable: true, description: 'URL of the org thumbnail' },
        },
        required: [],
      },
      response: orgResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: updateOrganization,
});


  fastify.delete('/:id', {
    schema: {
      description: 'Delete a specific organization',
      tags: ['organization'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Organization ID' },
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
    handler: deleteOrganization,
  });

  fastify.register(require('./projects/projects.route'), {
    prefix: '/:orgId/projects',
  });
};

module.exports = organizationsRoutes;
