import { Schema, model } from 'mongoose';
import { IBaseResource, BaseResourceSchema } from './base.model';

interface IUser extends IBaseResource {
    resource_data: {
        default_org: string;
        email: string;
        phone: string;
        account_status: string;
    };
}

const UserSchema: Schema = new Schema({
    ...BaseResourceSchema.obj,
    resource_data: {
        default_org: { type: Schema.Types.ObjectId, ref: 'Organization', required: false },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        account_status: {
            type: String,
            required: true,
            enum: ['active', 'inactive', 'disabled']
        }
    }
});

const User = model<IUser>('User', UserSchema);

export { IUser, User };
