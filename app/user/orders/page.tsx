import { auth } from '@/auth'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  deleteOrder,
  getAllOrders,
} from '@/lib/actions/order.actions'

import { APP_NAME } from '@/lib/constants'

import {
  formatCurrency,
  formatDateTime,
  formatId,
} from '@/lib/utils'

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Admin Orders - ${APP_NAME}`,
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
  }>
}) {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    throw new Error(
      'admin permission required'
    )
  }

  const params = await searchParams
  const page = params.page || '1'

  const orders = await getAllOrders({
    page: Number(page),
  })

  return (
    <div className="space-y-2">
      <h1 className="h2-bold">
        Orders
      </h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {formatId(order.id)}
                </TableCell>

                <TableCell>
                  {
                    formatDateTime(
                      order.createdAt
                    ).dateTime
                  }
                </TableCell>

                <TableCell>
                  {order.user
                    ? order.user.name
                    : 'Deleted user'}
                </TableCell>

                <TableCell>
                  {formatCurrency(
                    Number(order.totalPrice)
                  )}
                </TableCell>

                <TableCell>
                  {order.isPaid &&
                  order.paidAt
                    ? formatDateTime(
                        order.paidAt
                      ).dateTime
                    : 'not paid'}
                </TableCell>

                <TableCell>
                  {order.isDelivered &&
                  order.deliveredAt
                    ? formatDateTime(
                        order.deliveredAt
                      ).dateTime
                    : 'not delivered'}
                </TableCell>

                <TableCell className="flex gap-1">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <Link
                      href={`/order/${order.id}`}
                    >
                      Details
                    </Link>
                  </Button>

                  <DeleteDialog
                    id={order.id}
                    action={deleteOrder}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {orders.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={orders.totalPages}
          />
        )}
      </div>
    </div>
  )
}









// import { auth } from '@/auth'
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

// import {
//   deleteOrder,
//   getAllOrders,
// } from '@/lib/actions/order.actions'

// import { APP_NAME } from '@/lib/constants'

// import {
//   formatCurrency,
//   formatDateTime,
//   formatId,
// } from '@/lib/utils'

// import { Metadata } from 'next'
// import Link from 'next/link'

// export const metadata: Metadata = {
//   title: `Admin Orders - ${APP_NAME}`,
// }

// export default async function OrdersPage({
//   searchParams: { page = '1' },
// }: {
//   searchParams: { page: string }
// }) {
//   const session = await auth()

//   if (session?.user.role !== 'admin') {
//     throw new Error(
//       'admin permission required'
//     )
//   }

//   const orders = await getAllOrders({
//     page: Number(page),
//   })

//   return (
//     <div className="space-y-2">
//       <h1 className="h2-bold">
//         Orders
//       </h1>

//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>DATE</TableHead>
//               <TableHead>BUYER</TableHead>
//               <TableHead>TOTAL</TableHead>
//               <TableHead>PAID</TableHead>
//               <TableHead>DELIVERED</TableHead>
//               <TableHead>ACTIONS</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {orders.data.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>
//                   {formatId(order.id)}
//                 </TableCell>

//                 <TableCell>
//                   {
//                     formatDateTime(
//                       order.createdAt
//                     ).dateTime
//                   }
//                 </TableCell>

//                 <TableCell>
//                   {order.user
//                     ? order.user.name
//                     : 'Deleted user'}
//                 </TableCell>

//                 <TableCell>
//                   {formatCurrency(
//                     Number(order.totalPrice)
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   {order.isPaid &&
//                   order.paidAt
//                     ? formatDateTime(
//                         order.paidAt
//                       ).dateTime
//                     : 'not paid'}
//                 </TableCell>

//                 <TableCell>
//                   {order.isDelivered &&
//                   order.deliveredAt
//                     ? formatDateTime(
//                         order.deliveredAt
//                       ).dateTime
//                     : 'not delivered'}
//                 </TableCell>

//                 <TableCell className="flex gap-1">
//                   <Button
//                     asChild
//                     variant="outline"
//                     size="sm"
//                   >
//                     <Link
//                       href={`/order/${order.id}`}
//                     >
//                       Details
//                     </Link>
//                   </Button>

//                   <DeleteDialog
//                     id={order.id}
//                     action={deleteOrder}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {orders.totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={orders.totalPages}
//           />
//         )}
//       </div>
//     </div>
//   )
// }














// import { auth } from '@/auth'
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
// import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
// import { APP_NAME } from '@/lib/constants'
// import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
// import { Metadata } from 'next'
// import Link from 'next/link'

// export const metadata: Metadata = {
//   title: `Admin Orders - ${APP_NAME}`,
// }

// export default async function OrdersPage({
//   searchParams: { page = '1' },
// }: {
//   searchParams: { page: string }
// }) {
//   const session = await auth()
//   if (session?.user.role !== 'admin')
//     throw new Error('admin permission required')

//   const orders = await getAllOrders({
//     page: Number(page),
//   })

//   return (
//     <div className="space-y-2">
//       <h1 className="h2-bold">Orders</h1>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>DATE</TableHead>
//               <TableHead>BUYER</TableHead>
//               <TableHead>TOTAL</TableHead>
//               <TableHead>PAID</TableHead>
//               <TableHead>DELIVERED</TableHead>
//               <TableHead>ACTIONS</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.data.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{formatId(order.id)}</TableCell>
//                 <TableCell>
//                   {formatDateTime(order.createdAt).dateTime}
//                 </TableCell>
//                 <TableCell>
//                   {order.user ? order.user.name : 'Deleted user'}
//                 </TableCell>
//                 <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
//                 <TableCell>
//                   {order.isPaid && order.paidAt
//                     ? formatDateTime(order.paidAt).dateTime
//                     : 'not paid'}
//                 </TableCell>
//                 <TableCell>
//                   {order.isDelivered && order.deliveredAt
//                     ? formatDateTime(order.deliveredAt).dateTime
//                     : 'not delivered'}
//                 </TableCell>
//                 <TableCell className="flex gap-1">
//                   <Button asChild variant="outline" size="sm">
//                     <Link href={`/order/${order.id}`}>Details</Link>
//                   </Button>
//                   <DeleteDialog id={order.id} action={deleteOrder} />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         {orders.totalPages > 1 && (
//           <Pagination page={page} totalPages={orders?.totalPages!} />
//         )}
//       </div>
//     </div>
//   )
// }



// import Pagination from '@/components/shared/pagination'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'

// import { APP_NAME } from '@/lib/constants'
// import {
//   formatCurrency,
//   formatDateTime,
// } from '@/lib/utils'

// import { Metadata } from 'next'
// import Link from 'next/link'

// import { getMyOrders } from '@/lib/actions/order.actions'

// export const metadata: Metadata = {
//   title: `My Orders - ${APP_NAME}`,
// }

// export default async function OrdersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{
//     page?: string
//   }>
// }) {
//   const { page: pageParam } =
//     await searchParams

//   const page =
//     Number(pageParam) || 1

//   const orders = await getMyOrders({
//     page,
//     limit: 6,
//   })

//   return (
//     <div className="space-y-2">
//       <h2 className="h2-bold">
//         Orders
//       </h2>

//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>DATE</TableHead>
//               <TableHead>TOTAL</TableHead>
//               <TableHead>PAID</TableHead>
//               <TableHead>
//                 DELIVERED
//               </TableHead>
//               <TableHead>
//                 ACTIONS
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {orders.data.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>
//                   {order.id.substring(
//                     20,
//                     24
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   {
//                     formatDateTime(
//                       order.createdAt
//                     ).dateTime
//                   }
//                 </TableCell>

//                 <TableCell>
//                   {formatCurrency(
//                     Number(order.totalPrice)
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   {order.isPaid &&
//                   order.paidAt
//                     ? formatDateTime(
//                         order.paidAt
//                       ).dateTime
//                     : 'Not Paid'}
//                 </TableCell>

//                 <TableCell>
//                   {order.isDelivered &&
//                   order.deliveredAt
//                     ? formatDateTime(
//                         order.deliveredAt
//                       ).dateTime
//                     : 'Not Delivered'}
//                 </TableCell>

//                 <TableCell>
//                   <Link
//                     href={`/order/${order.id}`}
//                   >
//                     <span className="px-2">
//                       Details
//                     </span>
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {orders.totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={
//               orders.totalPages
//             }
//           />
//         )}
//       </div>
//     </div>
//   )
// }










// import Pagination from "@/components/shared/pagination"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { APP_NAME } from "@/lib/constants"
// import { formatCurrency, formatDateTime } from "@/lib/utils"
// import { Metadata } from "next"
// import Link from "next/link"

// export const metadata: Metadata = {
//   title: `My Orders - ${APP_NAME}`,
// }
// export default async function OrdersPage({
//   searchParams,
// }: {
//   searchParams: { page: string }
// }) {
//   const page = Number(searchParams.page) || 1
//   const orders = await getMyOrders({
//     page,
//     limit: 6,
//   })
//   return (
//     <div className="space-y-2">
//       <h2 className="h2-bold">Orders</h2>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID</TableHead>
//               <TableHead>DATE</TableHead>
//               <TableHead>TOTAL</TableHead>
//               <TableHead>PAID</TableHead>
//               <TableHead>DELIVERED</TableHead>
//               <TableHead>ACTIONS</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.data.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id.substring(20, 24)}</TableCell>
//                 <TableCell>
//                   {formatDateTime(order.createdAt).dateTime}
//                 </TableCell>
//                 <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
//                 <TableCell>
//                   {order.isPaid && order.paidAt
//                     ? formatDateTime(order.paidAt).dateTime
//                     : 'not paid'}
//                 </TableCell>
//                 <TableCell>
//                   {order.isDelivered && order.deliveredAt
//                     ? formatDateTime(order.deliveredAt).dateTime
//                     : 'not delivered'}
//                 </TableCell>
//                 <TableCell>
//                   <Link href={`/order/${order.id}`}>
//                     <span className="px-2">Details</span>
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         {orders.totalPages > 1 && (
//           <Pagination page={page} totalPages={orders?.totalPages!} />
//         )}
//       </div>
//     </div>
//   )
// }