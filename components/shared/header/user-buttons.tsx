'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/lib/actions/user.actions'
import ModeToggle from './mode-toggle'

type Props = {
  session: {
    user: {
      name?: string | null
      email?: string | null
      role?: string | null
    }
  } | null
}

export default function UserButtonsClient({ session }: Props) {
  if (!session) {
    return (
      <Button asChild>
        <Link href="/api/auth/signin">Sign In</Link>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative rounded-full"
          >
            {session.user.name}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>

              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/user/profile">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/user/orders">
              Order History
            </Link>
          </DropdownMenuItem>

          {session.user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin/overview">
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0">
            <form action={SignOut} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start rounded-none px-2 py-5"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>

          <div className="px-2 py-1">
            <ModeToggle />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}












// import Link from 'next/link'
// import { auth } from '@/auth'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { SignOut } from '@/lib/actions/user.actions'
// import ModeToggle from './mode-toggle'

// export default async function UserButton() {
//   const session = await auth()
//   if (!session)
//     return (
//       <Link href="/api/auth/signin">
//         <Button>Sign In</Button>
//       </Link>
//     )
//   return (
//     <div className="flex gap-2 items-center">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               className="relative w-8 h-8 rounded-full ml-2"
//             >
//               {session.user.name}
//             </Button>
//           </div>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56" align="end" forceMount>
//           <DropdownMenuLabel className="font-normal">
//             <div className="flex flex-col space-y-1">
//               <p className="text-sm font-medium leading-none">
//                 {session.user.name}
//               </p>
//               <p className="text-xs leading-none text-muted-foreground">
//                 {session.user.email}
//               </p>
//             </div>
//           </DropdownMenuLabel>

//           <DropdownMenuItem>
//             <Link className="w-full" href="/user/profile">
//               Profile
//             </Link>
//           </DropdownMenuItem>

//           <DropdownMenuItem>
//             <Link className="w-full" href="/user/orders">
//               Order History
//             </Link>
//           </DropdownMenuItem>

//           {session.user.role === 'admin' && (
//             <DropdownMenuItem>
//               <Link className="w-full" href="/admin/overview">
//                 Admin
//               </Link>
//             </DropdownMenuItem>
//           )}

//           <DropdownMenuItem className="p-0 mb-1">
//             <form action={SignOut} className="w-full">
//               <Button
//                 className="w-full py-4 px-2 h-4 justify-start"
//                 variant="ghost"
//               >
//                 Sign Out
//               </Button>
//             </form>
//           </DropdownMenuItem>
//           <ModeToggle />
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )
// }









// import Link from 'next/link'
// import { auth } from '@/auth'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { SignOut } from '@/lib/actions/user.actions'
// import ModeToggle from './mode-toggle'

// export default async function UserButton() {
//   const session = await auth()
//   if (!session)
//     return (
//       <Link href="/api/auth/signin">
//         <Button>Sign In</Button>
//       </Link>
//     )
//   return (
//     <div className="flex gap-2 items-center">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               className="relative w-8 h-8 rounded-full ml-2"
//             >
//               {session.user.name}
//             </Button>
//           </div>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56" align="end" forceMount>
//           <DropdownMenuLabel className="font-normal">
//             <div className="flex flex-col space-y-1">
//               <p className="text-sm font-medium leading-none">
//                 {session.user.name}
//               </p>
//               <p className="text-xs leading-none text-muted-foreground">
//                 {session.user.email}
//               </p>
//             </div>
//           </DropdownMenuLabel>

//           <DropdownMenuItem>
//             <Link className="w-full" href="/user/profile">
//               Profile
//             </Link>
//           </DropdownMenuItem>

//           <DropdownMenuItem>
//             <Link className="w-full" href="/user/orders">
//               Order History
//             </Link>
//           </DropdownMenuItem>

//           {session.user.role === 'admin' && (
//             <DropdownMenuItem>
//               <Link className="w-full" href="/admin/overview">
//                 Admin
//               </Link>
//             </DropdownMenuItem>
//           )}

//           <DropdownMenuItem className="p-0 mb-1">
//             <form action={SignOut} className="w-full">
//               <Button
//                 className="w-full py-4 px-2 h-4 justify-start"
//                 variant="ghost"
//               >
//                 Sign Out
//               </Button>
//             </form>
//           </DropdownMenuItem>
//           <ModeToggle />
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )
// }