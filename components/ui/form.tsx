'use client'

import * as React from 'react'
import Image from 'next/image'

import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext =
  React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
  )

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider
      value={{ name: props.name }}
    >
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

type FormItemContextValue = {
  id: string
}

const FormItemContext =
  React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
  )

export function FormItem({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        className={`space-y-2 ${className}`}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

export const useFormField = () => {
  const fieldContext =
    React.useContext(FormFieldContext)

  const itemContext =
    React.useContext(FormItemContext)

  const { getFieldState, formState } =
    useFormContext()

  const fieldState = getFieldState(
    fieldContext.name,
    formState
  )

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

export function FormLabel({
  className = '',
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { error, formItemId } =
    useFormField()

  return (
    <label
      htmlFor={formItemId}
      className={`text-sm font-medium ${
        error ? 'text-red-500' : ''
      } ${className}`}
      {...props}
    />
  )
}

export function FormControl({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

export function FormTextarea({
  className = '',
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { error } = useFormField()

  return (
    <textarea
      className={`flex min-h-32 w-full rounded-xl border bg-background px-4 py-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? 'border-red-500'
          : 'border-input'
      } ${className}`}
      {...props}
    />
  )
}

export function FormSelect({
  className = '',
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { error } = useFormField()

  return (
    <select
      className={`flex h-12 w-full rounded-xl border bg-background px-4 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? 'border-red-500'
          : 'border-input'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function FormCheckbox({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border border-input ${className}`}
      {...props}
    />
  )
}

export function FormImage({
  className = '',
  alt = 'Form image',
  width = 500,
  height = 500,
  src,
}: {
  className?: string
  alt?: string
  width?: number
  height?: number
  src: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-xl border object-cover ${className}`}
    />
  )
}

export function FormDescription({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } =
    useFormField()

  return (
    <p
      id={formDescriptionId}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  )
}

export function FormMessage({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } =
    useFormField()

  if (!error) return null

  return (
    <p
      id={formMessageId}
      className={`text-sm font-medium text-red-500 ${className}`}
      {...props}
    >
      {String(error.message)}
    </p>
  )
}