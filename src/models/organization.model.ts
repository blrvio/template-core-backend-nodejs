import { Schema, model, Document } from 'mongoose';

interface IOrganization extends Document {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  kind: string;
  metadata: {
    created_at: Date;
    last_modified: Date;
    modified_by: string;
  };
  resource_data: {
    iam: {
      read_users: string[];
      write_users: string[];
    };
    resources: Schema.Types.Mixed[];  // ou você pode definir um subesquema específico
  };
}

const OrganizationSchema = new Schema<IOrganization>({
  id: String,
  name: String,
  description: String,
  thumbnail_url: String,
  kind: String,
  metadata: {
    created_at: Date,
    last_modified: Date,
    modified_by: String
  },
  resource_data: {
    iam: {
      read_users: [String],
      write_users: [String]
    },
    resources: [Schema.Types.Mixed]  // ou você pode definir um subesquema específico
  }
});

const Organization = model<IOrganization>('Organization', OrganizationSchema);

export default Organization;
