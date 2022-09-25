import '../styles/globals.css'
import { SessionProvider } from  'next-auth/react'

// The Component prop is the page view that will be rendered. 
// The pageProps prop is the props that each page will receive when rendered.

function MyApp ({ Component, pageProps: { session, ...pageProps },}) {

  return( 
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp