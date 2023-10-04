import { FastifyPluginAsync } from 'fastify';
import { createOrganization } from '../../controllers/organization.controller';

const organizationsRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
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
            description: { type: 'string', description: 'Organization description' },
            thumbnail_url: { type: 'string', description: 'Thumbnail URL' },
            kind: { type: 'string', description: 'Kind of organization resource' },
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
                    read_users: { type: 'array', items: { type: 'string' }, description: 'Read access users' },
                    write_users: { type: 'array', items: { type: 'string' }, description: 'Write access users' },
                  },
                },
                projects: { type: 'array', items: { type: 'string' }, description: 'Projects of organization' },
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
    handler: createOrganization,
  });
};

export default organizationsRoutes;
