import axios from 'axios';
import { URL_SERVICE_TRANSLATE_WORD } from '../constants/constants';

export function useGetTranslateWord() {

   async function getTranslateWord(word: string) {

      try {
         const response = await axios.get(URL_SERVICE_TRANSLATE_WORD, {
           params: {
             word: word,
           },
         });
         return response.data;
       } catch (error) {
         console.error(error);
         return {error: true}
       }

   }

   return { getTranslateWord };
}
