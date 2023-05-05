import Head from 'next/head';
import Form from '../components/Form';

const IndexPage = () => {
   return (
      <>
         <Head>
            <title>Word Forms Practice!</title>
         </Head>
         <Form />
      </>
   );
};

export async function getServerSideProps() {
   return {
      props: {},
   };
}

export default IndexPage;
