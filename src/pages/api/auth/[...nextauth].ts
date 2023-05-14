import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { sendVerificationRequest } from "lib/sendVerificationRequest";
import prisma from 'lib/prisma';

export const authOptions: NextAuthOptions = {
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                // @ts-expect-error
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest,
        }),
        // CredentialsProvider({
        //     // The name to display on the sign in form (e.g. "Sign in with...")
        //     name: "Credentials",
        //     // The credentials is used to generate a suitable form on the sign in page.
        //     // You can specify whatever fields you are expecting to be submitted.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //         userName: { label: "Username", type: "text", placeholder: "mohsin.shaikh" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/authenticate`;
        //         const payload = {
        //             userName: credentials?.userName,
        //             password: credentials?.password
        //         }
        //         const response = await fetch(url, {
        //             method: 'POST',
        //             body: JSON.stringify(payload),
        //             headers: {
        //                 "Content-Type": "application/json"
        //             }
        //         })
        //         const contentType = response.headers.get("content-type");
        //         if (contentType && contentType.indexOf("text/plain") !== -1) {
        //             const dataText = await response.text(); // Parse it as text
        //             return dataText as any;
        //         }
        //         if (contentType && contentType.indexOf("application/json") !== -1) {
        //             const dataJson = await response.json(); // Try to parse it as JSON
        //             throw new Error(dataJson.error);
        //         }
        //         // Return null if user data could not be retrieved
        //         return null;
        //     }
        // })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        //     async signIn({ user, account, profile, email, credentials }) {
        //         // console.log({user, email})
        //         const AdminUser = db.adminUser
        //         const adminUser = await AdminUser.findAndCountAll({
        //             where: {
        //                 email: user.email
        //             }
        //         })
        //         if (adminUser.count > 0) {
        //             return true
        //         } else {
        //             // Return false to display a default error message
        //             return false
        //             // Or you can return a URL to redirect to:
        //             // return '/unauthorized'
        //         }
        //     },
        //     // async jwt({ token, user, account, profile }) {
        //     //     // Persist the OAuth access_token and or the user id to the token right after sign-in
        //     //     if (account) {
        //     //         token.accessToken = account.access_token
        //     //         //   token.id = profile.id
        //     //     }
        //     //     console.log({ token, user, account, profile })
        //     //     return token
        //     // },
        async session({ session, token, user }) {
            //         // Send properties to the client, like an access_token and user id from a provider.
            //         // session.accessToken = token.accessToken
            //         // session.user.id = token.id
            //         const AdminUser = db.adminUser
            //         const adminUser = await AdminUser.findAndCountAll({
            //             where: {
            //                 email: token.email
            //             }
            //         })
            //         // @ts-expect-error
            //         session.user.id = adminUser.rows[0].dataValues.id // FIXME: Replace with Merchant ID
            console.log({ session, token, user })
            return session
        }
    },
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    // database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: 'jwt'

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.NEXTAUTH_SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    // callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
    // },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},
    // Themes
    theme: {
        colorScheme: 'light', // "auto" | "dark" | "light"
        // brandColor: '', // Hex color code #33FF5D
        // logo: '/logo.png', // Absolute URL to image
        // buttonText: "" // Hex color code
    },
    // Enable debug messages in the console if you are having problems
    debug: false,
}

export default NextAuth(authOptions)
