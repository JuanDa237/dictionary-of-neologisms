import { Schema, model, Document } from "mongoose";

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export interface Category extends Document {
    name: string;
}

export default model<Category>('category', categorySchema);