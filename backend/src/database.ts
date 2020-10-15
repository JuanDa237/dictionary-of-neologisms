import { connect } from "mongoose";

export async function startConnection(): Promise<any> {
    await connect("mongodb://localhost/universityProyect", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB is connected.");
}