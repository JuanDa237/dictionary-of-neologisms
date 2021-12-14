import { Schema, model, Document } from 'mongoose';

// Querys

export const categoryFields: string = '_id name updatedAt';

// Interfaces

export interface Category extends Document {
	name: string;
	active: boolean;
}

// Schema

const categorySchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export const CategoryModel = model<Category>('category', categorySchema);
