import { Schema, model } from 'mongoose';
import { IBaseResource, BaseResourceSchema } from './base.model';
import idPrefixPlugin from '../services/database/plugins.database';

interface IUser extends IBaseResource {
  id: string;
  resource_data: {
    idp_uuid: string;
    default_org?: string;
    email: string;
    phone?: string;
    account_status: string;
  };
}

const UserSchema: Schema = new Schema({
  ...BaseResourceSchema.obj,
  id: {
    type: String,
    required: true,
    default: idPrefixPlugin({ prefix: 'usr_' }),
    unique: true,
  },
  resource_data: {
    idp_uuid: { type: String, required: true, unique: true },
    default_org: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: false,
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    account_status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'disabled'],
    },
  },
});

const User = model<IUser>('User', UserSchema);

export { IUser, User };
