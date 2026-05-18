import UserButtonsServer from './user-buttons-server'
import CartButton from './cart-button'

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden w-full max-w-xs gap-1 md:flex">
        <CartButton />
        <UserButtonsServer />
      </nav>
    </div>
  )
}

export default Menu









// import UserButton from './user-buttons'
// import CartButton from './cart-button'

// const Menu = () => {
//   return (
//     <>
//       <div className="flex justify-end gap-3">
//         <nav className="md:flex hidden w-full max-w-xs gap-1">
//           <CartButton />
//           <UserButton />
//         </nav>
//       </div>
//     </>
//   )
// }

// export default Menu