import { FastifyPluginAsync } from 'fastify';
import {
  createOrganization,
  getOrganizationById,
  listOrganizations,
  updateOrganization,
  deleteOrganization,
} from '../../services/database/organization.database';

const organizationRoutes: FastifyPluginAsync = async (
  fastify,
  opts,
): Promise<void> => {
  // Rota para Criar uma Nova Organização
  fastify.post('/', async (request: any, reply) => {
    const data: any = request.body;
    const newOrganization = await createOrganization(data);
    reply.send(newOrganization);
  });

  // Rota para Obter uma Organização pelo ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const organization = await getOrganizationById(id);
    reply.send(organization);
  });

  // Rota para Listar Todas as Organizações
  fastify.get('', async (request: any, reply) => {
    const organizations = await listOrganizations();
    reply.send(organizations);
  });

  // Rota para Atualizar uma Organização
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const data = request.body;
    const updatedOrganization = await updateOrganization(id, data);
    reply.send(updatedOrganization);
  });

  // Rota para Deletar uma Organização
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const deletedOrganization = await deleteOrganization(id);
    reply.send(deletedOrganization);
  });
};

export default organizationRoutes;
