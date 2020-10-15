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
    definition: String,
    conceptVideo: {
        type: String,
        required: true
    },
    meaningVideo: String,
    visible: Boolean
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
}

export default model<Word>('word', wordSchema);