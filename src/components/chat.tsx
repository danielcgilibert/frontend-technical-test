import Image from 'next/image'
import styles from './Chat.module.css'

const Chat = ({ conversation, idUser }) => {
  const date = new Date(conversation.lastMessageTimestamp * 1000)
  const month = date.toLocaleString('default', { month: 'long' })
  return (
    <div className={styles.chat}>
      <Image
        src={
          'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
        }
        alt="user placeholder"
        width={50}
        height={50}
      />
      <div>
        <h1>
          {idUser === conversation.senderId
            ? conversation.recipientNickname
            : conversation.senderNickname}
        </h1>
        <span>
          {month} {date.getDate()}
        </span>
      </div>
    </div>
  )
}

export default Chat
