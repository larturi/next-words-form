/* eslint-disable @next/next/next-script-for-ga */
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import ReactGA from 'react-ga'

import Form from '../components/Form'

type Data = {
  isEnabled: boolean
}

const IndexPage: NextPage<Data> = ({ isEnabled }) => {
  ReactGA.initialize('G-HTTRFS4PJG')

  return (
    <>
      <Head>
        <title>Word Forms Practice!</title>
      </Head>

      <Form isEnabled={isEnabled} />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default IndexPage
