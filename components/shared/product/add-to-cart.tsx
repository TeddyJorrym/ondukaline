'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Loader, Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
import { round2 } from '@/lib/utils'
import { Cart, CartItem } from '@/types'

export default function AddToCart({
  cart,
  item,
}: {
  cart?: Cart
  item: Omit<CartItem, 'cartId'>
}) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId)

  return existItem ? (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await removeItemFromCart(item.productId)

            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>

      <span className="px-2">{existItem.qty}</span>

      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await addItemToCart({
              ...item,
              price: item.price,
            })

            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await addItemToCart({
            ...item,
            price: round2(item.price),
          })

          if (!res.success) {
            toast.error(res.message)
            return
          }

          toast.success(`${item.name} added to the cart`, {
            action: {
              label: 'Go to cart',
              onClick: () => router.push('/cart'),
            },
          })
        })
      }}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}

      Add to cart
    </Button>
  )
}









// 'use client'
// import { toast } from 'sonner'
// import { Cart, CartItem } from "@/types"
// import { useRouter } from "next/router"
// import { useTransition } from 'react'
// import { Button } from '@/components/ui/button'
// import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions'
// import { Loader, Minus, Plus } from 'lucide-react'


// export default function AddToCart({
//   cart,
//   item,
// }: {
//   cart?: Cart
//   item: Omit<CartItem, 'cartId'>
// }) {
//   const router = useRouter()
//   // const { toast } = useToast()
//   const [isPending, startTransition] = useTransition()
//   const existItem =
//     cart && cart.items.find((x) => x.productId === item.productId)
//   return existItem ? (
//     <div>
//       <Button
//         type="button"
//         variant="outline"
//         disabled={isPending}
//         onClick={() => {
//           startTransition(async () => {
//             const res = await removeItemFromCart(item.productId)
//             toast({
//               variant: res.success ? 'default' : 'destructive',
//               description: res.message,
//             })
//             return
//           })
//         }}
//       >
//         {isPending ? (
//           <Loader className="w-4 h-4  animate-spin" />
//         ) : (
//           <Minus className="w-4 h-4" />
//         )}
//       </Button>
//       <span className="px-2">{existItem.qty}</span>
//       <Button
//         type="button"
//         variant="outline"
//         disabled={isPending}
//         onClick={() => {
//           startTransition(async () => {
//             const res = await addItemToCart({
//               ...item,
//               price: item.price,
//             })
//             toast({
//               variant: res.success ? 'default' : 'destructive',
//               description: res.message,
//             })
//             return
//           })
//         }}
//       >
//         {isPending ? (
//           <Loader className="w-4 h-4 animate-spin" />
//         ) : (
//           <Plus className="w-4 h-4" />
//         )}
//       </Button>
//     </div>
//   ) : (
//     <Button
//       className="w-full"
//       type="button"
//       disabled={isPending}
//       onClick={() => {
//         startTransition(async () => {
//           const res = await addItemToCart({
//             ...item,
//             price: round2(item.price),
//           })
//           if (!res.success) {
//             toast({
//               variant: 'destructive',
//               description: res.message,
//             })
//             return
//           }
//           toast({
//             description: `${item.name} added to the cart`,
//             action: (
//               <ToastAction
//                 className="bg-primary"
//                 onClick={() => router.push('/cart')}
//                 altText="Go to cart"
//               >
//                 Go to cart
//               </ToastAction>
//             ),
//           })
//         })
//       }}
//     >
//       {isPending ? <Loader className="animate-spin" /> : <Plus />}
//       Add to cart
//     </Button>
//   )
// }