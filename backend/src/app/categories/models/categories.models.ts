import { Schema, model, Document } from "mongoose";

export const categorySelectFields: string = "_id name updatedAt";

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export interface Category extends Document {
    name: string;
}

export default model<Category>('category', categorySchema);