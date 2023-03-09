import Head from 'next/head'
import Message from '../../components/message'
import { Conversation } from '../../types/conversation'
import { getLoggedUserId } from '../../utils/getLoggedUserId'

interface chatPageProps {
  messages: Message[]
  conversation: Conversation
  userId: number
}

const ChatPage = ({ messages, userId, conversation }: chatPageProps) => {
  return (
    <div>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main>
        <div>
          <h2>
            {userId === conversation.senderId
              ? conversation.recipientNickname
              : conversation.senderNickname}
            - You
          </h2>
        </div>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </main>
    </div>
  )
}

export default ChatPage

export async function getServerSideProps({ params }) {
  const userId = getLoggedUserId()
  const messagesData = await fetch(
    `http://127.0.0.1:3005/messages/${params.id}`
  )
  const conversationData = await fetch(
    `http://127.0.0.1:3005/conversations/${userId}`
  )

  const messages: Message = await messagesData.json()
  const conversations: Conversation[] = await conversationData.json()
  const [conversation] = conversations.filter(
    conversation => conversation.id === Number(params.id)
  )

  return {
    props: { messages, conversation, userId }, // will be passed to the page component as props
  }
}
