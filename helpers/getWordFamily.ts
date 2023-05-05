import { WordForm } from '../components/Form';
import { 
   URL_SERVICE_WORD_FAMILY, 
   WORD_FAMILY_NON_EMPTY_ARRAYS 
} from '../constants/constants';
import getRandomWord from './getRandomWord';

export default async function getWordFamily() {
   let countNonEmpty = 0;
   let wordForms: WordForm = {
      word: '',
      word_forms: { v: [], n: [], a: [], r: [] },
   };

   let randomWord = '';
   let errorExists = false;

   // The random word must to have at least two non-empty arrays
   while (countNonEmpty < WORD_FAMILY_NON_EMPTY_ARRAYS && !errorExists) {
      randomWord = getRandomWord();

      try {
         const response = await fetch(
            `${URL_SERVICE_WORD_FAMILY}/random_word_family/${randomWord}`
         );

         console.log(response.status);

         wordForms = await response.json();

         const countVerbs = wordForms.word_forms.v.length;
         const countNouns = wordForms.word_forms.n.length;
         const countAdjective = wordForms.word_forms.a.length;
         const countAdverb = wordForms.word_forms.r.length;

         // Check if any array have not elements
         countNonEmpty = [countVerbs, countNouns, countAdjective, countAdverb].reduce(
            (accumulator, currentValue) => {
              return accumulator + (currentValue > 0 ? 1 : 0);
            },
            0
          );
      } catch (error) {
         randomWord = '...';
         countNonEmpty = 0;
         errorExists = true;
         console.log(error);
      }
   }

   return { wordForms, randomWord, errorExists };
}