import { FastifyRequest, FastifyReply } from 'fastify';
import { Organization } from '../models/organization.model';
import { connectDb, disconnectDb } from '../services/database/common.database';

interface CreateOrganizationRequestBody {
  name: string;
  description?: string;
  thumbnail_url?: string;
}

// Controlador para Criar uma Nova Organização
async function createOrganization(
  request: FastifyRequest<{ Body: CreateOrganizationRequestBody }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const orgData = {
      resource_data: {
        iam: {
          write_users: 'usr_75f79032-d737-41cf-bd54-0ab28d87c2e7',
        }
      },
      name: request.body.name || 'undefined',
      description: request.body.description || 'undefined',
      thumbnail_url: request.body.thumbnail_url || 'undefined',
      kind: 'orgresources:organization',
    };

    await connectDb();
    const newOrganization = new Organization(orgData);    
    await newOrganization.save();
    reply.code(201).send(newOrganization);
  } catch (error) {
    reply.code(500).send({ error: error });
  } finally {
    await disconnectDb();
  }
}

export { createOrganization };
