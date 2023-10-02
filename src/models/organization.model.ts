import { Schema, model } from 'mongoose';
import { IBaseResource, BaseResourceSchema } from './base.model';

interface IOrganization extends IBaseResource {
    resource_data: {
        iam: {
            read_users: string[];
            write_users: string[];
        };
        resources: string[];
    };
}

const OrganizationSchema: Schema = new Schema({
    ...BaseResourceSchema.obj,
    resource_data: {
        iam: {
            read_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            write_users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
        },
        resources: [
          { type: Schema.Types.ObjectId, ref: 'Resource' }
        ]
    }
});

const Organization = model<IOrganization>('Organization', OrganizationSchema);

export { IOrganization, Organization };
