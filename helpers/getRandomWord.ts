import randomWords from 'random-words';

export default function getRandomWord() {
   const randomWord = randomWords(12)[0];
   return randomWord;
}
