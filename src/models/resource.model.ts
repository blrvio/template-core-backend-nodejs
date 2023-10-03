import { Schema, model } from 'mongoose';
import { IBaseResource, BaseResourceSchema } from './base.model';

interface IResource extends IBaseResource {
    resource_data: {
        // "kind": "product:ingredient",
        medium_cost?: number;
        currency?: string;
        inventory_quantity?: number;
        last_restock_date?: Date;
        unit_of_measure?: string;
        quantity_value?: number;
        // "kind": "product:pdv",
        image_gallery?: string[];
        product_rating?: number;
        price?: number;
        product_ingredients?: string[];
        // "kind": "knowledge:recipe"
        instructions?: string;
    };
}

const ResourceSchema: Schema = new Schema({
    ...BaseResourceSchema.obj,
    resource_data: {
        // "kind": "product:ingredient",
        medium_cost: { type: Number, required: false },
        currency: { type: String, enum: ['BRL', 'USD'], required: false },
        inventory_quantity: { type: Number, required: false },
        last_restock_date: { type: Date, required: false },
        unit_of_measure: { type: String, required: false },
        quantity_value: { type: Number, required: false },
        // "kind": "product:pdv",
        image_gallery: { type: [String], required: false },
        product_rating: { type: Number, required: false },
        price: { type: Number, required: false },
        product_ingredients: { type: [String], required: false },
        // "kind": "knowledge:recipe"
        instructions: { type: String, required: false }
    }
});

const Resource = model<IResource>('Resource', ResourceSchema);

export { IResource, Resource };
