import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FlagProvider } from '@unleash/nextjs/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FlagProvider>
      <Component {...pageProps} />
    </FlagProvider>
  )
 
}

export default MyApp
