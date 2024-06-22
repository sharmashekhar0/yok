import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const { username, password } = credentials;
				await connectDB();
				const user = await User.findOne({ email: username });
				console.log("username", user);

				if (!user) {
					return Promise.resolve(null);
				}

				const inputHash = crypto
					.pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
					.toString("hex");
				if (inputHash == user.hash) {
					return Promise.resolve(user);
				} else {
					return Promise.resolve("invalid user");
				}
			},
		}),
		// ...add more providers here
	],

	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			// console.log("in jwt",token)
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;

			return session;
		},
		async signIn({ user }) {
			console.log("inside callback");
			await connectDB();
			console.log("connected", user);
			const u = await User.findOne({ email: user.email });
			console.log("found", u);
			const email = user.email;
			const name = user.name;
			if (!u) {
				const newUser = new User({
					email,
					profile: {
						firstName: name,
					},
				});
				await newUser.save();
			}
			return true;
		},
	},
};

export default NextAuth(authOptions);
