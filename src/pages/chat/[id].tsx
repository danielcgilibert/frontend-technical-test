import Head from 'next/head'
import { useEffect, useState } from 'react'
import Message from '../../components/message'
import styles from '../../styles/ChatPage.module.css'
import { Conversation } from '../../types/conversation'
import { getLoggedUserId } from '../../utils/getLoggedUserId'

interface chatPageProps {
  messages: Message[]
  conversation: Conversation
  userId: number
}

const ChatPage = ({
  messages: messagesServer,
  userId,
  conversation,
}: chatPageProps) => {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState(messagesServer)

  const getMessages = async () => {
    const messagesData = await fetch(
      `http://127.0.0.1:3005/messages/${conversation.id}`
    )
    const newMessages: Message[] = await messagesData.json()

    setMessages(newMessages)
    await new Promise(resolve => setTimeout(resolve, 5000))

    await getMessages()
  }

  useEffect(() => {
    getMessages()
  }, [])

  const postMessage = async () => {
    fetch(`http://127.0.0.1:3005/messages/${conversation.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId: conversation.id,
        body: chatInput,
        authorId: userId,
        timestamp: Date.now(),
      }),
    })
  }

  const handleSubmitMessage = e => {
    e.preventDefault()
    postMessage()
    setChatInput('')
  }

  return (
    <div className={styles.wrapper}>
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

        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            name="chatInput"
            value={chatInput}
            placeholder="Type here..."
            onChange={e => setChatInput(e.target.value)}
          />
        </form>
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
    props: { messages, conversation, userId },
  }
}
