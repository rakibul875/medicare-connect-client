import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("medi-care-connect");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true
  },
 user: {
    additionalFields: {
      role: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      gender: {
        type: "string",
      },
      profilePhoto: {
        type: "string",
      },
      status: {
        type: "string",
      },
    },
  },
});
