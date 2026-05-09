'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  useForm,
  type SubmitHandler,
  type ControllerRenderProps,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  Loader2,
  MapPin,
} from 'lucide-react'

import { ShippingAddress } from '@/types'
import { shippingAddressSchema } from '@/lib/validator'
import { shippingAddressDefaultValues } from '@/lib/constants'
import { updateUserAddress } from '@/lib/actions/user.actions'

import CheckoutSteps from '@/components/shared/checkout-steps'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ShippingAddressForm({
  address,
}: {
  address: ShippingAddress | null
}) {
  const router = useRouter()

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues:
      address || shippingAddressDefaultValues,
  })

  const [isPending, startTransition] =
    useTransition()

  const onSubmit: SubmitHandler<
    ShippingAddress
  > = async (values) => {
    startTransition(async () => {
      const res = await updateUserAddress(values)

      if (!res.success) {
        alert(res.message)
        return
      }

      router.push('/payment-method')
    })
  }

  return (
    <>
      <CheckoutSteps current={1} />

      <div className="mx-auto mt-6 max-w-2xl">
        <div className="rounded-3xl border bg-background p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <MapPin className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Shipping Address
              </h1>

              <p className="text-sm text-muted-foreground">
                Enter where you want your order
                delivered
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              method="post"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddress,
                    'fullName'
                  >
                }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name
                    </FormLabel>

                    <Input
                      placeholder="Teddy Jorrym"
                      className="h-12 rounded-xl"
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddress,
                    'streetAddress'
                  >
                }) => (
                  <FormItem>
                    <FormLabel>
                      Street Address
                    </FormLabel>

                    <Input
                      placeholder="123 Main Street"
                      className="h-12 rounded-xl"
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      ShippingAddress,
                      'city'
                    >
                  }) => (
                    <FormItem>
                      <FormLabel>
                        City
                      </FormLabel>

                      <Input
                        placeholder="Nairobi"
                        className="h-12 rounded-xl"
                        {...field}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      ShippingAddress,
                      'country'
                    >
                  }) => (
                    <FormItem>
                      <FormLabel>
                        Country
                      </FormLabel>

                      <Input
                        placeholder="Kenya"
                        className="h-12 rounded-xl"
                        {...field}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="postalCode"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    ShippingAddress,
                    'postalCode'
                  >
                }) => (
                  <FormItem>
                    <FormLabel>
                      Postal Code
                    </FormLabel>

                    <Input
                      placeholder="00100"
                      className="h-12 rounded-xl"
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="h-12 w-full rounded-xl text-sm font-semibold"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}

                Continue to Payment
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}








// 'use client'

// import { ShippingAddress } from "@/types"
// import { useRouter } from "next/navigation"
// import { useForm, SubmitHandler } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { shippingAddressSchema } from "@/lib/validator"
// import { shippingAddressDefaultValues } from "@/lib/constants"
// import { useTransition } from "react"
// import { updateUserAddress } from "@/lib/actions/user.actions"
// import CheckoutSteps from "@/components/shared/checkout-steps"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, Loader } from "lucide-react"

// export default function ShippingAddressForm({
//   address,
// }: {
//   address: ShippingAddress | null
// }) {
//   const router = useRouter()

//   const form = useForm<ShippingAddress>({
//     resolver: zodResolver(shippingAddressSchema),
//     defaultValues: address || shippingAddressDefaultValues,
//   })
//   const { toast } = useToast()

//   const [isPending, startTransition] = useTransition()
//   const onSubmit: SubmitHandler<
//     ShippingAddress
//   > = async (values) => {
//     startTransition(async () => {
//       const res = await updateUserAddress(values)
//       if (!res.success) {
//         toast({
//           variant: 'destructive',
//           description: res.message,
//         })
//         return
//       }
//       router.push('/payment-method')
//     })
//   }

//   return (
//     <>
//       <CheckoutSteps current={1} />
//       <div className="max-w-md mx-auto space-y-4">
//         <h1 className="h2-bold mt-4">Shipping Address</h1>
//         <p className="text-sm text-muted-foreground">
//           Please enter the address that you want to ship to
//         </p>
//         <Form {...form}>
//           <form
//             method="post"
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4"
//           >
//             <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="fullName"
//                 render={({ field }: { field: any }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter full name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div>
//               <FormField
//                 control={form.control}
//                 name="streetAddress"
//                 render={({ field }: { field: any }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Address</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter address" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="city"
//                 render={({ field }: { field: any }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>City</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter city" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="country"
//                 render={({ field }: { field: any }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Country</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter country" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="postalCode"
//                 render={({ field }: { field: any }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Postal Code</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter postal code" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="flex gap-2">
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? (
//                   <Loader className="animate-spin w-4 h-4" />
//                 ) : (
//                   <ArrowRight className="w-4 h-4" />
//                 )}
//                 Continue
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </>
//   )
// }