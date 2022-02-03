import Head from 'next/head'
import Clock from "../components/Clock"

export default function Home() {
  return (
    <>
      <Head>
        <title>Promodoro Clock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
      </Head>

      <Clock />
    </>
  )
}
