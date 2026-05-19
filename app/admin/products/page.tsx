import { auth } from '@/auth'
import Link from 'next/link'
import { Metadata } from 'next'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import Pagination from '@/components/shared/pagination'
import DeleteDialog from '@/components/shared/delete-dialog'

import {
  deleteProduct,
  getAllProducts,
} from '@/lib/actions/product.actions'

import {
  formatCurrency,
  formatId,
} from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Admin Products',
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    query?: string
    category?: string
  }>
}) {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    throw new Error('Admin permission required')
  }

  const params = await searchParams

  const page = Number(params.page) || 1
  const searchText = params.query || ''
  const category = params.category || ''

  const products = await getAllProducts({
    page,
    query: searchText,
    category,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="h2-bold">
          Products
        </h1>

        <Button asChild>
          <Link href="/admin/products/create">
            Add Product
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {formatId(product.id)}
                </TableCell>

                <TableCell>
                  {product.name}
                </TableCell>

                <TableCell>
                  {formatCurrency(
                    Number(product.price)
                  )}
                </TableCell>

                <TableCell>
                  {product.category}
                </TableCell>

                <TableCell>
                  {product.stock}
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                  >
                    <Link
                      href={`/admin/products/${product.id}`}
                    >
                      Edit
                    </Link>
                  </Button>

                  <DeleteDialog
                    id={product.id}
                    action={deleteProduct}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {products.totalPages > 1 && (
          <Pagination
            page={String(page)}
            totalPages={products.totalPages}
          />
        )}
      </div>
    </div>
  )
}









// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Admin Products',
// }

// export default async function AdminProductsPage(props: {
//   searchParams: Promise<{
//     page?: string
//     query?: string
//     category?: string
//   }>
// }) {
//   const searchParams = await props.searchParams

//   const page = Number(searchParams.page) || 1
//   const searchText = searchParams.query || ''
//   const category = searchParams.category || ''

//   return (
//     <div>
//       {/* your existing UI */}
//     </div>
//   )
// }












// import DeleteDialog from '@/components/shared/delete-dialog'
// import Pagination from '@/components/shared/pagination'
// import { Button } from '@/components/ui/button'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { deleteProduct, getAllProducts } from '@/lib/actions/product.actions'
// import { APP_NAME } from '@/lib/constants'
// import { formatCurrency, formatId } from '@/lib/utils'
// import { Metadata } from 'next'
// import Link from 'next/link'

// export const metadata: Metadata = {
//   title: `Admin Products - ${APP_NAME}`,
// }

// export default async function AdminProductsPage({
//   searchParams,
// }: {
//   searchParams: {
//     page: string
//     query: string
//     category: string
//   }
// }) {
//   const page = Number(searchParams.page) || 1
//   const searchText = searchParams.query || ''
//   const category = searchParams.category || ''

//   const products = await getAllProducts({
//     query: searchText,
//     category,
//     page,
//   })

//   return (
//     <div className="space-y-2">
//       <div className="flex-between">
//         <h1 className="h2-bold">Products</h1>

//         <Button asChild variant="default">
//           <Link href="/admin/products/create">
//             Create Product
//           </Link>
//         </Button>
//       </div>

//       <div>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>NAME</TableHead>
//               <TableHead className="text-right">
//                 PRICE
//               </TableHead>
//               <TableHead>CATEGORY</TableHead>
//               <TableHead>STOCK</TableHead>
//               <TableHead>RATING</TableHead>
//               <TableHead className="w-25">
//                 ACTIONS
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {products.data.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>
//                   {formatId(product.id)}
//                 </TableCell>

//                 <TableCell>{product.name}</TableCell>

//                 <TableCell className="text-right">
//                   {formatCurrency(product.price)}
//                 </TableCell>

//                 <TableCell>{product.category}</TableCell>

//                 <TableCell>{product.stock}</TableCell>

//                 <TableCell>{product.rating}</TableCell>

//                 <TableCell className="flex gap-1">
//                   <Button asChild variant="outline" size="sm">
//                     <Link href={`/admin/products/${product.id}`}>
//                       Edit
//                     </Link>
//                   </Button>

//                   <DeleteDialog
//                     id={product.id}
//                     action={deleteProduct}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {products.totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={products.totalPages}
//           />
//         )}
//       </div>
//     </div>
//   )
// }










// import DeleteDialog from '@/components/shared/delete-dialog'
// import Pagination from '@/components/shared/pagination'
// import { Button } from '@/components/ui/button'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { deleteProduct, getAllProducts } from '@/lib/actions/product.actions'
// import { APP_NAME } from '@/lib/constants'
// import { formatCurrency, formatId } from '@/lib/utils'
// import { Metadata } from 'next'
// import Link from 'next/link'

// export const metadata: Metadata = {
//   title: `Admin Products - ${APP_NAME}`,
// }

// export default async function AdminProductsPage({
//   searchParams,
// }: {
//   searchParams: {
//     page: string
//     query: string
//     category: string
//   }
// }) {
//   const page = Number(searchParams.page) || 1
//   const searchText = searchParams.query || ''
//   const category = searchParams.category || ''
//   const products = await getAllProducts({
//     query: searchText,
//     category,
//     page,
//   })
//   return (
//     <div className="space-y-2">
//       <div className="flex-between">
//         <h1 className="h2-bold">Products</h1>
//         <Button asChild variant="default">
//           <Link href="/admin/products/create">Create Product</Link>
//         </Button>
//       </div>
//       <div>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>NAME</TableHead>
//               <TableHead className="text-right">PRICE</TableHead>
//               <TableHead>CATEGORY</TableHead>
//               <TableHead>STOCK</TableHead>
//               <TableHead>RATING</TableHead>
//               <TableHead className="w-[100px]">ACTIONS</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products?.data.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{formatId(product.id)}</TableCell>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell className="text-right">
//                   {formatCurrency(product.price)}
//                 </TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>{product.stock}</TableCell>
//                 <TableCell>{product.rating}</TableCell>
//                 <TableCell className="flex gap-1">
//                   <Button asChild variant="outline" size="sm">
//                     <Link href={`/admin/products/${product.id}`}>Edit</Link>
//                   </Button>
//                   <DeleteDialog id={product.id} action={deleteProduct} />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         {products?.totalPages! > 1 && (
//           <Pagination page={page} totalPages={products?.totalPages!} />
//         )}
//       </div>
//     </div>
//   )
// }