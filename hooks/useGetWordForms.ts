import randomWords from 'random-words';
import { URL_SERVICE_WORD_FAMILY, WORD_FAMILY_NON_EMPTY_ARRAYS } from '../constants/constants';
import { WordForm } from '../types/word-form-types';

export function useGetWordForm() {

   async function getWordForms() {
      let countNonEmpty = 0;
      let errorExists = false;
      let randomWord = '';

      let wordForms: WordForm = {
         word: '',
         word_forms: { v: [], n: [], a: [], r: [] },
      };

      while (countNonEmpty < WORD_FAMILY_NON_EMPTY_ARRAYS && !errorExists) {
         randomWord = randomWords(12)[0];

         try {
            const response = await fetch(
               `${URL_SERVICE_WORD_FAMILY}/random_word_family/${randomWord}`
            );

            wordForms = await response.json();

            const countVerbs = wordForms.word_forms.v.length;
            const countNouns = wordForms.word_forms.n.length;
            const countAdjective = wordForms.word_forms.a.length;
            const countAdverb = wordForms.word_forms.r.length;

            // Check if any array have not elements
            countNonEmpty = [
               countVerbs,
               countNouns,
               countAdjective,
               countAdverb,
            ].reduce((accumulator, currentValue) => {
               return accumulator + (currentValue > 0 ? 1 : 0);
            }, 0);
         } catch (error) {
            randomWord = '...';
            countNonEmpty = 0;
            errorExists = true;
            console.log(error);
         }

      }

      return { randomWord, wordForms, errorExists };
   }

   return { getWordForms };
}
