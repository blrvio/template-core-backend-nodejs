const orgSchema = {
  description: 'Successfully retrieved organization data',
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    thumbnail_url: { type: 'string' },
    kind: {
      type: 'string',
      enum: ['orgresources:organization'],
    },
    metadata: {
      type: 'object',
      properties: {
        created_at: { type: 'string', format: 'date-time' },
        last_modified: { type: 'string', format: 'date-time' },
      },
    },
    id: { type: 'string' },
    resource_data: {
      type: 'object',
      properties: {
        iam: {
          type: 'object',
          properties: {
            owner_user: { type: 'string' },
            read_users: {
              type: 'array',
              items: { type: 'string' },
            },
            write_users: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        projects: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  },
};
const orgResponseSchema = {
  200: orgSchema,
  201: orgSchema,
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
};
const orgListResponseSchema = {
  200: {
    description: 'Successfully retrieved organizations list',
    type: 'array',
    items: orgSchema,
  },
  201: {
    description: 'Successfully retrieved organizations list',
    type: 'array',
    items: orgSchema,
  },
  500: {
    description: 'Internal server error',
    type: 'object',
    properties: {
      error: { type: 'string' },
    },
  },
};

module.exports = { orgResponseSchema, orgListResponseSchema };
