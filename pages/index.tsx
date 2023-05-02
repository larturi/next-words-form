import Form, { WordForm } from '../components/Form';
import getRandomWord from '../actions/getRandomWord';

interface Props {
   randomWord: string;
   wordForms: WordForm;
}

const IndexPage = ({ randomWord, wordForms }: Props) => {
   return <Form randomWord={randomWord} wordForms={wordForms} />;
};

export async function getServerSideProps() {
   const randomWord = getRandomWord();

   const response = await fetch(
      `http://apirest.com.ar:8900/random_word_family/${randomWord}`
   );

   const wordForms: WordForm = await response.json();

   return {
      props: {
         randomWord,
         wordForms,
      },
   };
}

export default IndexPage;
