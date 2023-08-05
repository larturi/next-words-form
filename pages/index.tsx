/* eslint-disable @next/next/next-script-for-ga */
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Form from '../components/Form';
import {
   flagsClient,
   getDefinitions,
   evaluateFlags,
   getFrontendFlags,
   type IVariant,
 } from '@unleash/nextjs';
 
 type Data = {
   isEnabled: boolean;
   variant: IVariant;
 };

const IndexPage: NextPage<Data> = ({ isEnabled, variant }) => {
   return (
      <>
         <Head>
            <title>Word Forms Practice!</title>

            {/* Google Analytics Measurement ID*/}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-HTTRFS4PJG"></script>
            <script
               dangerouslySetInnerHTML={{
               __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-HTTRFS4PJG');
               `,
               }}
            />
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
