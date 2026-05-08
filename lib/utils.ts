import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatError = (error: unknown): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'name' in error
  ) {
    const err = error as {
      name: string
      errors?: Record<
        string,
        {
          message: string
          path?: string[]
        }
      >
      message?: string
    }

    if (err.name === 'ZodError' && err.errors) {
      const fieldErrors = Object.keys(err.errors).map(
        (field) => {
          const errorMessage =
            err.errors?.[field]?.message

          return `${err.errors?.[field]?.path}: ${errorMessage}`
        }
      )

      return fieldErrors.join('. ')
    }

    if (err.name === 'ValidationError' && err.errors) {
      const fieldErrors = Object.keys(err.errors).map(
        (field) => {
          return err.errors?.[field]?.message
        }
      )

      return fieldErrors.join('. ')
    }

    if (typeof err.message === 'string') {
      return err.message
    }
  }

  return 'Something went wrong'
}

export const formatNumberWithDecimal = (
  num: number
): string => {
  const [int, decimal] = num.toString().split('.')

  return decimal
    ? `${int}.${decimal.padEnd(2, '0')}`
    : `${int}.00`
}

export const round2 = (
  value: number | string
): number => {
  if (typeof value === 'number') {
    return (
      Math.round((value + Number.EPSILON) * 100) / 100
    )
  }

  if (typeof value === 'string') {
    return (
      Math.round(
        (Number(value) + Number.EPSILON) * 100
      ) / 100
    )
  }

  throw new Error(
    'Value is not a number or string'
  )
}









// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export const formatError = (error: any): string => {
//   if (error.name === 'ZodError') {
//     const fieldErrors = Object.keys(error.errors).map((field) => {
//       const errorMessage = error.errors[field].message
//       return `${error.errors[field].path}: ${errorMessage}` // field: errorMessage
//     })
//     return fieldErrors.join('. ')
//   } else if (error.name === 'ValidationError') {
//     const fieldErrors = Object.keys(error.errors).map((field) => {
//       const errorMessage = error.errors[field].message
//       return errorMessage
//     })
//     return fieldErrors.join('. ')
//   } else {
//     return typeof error.message === 'string'
//       ? error.message
//       : JSON.stringify(error.message)
//   }
// }

// export const formatNumberWithDecimal = (num: number): string => { 
//   const [int, decimal] = num.toString().split('.')
//   return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
// }

// export const round2 = (value: number | string) => {
//   if (typeof value === 'number') {
//     return Math.round((value + Number.EPSILON) * 100) / 100 // avoid rounding errors
//   } else if (typeof value === 'string') {
//     return Math.round((Number(value) + Number.EPSILON) * 100) / 100
//   } else {
//     throw new Error('value is not a number nor a string')
//   }
// }
