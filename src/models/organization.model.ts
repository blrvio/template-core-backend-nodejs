import { Schema, model } from 'mongoose';
import { IBaseResource, BaseResourceSchema } from './base.model';
import idPrefixPlugin from '../services/database/plugins.database';

interface IOrganization extends IBaseResource {
  id: string;
  resource_data: {
    iam: {
      read_users?: string[];
      write_users?: string[];
    };
    resources?: string[];
  };
}

const OrganizationSchema: Schema = new Schema({
  ...BaseResourceSchema.obj,
  id: {
    type: String,
    required: true,
    default: idPrefixPlugin({ prefix: 'org_' }),
    unique: true,
  },
  resource_data: {
    iam: {
      read_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      write_users: [{ type: String, ref: 'User' }],
    },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
  },
});

const Organization = model<IOrganization>('Organization', OrganizationSchema);

export { IOrganization, Organization };
