import Form from '../components/Form';

const IndexPage = () => {
   return <Form />;
};

export async function getServerSideProps() {
   return {
      props: {},
   };
}

export default IndexPage;
