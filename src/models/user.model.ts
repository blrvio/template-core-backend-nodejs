import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  id: String,
  name: String,
  description: String,
  thumbnail_url: String,
  kind: String,
  metadata: {
    created_at: Date,
    last_modified: Date,
    modified_by: String,
    last_login: Date
  },
  resource_data: {
    default_org: String,
    email: String,
    phone: String,
    account_status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
    }
  }
});

const User = model('User', UserSchema);

export default User;
