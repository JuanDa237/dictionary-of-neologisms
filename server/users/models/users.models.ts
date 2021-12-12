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
	ADMINISTRATOR = 'administrator',
	SUPERADMIN = 'superadmin'
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

export default model<User>('user', userSchema);

// Methods

export async function encryptPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

export async function validatePassword(
	enteredPassword: string,
	password: string
): Promise<boolean> {
	return await bcrypt.compare(enteredPassword, password);
}
