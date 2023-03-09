import Head from 'next/head'
import { ReactElement } from 'react'
import ListChats from '../components/listChats'
import { getLoggedUserId } from '../utils/getLoggedUserId'

export async function getServerSideProps() {
  try {
    const user = getLoggedUserId()
    const res = await fetch(`http://127.0.0.1:3005/conversations/${user}`)
    const userRes = await fetch(`http://127.0.0.1:3005/user/${user}`)

    const [userData] = await userRes.json()
    const userMessages = await res.json()
    return {
      props: { userData, userMessages },
    }
  } catch (error) {
    console.error(error)
    return {
      props: { users: null },
    }
  }
}

const Home = ({ userData, userMessages }): ReactElement => {
  return (
    <div>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main>
        <h1>usuario {userData.nickname}</h1>
        <ListChats userMessages={userMessages} userData={userData} />
      </main>
    </div>
  )
}

export default Home
