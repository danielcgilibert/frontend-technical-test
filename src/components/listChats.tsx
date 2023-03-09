import Link from 'next/link'
import { Conversation } from '../types/conversation'
import { User } from '../types/user'
import Chat from './chat'
import styles from './ListChats.module.css'

interface listChatsProps {
  userMessages: Conversation[]
  userData: User
}
const ListChats = ({ userMessages, userData }: listChatsProps) => {
  return (
    <div className={styles.wrapper}>
      {userMessages.map(conversation => (
        <Link href={`chat/${conversation.id}`} key={conversation.id}>
          <Chat conversation={conversation} idUser={userData.id} />
        </Link>
      ))}
    </div>
  )
}
export default ListChats
