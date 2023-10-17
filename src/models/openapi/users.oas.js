const userSchema = {
  description: 'Successfully retrieved/updated/created user',
  type: 'object',
  properties: {
    metadata: {
      type: 'object',
      properties: {
        created_at: {
          type: 'string',
          format: 'date-time',
          example: '2023-10-17T18:28:36.439Z',
        },
        last_modified: {
          type: 'string',
          format: 'date-time',
          example: '2023-10-17T18:28:36.439Z',
        },
      },
    },
    resource_data: {
      type: 'object',
      properties: {
        idp_uuid: {
          type: 'string',
          example: 'calJYUKMpCQMhN1l89aidFovjNh2',
        },
        email: {
          type: 'string',
          example: 'jonataswinston@icloud.com',
        },
        phone: {
          type: 'string',
          example: '5511958201004',
        },
        account_status: {
          type: 'string',
          example: 'active',
        },
      },
    },
    name: {
      type: 'string',
      example: 'Jonatas Winston',
    },
    description: {
      type: 'string',
      example: 'Eu sou o cara hehe',
    },
    thumbnail_url: {
      type: 'string',
      example: 'https://google.com',
    },
    kind: {
      type: 'string',
      example: 'orgresources:user',
    },
    id: {
      type: 'string',
      example: 'usr_54c9e32d-c321-40ad-888a-b7592014f81c',
    },
  },
};
const userResponseSchema = {
  200: userSchema,
  201: userSchema,
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

module.exports = { userResponseSchema };
