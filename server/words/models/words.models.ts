import { Schema, model, Document } from 'mongoose';

// Querys

export const wordSelectFields: string =
	'_id idUser idCategory word definition conceptVideo meaningVideo visible updatedAt';

// Interfaces

export interface Word extends Document {
	idUser: string;
	idCategory: string;
	word: string;
	definition: string;
	conceptVideo: string;
	meaningVideo: string;
	visible: boolean;
	active: boolean;
}

// Schema

const wordSchema: Schema = new Schema(
	{
		idUser: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},
		idCategory: {
			type: Schema.Types.ObjectId,
			ref: 'category',
			required: true
		},
		word: {
			type: String,
			required: true
		},
		definition: {
			type: String,
			default: ''
		},
		conceptVideo: {
			type: String,
			required: true
		},
		meaningVideo: {
			type: String,
			default: ''
		},
		visible: {
			type: Boolean,
			default: false
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

export default model<Word>('word', wordSchema);
