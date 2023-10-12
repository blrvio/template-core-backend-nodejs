const {
  createOrganization,
  readOrganization,
  deleteOrganization,
  updateOrganization,
  readAllOrganizations,
} = require('../../controllers/organization.controller');

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
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Organization name' },
            description: {
              type: 'string',
              description: 'Organization description',
            },
            thumbnail_url: { type: 'string', description: 'Thumbnail URL' },
            kind: {
              type: 'string',
              description: 'Kind of organization resource',
            },
            metadata: {
              type: 'object',
              description: 'Metadata of organization resource',
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
            id: { type: 'string', description: 'Organization ID' },
            resource_data: {
              type: 'object',
              description: 'Resource data of organization',
              properties: {
                iam: {
                  type: 'object',
                  properties: {
                    read_users: {
                      type: 'array',
                      items: { type: 'string' },
                      description: 'Read access users',
                    },
                    write_users: {
                      type: 'array',
                      items: { type: 'string' },
                      description: 'Write access users',
                    },
                    owner_user: {
                      type: 'string',
                      description: 'Owner access users',
                    },
                  },
                },
                projects: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Projects of organization',
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
    },
    preHandler: fastify.checkAuth,
    handler: readOrganization,
  });

  fastify.get('/', {
    schema: {
      description: 'Get information about all organizations',
      tags: ['organization'],
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
};

module.exports = organizationsRoutes;
