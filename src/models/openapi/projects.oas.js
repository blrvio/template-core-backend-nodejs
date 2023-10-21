const projSchema = {
  description: 'Successfully retrieved organization data',
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    thumbnail_url: { type: 'string' },
    kind: {
      type: 'string',
      enum: ['orgresources:project'],
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
        org_id: { type: 'string' },
        apis_enabled: {
          type: 'array',
          items: { type: 'string' },
        },
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
        resources: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  },
};
const projResponseSchema = {
  200: projSchema,
  201: projSchema,
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
const projListResponseSchema = {
  200: {
    description: 'Successfully retrieved projects list',
    type: 'array',
    items: projSchema,
  },
  201: {
    description: 'Successfully retrieved projects list',
    type: 'array',
    items: projSchema,
  },
  500: {
    description: 'Internal server error',
    type: 'object',
    properties: {
      error: { type: 'string' },
    },
  },
};

module.exports = { projResponseSchema, projListResponseSchema };
