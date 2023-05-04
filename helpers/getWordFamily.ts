import getRandomWord from '../actions/getRandomWord';
import { WordForm } from '../components/Form';

export default async function getWordFamily() {
   let wordForms: WordForm = {
      word: '',
      word_forms: { v: [], n: [], a: [], r: [] },
   };

   let randomWord = '';

      randomWord = getRandomWord();

      try {
         const response = await fetch(
            `https://apirest.com.ar:8900/random_word_family/${randomWord}`
         );

         wordForms = await response.json();

   
      } catch (error) {
         randomWord = '...';
      }

   return { wordForms, randomWord };
}
