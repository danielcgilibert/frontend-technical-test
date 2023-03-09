import { Message } from '../types/message'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import styles from './Message.module.css'
interface messageProps {
  message: Message
}

const Message = ({ message }: messageProps) => {
  const isMyMessage = message.authorId === getLoggedUserId()

  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.message} ${
          isMyMessage ? styles.messageSend : styles.messageReceived
        }`}>
        {message.body}
      </p>
    </div>
  )
}

export default Message
