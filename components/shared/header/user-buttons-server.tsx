import { auth } from '@/auth'
import UserButtonsClient from './user-buttons'

export default async function UserButtonsServer() {
  const session = await auth()

  return <UserButtonsClient session={session} />
}