import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const mongoDB = process.env.BEETER_AUTH_DB_URL;

if (!mongoDB) {
  throw new Error("BETTER_AUTH_URL is not defined");
}

const client = new MongoClient(mongoDB);
const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `
        <h4>Reset your password</h4>
        Click the link to reset your password: ${url}
        <p>Ignore this email if you haven't requested a password reset.</p>
        `,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },

  socialProviders: {
    google: {
      clientId: process.env.BEETER_AUTH_GOGGLE_CLIENT_ID as string,
      clientSecret: process.env.BEETER_AUTH_GOGGLE_CLIENT_SERECT as string,
    },
    github: {
      clientId: process.env.BEETER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SERECT as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
