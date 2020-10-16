import mongoose, { Schema, model, Document } from "mongoose";

const wordSchema: Schema = new Schema({
    idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
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
}, {
    timestamps: true,
    versionKey: false
});

export interface Word extends Document {
    idCategory: string;
    word: string;
    definition: string;
    conceptVideo: string;
    meaningVideo: string;
    visible: boolean;
    active: boolean;
}

export default model<Word>('word', wordSchema);