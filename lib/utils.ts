import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  )
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  )
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  )
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 2,
})

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount)
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount))
  } else {
    return 'NaN'
  }
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

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string
  key: string
  value: string | null
}) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
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
