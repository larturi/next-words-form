import Form, { WordForm } from '../components/Form';
import getRandomWord from '../actions/getRandomWord';
import getWordFamily from '../helpers/getWordFamily';

interface Props {
   randomWord: string;
   wordForms: WordForm;
}

const IndexPage = ({ randomWord, wordForms }: Props) => {
   return <Form randomWord={randomWord} wordForms={wordForms} />;
};

export async function getServerSideProps() {
   const { randomWord, wordForms } = await getWordFamily();

   return {
      props: {
         randomWord,
         wordForms,
      },
   };
}

export default IndexPage;
