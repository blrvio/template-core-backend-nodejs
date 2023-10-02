// import { Schema, model } from 'mongoose';

// const UserSchema = new Schema({
//   id: String,
//   name: String,
//   description: String,
//   thumbnail_url: String,
//   kind: String,
//   metadata: {
//     created_at: Date,
//     last_modified: Date,
//     modified_by: String,
//     last_login: Date
//   },
//   resource_data: {
//     default_org: String,
//     email: String,
//     phone: String,
//     account_status: {
//       type: String,
//       enum: ['active', 'inactive', 'suspended'],
//       default: 'active'
//     }
//   }
// });

// const User = model('User', UserSchema);

// export default User;

import { Schema, model } from 'mongoose';
import { IBaseResource, BaseResourceSchema } from './base.model';

interface IProject extends IBaseResource {
    resource_data: {
        has_org: boolean;
        org_id: string;
        apis_enabled: string[];
        iam: {
            read_users: string[];
            write_users: string[];
        };
        resources: string[];
    };
}

const ProjectSchema: Schema = new Schema({
    ...BaseResourceSchema.obj,
    resource_data: {
        has_org: { type: Boolean, required: true },
        org_id: { type: Schema.Types.ObjectId, ref: 'Organization' },
        apis_enabled: [{ type: String }],
        iam: {
            read_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            write_users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
        },
        resources: [
          { type: Schema.Types.ObjectId, ref: 'Resource' }
        ]
    }
});

const Project = model<IProject>('Project', ProjectSchema);

export { IProject, Project };
