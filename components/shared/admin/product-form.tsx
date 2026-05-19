'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import {
  createProduct,
  updateProduct,
} from '@/lib/actions/product.actions'

import { productDefaultValues } from '@/lib/constants'

import { insertProductSchema } from '@/lib/validator'

import { Product } from '@/types'

export default function ProductForm({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: Product
  productId?: string
}) {
  const router = useRouter()

  type ProductFormValues = z.input<
    typeof insertProductSchema
  >

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(insertProductSchema),

    defaultValues:
      type === 'Update' && product
        ? {
            brand: product.brand || '',
            name: product.name || '',
            slug: product.slug || '',
            category: product.category || '',
            images: product.images || [],
            description:
              product.description || '',
            stock: Number(product.stock) || 0,
            price:
              product.price?.toString() || '0',
            isFeatured:
              product.isFeatured || false,
            banner: product.banner || '',
          }
        : {
            ...productDefaultValues,
            brand: '',
            name: '',
            slug: '',
            category: '',
            images: [],
            description: '',
            stock: 0,
            price: '0',
            isFeatured: false,
            banner: '',
          },
  })

  async function onSubmit(
    values: ProductFormValues
  ) {
    try {
      const payload = {
        ...values,
        stock: Number(values.stock ?? 0),
        price: String(values.price ?? '0'),
        images: values.images ?? [],
        banner: values.banner ?? '',
        description:
          values.description ?? '',
        brand: values.brand ?? '',
        name: values.name ?? '',
        slug: values.slug ?? '',
        category: values.category ?? '',
        isFeatured:
          values.isFeatured ?? false,
      }

      if (type === 'Create') {
        const res = await createProduct(
          payload
        )

        if (!res.success) {
          toast.error(res.message)
          return
        }

        toast.success(res.message)

        router.push('/admin/products')
      }

      if (type === 'Update') {
        if (!productId) return

        const res = await updateProduct({
          ...payload,
          id: productId,
        })

        if (!res.success) {
          toast.error(res.message)
          return
        }

        toast.success(res.message)

        router.push('/admin/products')
      }
    } catch (error) {
      console.error(error)

      toast.error('Something went wrong')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit
        )}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Product Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Product name"
                    value={
                      String(field.value ?? '')
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>

                <FormControl>
                  <Input
                    placeholder="product-slug"
                    value={
                      String(field.value ?? '')
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Brand
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Brand"
                    value={
                      String(field.value ?? '')
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Category"
                    value={
                      String(field.value ?? '')
                    }
                    onChange={
                      field.onChange
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={
                      String(field.value ?? '')
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                      )
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Stock
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={
                      String(field.value ?? '')
                    }
                    onChange={(e) =>
                      field.onChange(
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image URL
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="/assets/images/sample.jpg"
                  value={
                    field.value?.[0] || ''
                  }
                  onChange={(e) =>
                    field.onChange([
                      e.target.value,
                    ])
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Banner URL
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="/assets/images/banner.jpg"
                  value={
                    String(field.value ?? '')
                  }
                  onChange={
                    field.onChange
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Product description"
                  value={
                    String(field.value ?? '')
                  }
                  onChange={
                    field.onChange
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 rounded-md border p-4">
              <Checkbox
                checked={
                  Boolean(field.value)
                }
                onCheckedChange={
                  field.onChange
                }
              />

              <FormLabel className="m-0">
                Featured Product
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit">
          {type} Product
        </Button>
      </form>
    </Form>
  )
}










// 'use client'

// import {
//   Form,
// } from '@/components/ui/form'

// import {
//   createProduct,
//   updateProduct,
// } from '@/lib/actions/product.actions'

// import { productDefaultValues } from '@/lib/constants'

// import {
//   insertProductSchema,
// } from '@/lib/validator'

// import { Product } from '@/types'

// import { zodResolver } from '@hookform/resolvers/zod'

// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import { z } from 'zod'

// export default function ProductForm({
//   type,
//   product,
//   productId,
// }: {
//   type: 'Create' | 'Update'
//   product?: Product
//   productId?: string
// }) {
//   const router = useRouter()

//   type ProductFormValues = z.input<
//   typeof insertProductSchema
// >

//   const form = useForm<ProductFormValues>({
//     resolver: zodResolver(insertProductSchema),

//     defaultValues:
//       type === 'Update' && product
//         ? {
//             brand: product.brand,
//             name: product.name,
//             slug: product.slug,
//             category: product.category,
//             images: product.images,
//             description: product.description,
//             stock: Number(product.stock),
//             price: product.price.toString(),
//             isFeatured: product.isFeatured,
//             banner: product.banner,
//           }
//         : productDefaultValues,
//   })

//   async function onSubmit(values: ProductFormValues) {
//     if (type === 'Create') {
//       const res = await createProduct({
//       ...values,
//       stock: Number(values.stock),
//       price: values.price?.toString(),
//     })

//       if (!res.success) {
//         toast.error(res.message)
//       } else {
//         toast.success(res.message)
//         router.push('/admin/products')
//       }
//     }

//     if (type === 'Update') {
//       if (!productId) {
//         router.push('/admin/products')
//         return
//       }

//       const res = await updateProduct({
//       ...values,
//       id: productId,
//       stock: Number(values.stock),
//       price: values.price?.toString(),
//     })

//       if (!res.success) {
//         toast.error(res.message)
//       } else {
//         toast.success(res.message)
//         router.push('/admin/products')
//       }
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         method="post"
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8"
//       >
//         {/* Remaining JSX stays exactly the same */}
//       </form>
//     </Form>
//   )
// }







// 'use client'

// import slugify from 'slugify'

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'

// import { Input } from '@/components/ui/input'

// import {
//   createProduct,
//   updateProduct,
// } from '@/lib/actions/product.actions'

// import { productDefaultValues } from '@/lib/constants'

// import {
//   insertProductSchema,
//   updateProductSchema,
// } from '@/lib/validator'

// import { Product } from '@/types'

// import { zodResolver } from '@hookform/resolvers/zod'

// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import { z } from 'zod'

// import { Card, CardContent } from '@/components/ui/card'

// import Image from 'next/image'

// import { UploadButton } from '@/lib/uploadthing'

// import { Checkbox } from '@/components/ui/checkbox'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'

// export default function ProductForm({
//   type,
//   product,
//   productId,
// }: {
//   type: 'Create' | 'Update'
//   product?: Product
//   productId?: string
// }) {
//   const router = useRouter()

//   const form = useForm<z.infer<typeof insertProductSchema>>({
//     resolver:
//       type === 'Update'
//         ? zodResolver(updateProductSchema)
//         : zodResolver(insertProductSchema),

//     defaultValues:
//       product && type === 'Update'
//         ? product
//         : productDefaultValues,
//   })

//   async function onSubmit(
//     values: z.infer<typeof insertProductSchema>
//   ) {
//     if (type === 'Create') {
//       const res = await createProduct(values)

//       if (!res.success) {
//         toast.error(res.message)
//       } else {
//         toast.success(res.message)
//         router.push(`/admin/products`)
//       }
//     }

//     if (type === 'Update') {
//       if (!productId) {
//         router.push(`/admin/products`)
//         return
//       }

//       const res = await updateProduct({
//         ...values,
//         id: productId,
//       })

//       if (!res.success) {
//         toast.error(res.message)
//       } else {
//         toast.success(res.message)
//         router.push(`/admin/products`)
//       }
//     }
//   }

//   const images = form.watch('images')
//   const isFeatured = form.watch('isFeatured')
//   const banner = form.watch('banner')

//   return (
//     <Form {...form}>
//       <form
//         method="post"
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8"
//       >
//         {/* Remaining JSX stays exactly the same */}
//       </form>
//     </Form>
//   )
// }






// 'use client'

// import slugify from 'slugify'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { useToast } from '@/components/ui/use-toast'
// import { createProduct, updateProduct } from '@/lib/actions/product.actions'
// import { productDefaultValues } from '@/lib/constants'
// import { insertProductSchema, updateProductSchema } from '@/lib/validator'
// import { Product } from '@/types'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { Card, CardContent } from '@/components/ui/card'
// import Image from 'next/image'
// import { UploadButton } from '@/lib/uploadthing'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'

// export default function ProductForm({
//   type,
//   product,
//   productId,
// }: {
//   type: 'Create' | 'Update'
//   product?: Product
//   productId?: string
// }) {
//   const router = useRouter()

//   const form = useForm<z.infer<typeof insertProductSchema>>({
//     resolver:
//       type === 'Update'
//         ? zodResolver(updateProductSchema)
//         : zodResolver(insertProductSchema),
//     defaultValues:
//       product && type === 'Update' ? product : productDefaultValues,
//   })

//   const { toast } = useToast()

//   async function onSubmit(values: z.infer<typeof insertProductSchema>) {
//     if (type === 'Create') {
//       const res = await createProduct(values)
//       if (!res.success) {
//         toast({
//           variant: 'destructive',
//           description: res.message,
//         })
//       } else {
//         toast({
//           description: res.message,
//         })
//         router.push(`/admin/products`)
//       }
//     }
//     if (type === 'Update') {
//       if (!productId) {
//         router.push(`/admin/products`)
//         return
//       }
//       const res = await updateProduct({ ...values, id: productId })
//       if (!res.success) {
//         toast({
//           variant: 'destructive',
//           description: res.message,
//         })
//       } else {
//         router.push(`/admin/products`)
//       }
//     }
//   }
//   const images = form.watch('images')
//   const isFeatured = form.watch('isFeatured')
//   const banner = form.watch('banner')
//   return (
//     <Form {...form}>
//       <form
//         method="post"
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8"
//       >
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }: { field: any }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter product name" {...field} />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="slug"
//             render={({ field }: { field: any }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Slug</FormLabel>

//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       placeholder="Enter product slug"
//                       className="pl-8"
//                       {...field}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         form.setValue(
//                           'slug',
//                           slugify(form.getValues('name'), { lower: true })
//                         )
//                       }}
//                     >
//                       Generate
//                     </button>
//                   </div>
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Category</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter category" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="brand"
//             render={({ field }: { field: any }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Brand</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter product brand" {...field} />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="price"
//             render={({ field }: { field: any }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter product price" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="stock"
//             render={({ field }: { field: any }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Stock</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Enter product stock"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={form.control}
//             name="images"
//             render={() => (
//               <FormItem className="w-full">
//                 <FormLabel>Images</FormLabel>
//                 <Card>
//                   <CardContent className="space-y-2 mt-2 min-h-48">
//                     <div className="flex-start space-x-2">
//                       {images.map((image: string) => (
//                         <Image
//                           key={image}
//                           src={image}
//                           alt="product image"
//                           className="w-20 h-20 object-cover object-center rounded-sm"
//                           width={100}
//                           height={100}
//                         />
//                       ))}
//                       <FormControl>
//                         <UploadButton
//                           endpoint="imageUploader"
//                           onClientUploadComplete={(res: any) => {
//                             form.setValue('images', [...images, res[0].url])
//                           }}
//                           onUploadError={(error: Error) => {
//                             toast({
//                               variant: 'destructive',
//                               description: `ERROR! ${error.message}`,
//                             })
//                           }}
//                         />
//                       </FormControl>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div>
//           Featured Product
//           <Card>
//             <CardContent className="space-y-2 mt-2  ">
//               <FormField
//                 control={form.control}
//                 name="isFeatured"
//                 render={({ field }) => (
//                   <FormItem className="space-x-2 items-center">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormLabel>Is Featured?</FormLabel>
//                   </FormItem>
//                 )}
//               />
//               {isFeatured && banner && (
//                 <Image
//                   src={banner}
//                   alt="banner image"
//                   className=" w-full object-cover object-center rounded-sm"
//                   width={1920}
//                   height={680}
//                 />
//               )}
//               {isFeatured && !banner && (
//                 <UploadButton
//                   endpoint="imageUploader"
//                   onClientUploadComplete={(res) => {
//                     form.setValue('banner', res[0].url)
//                   }}
//                   onUploadError={(error: Error) => {
//                     toast({
//                       variant: 'destructive',
//                       description: `ERROR! ${error.message}`,
//                     })
//                   }}
//                 />
//               )}
//             </CardContent>
//           </Card>
//         </div>
//         <div>
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Enter product description"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div>
//           <Button
//             type="submit"
//             size="lg"
//             disabled={form.formState.isSubmitting}
//             className="button col-span-2 w-full"
//           >
//             {form.formState.isSubmitting ? 'Submitting...' : `${type} Product `}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }