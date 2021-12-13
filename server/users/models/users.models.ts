import { Schema, model, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Querys

export const userFields: string = '_id username password name role updatedAt';

// Interfaces

export interface User extends Document {
	username: string;
	password: string;
	name: string;
	role: Role;
	active: boolean;
}

export enum Role {
	LOGOGENIST = 'logogenist',
	ADMIN = 'admin'
}

// Schema

const userSchema: Schema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		name: {
			type: String
		},
		role: {
			type: String,
			enum: Object.entries(Role).map(([key, value]) => {
				value;
			}),
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

export const UserModel = model<User>('user', userSchema);

// Methods

export async function encryptPassword(password: string) {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

export async function validatePassword(pass: string, encryptedPass: string) {
	return await bcrypt.compare(pass, encryptedPass);
}
