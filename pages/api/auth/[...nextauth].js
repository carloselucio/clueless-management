import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            /* Uncomment when creating master user
            user.role = 'MASTER'
            */
            user.dashboard = {
                create: {}
            }
            return true
        },
        async session({ session, token, user }) {
            session.user = {
                id: user.id,
                name: user.name,
                occupation: user.occupation,
                image: user.image,
                role: user.role,
            }
            return session
        },
      }
})