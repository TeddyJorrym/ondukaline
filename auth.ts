import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { compareSync } from 'bcrypt-ts-edge'
import { eq } from 'drizzle-orm'
import type { NextAuthConfig, Session } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import db from './db/drizzle'
import { users } from './db/schema'

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  adapter: DrizzleAdapter(db),

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },

        password: {
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (!credentials) return null

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        })

        if (!user || !user.password) {
          return null
        }

        const isMatch = compareSync(
          credentials.password as string,
          user.password
        )

        if (!isMatch) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }: {
      session: Session
      token: { sub?: string }
    }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)







// import { DrizzleAdapter } from '@auth/drizzle-adapter'
// import { compareSync } from 'bcrypt-ts-edge'
// import { eq } from 'drizzle-orm'
// import type { NextAuthConfig } from 'next-auth'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'

// import db from './db/drizzle'
// import { users } from './db/schema'

// export const config = {
//   pages: {
//     signIn: '/sign-in',
//     error: '/sign-in',
//   },
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   adapter: DrizzleAdapter(db),
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {
//           type: 'email',
//         },
//         password: { type: 'password' },
//       },
//       async authorize(credentials) {
//         if (credentials == null) return null

//         const user = await db.query.users.findFirst({
//           where: eq(users.email, credentials.email as string),
//         })
//         if (user && user.password) {
//           const isMatch = compareSync(
//             credentials.password as string,
//             user.password
//           )
//           if (isMatch) {
//             return {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               role: user.role,
//             }
//           }
//         }
//         return null
//       },
//     }),
//   ],
//   callbacks: {
//     session: async ({ session, user, trigger, token }: any) => {
//       session.user.id = token.sub
//       if (trigger === 'update') {
//         session.user.name = user.name
//       }
//       return session
//     },
//   },
// } satisfies NextAuthConfig
// export const { handlers, auth, signIn, signOut } = NextAuth(config)