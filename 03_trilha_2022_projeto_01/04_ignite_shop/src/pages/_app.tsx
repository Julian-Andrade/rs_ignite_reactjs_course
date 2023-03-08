import type { AppProps } from 'next/app'
import logoImg from '../assets/logo.svg'
import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'

import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href='/'>
          <img src={logoImg.src} alt='' />
        </Link>
      </Header>

      <Component {...pageProps} />
      <ToastContainer autoClose={1500} />
    </Container>
  )
}
