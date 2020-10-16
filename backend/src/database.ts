import { connect } from "mongoose";

export async function startConnection(): Promise<any> {
    await connect("mongodb://localhost/universityProyect", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log("DB is connected.");
}