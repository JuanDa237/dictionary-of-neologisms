import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export const userSelectFields: string = '_id idRole username password name updatedAt';

const userSchema: Schema = new Schema(
	{
		idRole: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'role',
			required: true
		},
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

export interface User extends Document {
	idRole: string;
	username: string;
	password: string;
	name: string;
	active: boolean;
}

export default model<User>('user', userSchema);

//Methods

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
