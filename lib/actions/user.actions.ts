'use server'

import { isRedirectError } from 'next/dist/client/components/redirect-error'

import { signIn, signOut } from '@/auth'
import { signInFormSchema, signUpFormSchema } from '../validator'
import { formatError } from '../utils'
import { hashSync } from 'bcrypt-ts-edge'
import db from '@/db/drizzle'
import { users } from '@/db/schema'

//USER
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    })
    const values = {
      id: crypto.randomUUID(),
      ...user,
      password: hashSync(user.password, 10),
    }
    await db.insert(users).values(values)
    await signIn('credentials', {
      email: user.email,
      password: user.password,
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return {
      success: false,
      message: formatError(error).includes(
        'duplicate key value violates unique constraint "user_email_idx"'
      )
        ? 'Email already exist'
        : formatError(error),
    }
  }
}

export async function signInWithCredentials(
  prevState: {
    success: boolean
    message: string
  },
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    })

    const callbackUrl =
      String(formData.get('callbackUrl')) || '/'

    await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirectTo: callbackUrl,
    })

    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    return {
      success: false,
      message: 'Invalid email or password',
    }
  }
}

export const SignOut = async () => {
  await signOut({
    redirectTo: '/',
  })
}








// 'use server'

// import { isRedirectError } from 'next/dist/client/components/redirect'

// import { signIn, signOut } from '@/auth'
// import { signInFormSchema } from '../validator'

// export async function signInWithCredentials(
//   prevState: unknown,
//   formData: FormData
// ) {
//   try {
//     const user = signInFormSchema.parse({
//       email: formData.get('email'),
//       password: formData.get('password'),
//     })
//     await signIn('credentials', user)
//     return { success: true, message: 'Sig in successfully' }
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error
//     }
//     return { success: false, message: 'Invalid email or password' }
//   }
// }

// export const SignOut = async () => {
//   await signOut()
// }