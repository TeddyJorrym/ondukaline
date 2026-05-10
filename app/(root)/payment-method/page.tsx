import { APP_NAME } from '@/lib/constants'
import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.actions'
import PaymentMethodForm from './payment-method-form'

export const metadata = {
  title: `Payment Method - ${APP_NAME}`,
}

export default async function PaymentMethodPage() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const user = await getUserById(session.user.id)

  return (
    <PaymentMethodForm
      preferredPaymentMethod={user.paymentMethod}
    />
  )
}





// import { APP_NAME } from '@/lib/constants'
// import { auth } from '@/auth'
// import { getUserById } from '@/lib/actions/user.actions'
// import PaymentMethodForm from './payment-method-form'

// export const metadata = {
//   title: `Payment Method - ${APP_NAME}`,
// }

// export default async function PaymentMethodPage() {
//   const session = await auth()
//   const user = await getUserById(session?.user.id!)
//   return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
// }