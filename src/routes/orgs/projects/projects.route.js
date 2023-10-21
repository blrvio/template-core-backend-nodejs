const {
  projResponseSchema,
  projListResponseSchema,
} = require('../../../models/openapi/projects.oas');
const {
  createProject,
  readProject,
  updateProject,
  deleteProject,
  readAllProjects,
} = require('./project.controller');

const projectsRoutes = async fastify => {
  fastify.post('/', {
    schema: {
      description: 'Create a new project',
      tags: ['project'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Project name' },
          description: { type: 'string', description: 'Project description' },
          thumbnail_url: {
            type: 'string',
            description: 'Project thumbnail URL',
          },
        },
      },
      response: projResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: createProject,
  });

  fastify.get('/:id', {
    schema: {
      description: 'Get information about a specific project',
      tags: ['project'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Project ID' },
        },
      },
      response: projResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: readProject,
  });

  fastify.get('/', {
    schema: {
      description: 'Get information about all projects',
      tags: ['project'],
      response: projListResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: readAllProjects,
  });

  fastify.patch('/:id', {
    schema: {
      description: 'Update a specific project',
      tags: ['project'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Project ID' },
        },
      },
      response: projResponseSchema,
    },
    preHandler: fastify.checkAuth,
    handler: updateProject,
  });

  fastify.delete('/:id', {
    schema: {
      description: 'Delete a specific project',
      tags: ['project'],
      params: {
        type: 'object',
        properties: {
          projId: { type: 'string', description: 'Project ID' },
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
    handler: deleteProject,
  });
};

module.exports = projectsRoutes;
