import { Schema, model, Document } from "mongoose";

const roleSchema: Schema = new Schema({
    name: String
});

export interface Role extends Document {
    name: string;
}

export default model<Role>('role', roleSchema);