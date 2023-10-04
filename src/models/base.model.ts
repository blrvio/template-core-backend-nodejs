import { Schema, Document } from 'mongoose';

interface IBaseResource extends Document {
  name: string;
  description: string;
  thumbnail_url: string;
  kind: string;
  metadata: {
    created_at: Date;
    last_modified: Date;
    modified_by: string;
  };
}

const BaseResourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail_url: { type: String, required: true },
  kind: {
    type: String,
    required: true,
    enum: [
      'orgresources:organization',
      'orgresources:project',
      'orgresources:user',
      'product:pdv',
      'product:ingredient',
      'knowledge:recipe',
    ],
  },
  metadata: {
    created_at: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now },
  },
});

// Middleware para setar a data de modificação no momento da atualização
BaseResourceSchema.pre('updateOne', function(next) {
  this.set({ 'metadata.last_modified': Date.now() });
  next();
});

// Middleware para setar a data de criação e modificação no momento da criação
BaseResourceSchema.pre('save', function(next) {
  if (this.isNew) {
    this.set({ 
      'metadata.created_at': Date.now(),
      'metadata.last_modified': Date.now()
    });
  }
  next();
});

export { IBaseResource, BaseResourceSchema };
