import { IOrganization, Organization } from '../../models/organization.model';
import { connectDb, disconnectDb } from './common.database';

async function createOrganization(
  data: IOrganization,
): Promise<IOrganization> {
  await connectDb();
  const organization = new Organization({ resource_data: data });
  disconnectDb();
  return await organization.save();
}

// Para encontrar uma organização específica pelo ID
async function getOrganizationById(id: string): Promise<IOrganization | null> {
  await connectDb();
  return await Organization.findById(id)
    .exec()
    .finally(() => disconnectDb());
}

// Para listar todas as organizações
async function listOrganizations(): Promise<IOrganization[]> {
  await connectDb();
  return await Organization.find()
    .exec()
    .finally(() => disconnectDb());
}

async function updateOrganization(
  id: string,
  data: Partial<IOrganization['resource_data']>,
): Promise<IOrganization | null> {
  await connectDb();
  return await Organization.findByIdAndUpdate(
    id,
    { resource_data: data },
    { new: true },
  )
    .exec()
    .finally(() => disconnectDb());
}

async function deleteOrganization(id: string): Promise<IOrganization | null> {
  await connectDb();
  return await Organization.findByIdAndDelete(id)
    .exec()
    .finally(() => disconnectDb());
}

export {
  createOrganization,
  getOrganizationById,
  listOrganizations,
  updateOrganization,
  deleteOrganization,
};
