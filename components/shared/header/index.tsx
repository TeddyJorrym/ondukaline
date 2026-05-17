import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { getAllCategories } from "@/lib/actions/product.actions";

import Menu from "./menu";
import Search from "./search";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import { MenuIcon } from "lucide-react";

const Header = async () => {
  const categories = await getAllCategories();

  return (
    <header className="w-full border-b bg-background">
      <div className="wrapper flex-between">
        <div className="flex items-center gap-4">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
              >
                <MenuIcon className="size-5" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="h-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Select a category</DrawerTitle>

                <div className="mt-4 space-y-1">
                  {categories.map((category: { name: string }) => (
                    <DrawerClose asChild key={category.name}>
                      <Link
                        href={`/search?category=${category.name}`}
                        className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        {category.name}
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/assets/icons/logo.svg"
              width={148}
              height={148}
              alt={`${APP_NAME} logo`}
              priority
            />

            {/* <span className="hidden sm:block">
              {APP_NAME}
            </span> */}
          </Link>
        </div>

        <div className="hidden md:block flex-1 max-w-xl mx-6">
          <Search />
        </div>

        <Menu />
      </div>

      <div className="block px-5 pb-2 md:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;












// import Image from 'next/image'
// import Link from 'next/link'
// import { APP_NAME } from '@/lib/constants'
// import Menu from './menu'

// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer'
// import { Button } from '@/components/ui/button'
// import { MenuIcon } from 'lucide-react'
// import { getAllCategories } from '@/lib/actions/product.actions'
// import Search from './search'

// const Header = async () => {
//   const categories = await getAllCategories()

//   return (
//     <header className="w-full border-b">
//       <div className="wrapper flex-between">
//         <div className="flex-start">
//           <Drawer direction="left">
//             <DrawerTrigger asChild>
//               <Button variant="outline">
//                 <MenuIcon />
//               </Button>
//             </DrawerTrigger>
//             <DrawerContent className="h-full max-w-sm">
//               <DrawerHeader>
//                 <DrawerTitle>Select a category</DrawerTitle>
//                 <div className="space-y-1">
//                   {categories.map((category: { name: string }) => (
//                     <Button
//                       className="w-full justify-start"
//                       variant="ghost"
//                       key={category.name}
//                       asChild
//                     >
//                       <DrawerClose asChild>
//                         <Link href={`/search?category=${category.name}`}>
//                           {category.name}
//                         </Link>
//                       </DrawerClose>
//                     </Button>
//                   ))}
//                 </div>
//               </DrawerHeader>
//             </DrawerContent>
//           </Drawer>
//           <Link href="/" className="flex-start">
//             <Image
//               src="/assets/icons/logo.svg"
//               width={148}
//               height={148}
//               alt={`${APP_NAME} logo`}
//             />
//             {APP_NAME}
//           </Link>
//         </div>
//         <div className="hidden md:block">
//           <Search />
//         </div>
//         <Menu />
//       </div>
//       <div className="md:hidden block   px-5 pb-2">
//         <Search />
//       </div>
//     </header>
//   )
// }

// export default Header