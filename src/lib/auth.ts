import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoDB = process.env.BEETER_AUTH_DB_URL;

if(!mongoDB){
    throw new Error("BETTER_AUTH_URL is not defined");
}

const client = new MongoClient(mongoDB);
const db = client.db();

export const auth = betterAuth({
    emailAndPassword:{
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client,
    }),
    socialProviders:{
        google:{
            clientId: process.env.BEETER_AUTH_GOGGLE_CLIENT_ID as string,
            clientSecret: process.env.BEETER_AUTH_GOGGLE_CLIENT_SERECT as string
        }
    }
});