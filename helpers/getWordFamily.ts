import getRandomWord from '../actions/getRandomWord';
import { WordForm } from '../components/Form';

export default async function getWordFamily() {
   let existsNullArrays = true;
   let wordForms: WordForm = {
      word: '',
      word_forms: { v: [], n: [], a: [], r: [] },
   };

   let randomWord = '';

   // The random word must have verb, noun, adjective and adverb
   while (existsNullArrays) {
      randomWord = getRandomWord();
      const response = await fetch(
         `http://apirest.com.ar:8900/random_word_family/${randomWord}`
      );

      wordForms = await response.json();

      const countVerbs = wordForms.word_forms.v.length;
      const countNouns = wordForms.word_forms.n.length;
      const countAdjective = wordForms.word_forms.a.length;
      const countAdverb = wordForms.word_forms.r.length;

      // Check if any array have not elements
      existsNullArrays =
         countVerbs === 0 ||
         countNouns === 0 ||
         countAdjective === 0 ||
         countAdverb === 0;
   }

   return { wordForms, randomWord };
}
