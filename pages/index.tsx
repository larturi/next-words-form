/* eslint-disable @next/next/next-script-for-ga */
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import ReactGA from 'react-ga';
import {
   flagsClient,
   getDefinitions,
   evaluateFlags,
   getFrontendFlags,
   type IVariant,
 } from '@unleash/nextjs';

 import Form from '../components/Form';
 
 type Data = {
   isEnabled: boolean;
   variant: IVariant;
 };

const IndexPage: NextPage<Data> = ({ isEnabled, variant }) => {

   ReactGA.initialize('G-HTTRFS4PJG');

   return (
      <>
         <Head>
            <title>Word Forms Practice!</title>
         </Head>

         <Form 
            isEnabled={isEnabled}
            variant={variant}
         />
      </>
   );
};

export async function getServerSideProps() {
   /* Using server-side SDK: */
   const definitions = await getDefinitions();
   const context = {}; // optional, see https://docs.getunleash.io/reference/unleash-context
   const { toggles } = evaluateFlags(definitions, context);
 
   /* Or with the proxy/front-end API */
   // const { toggles } = await getFrontendFlags({ context });
 
   const flags = flagsClient(toggles);

   const variant = flags.getVariant("prueba2");

   const payload = {
      name: variant.name,
      payload: null,
      enabled: variant.enabled
   }

   return {
     props: {
       isEnabled: flags.isEnabled("prueba2"),
       variant: payload,
     },
   };
}

export default IndexPage;
