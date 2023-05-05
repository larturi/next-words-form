'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineReload } from 'react-icons/ai';
import Input from './Input';
import getWordFamily from '../helpers/getWordFamily';
import LoaderForm from './LoaderForm';
import Results from './Results';

export interface WordForm {
   word: string;
   word_forms: WordForms;
}

export interface WordForms {
   n: string[];
   a: string[];
   v: string[];
   r: any[];
}

type WordType = 'v' | 'n' | 'a' | 'r';

const Form = () => {
   const router = useRouter();

   const [verb, setVerb] = useState('');
   const [verbResults, setVerbResults] = useState('');
   const [verbStateInput, setVerbStateInput] = useState('');

   const [noun, setNoun] = useState('');
   const [nounResults, setNounResults] = useState('');
   const [nounStateInput, setNounStateInput] = useState('');

   const [adjective, setAdjective] = useState('');
   const [adjectiveResults, setAdjectiveResults] = useState('');
   const [adjectiveStateInput, setAdjectiveStateInput] = useState('');

   const [adverb, setAdverb] = useState('');
   const [adverbResults, setAdverbResults] = useState('');
   const [adverbStateInput, setAdverbStateInput] = useState('');

   const [textButtonSubmit, setTextButtonSubmit] = useState('Submit');
   const [countIntentos, setCountIntentos] = useState(0);
   const [wordFormsOk, setWordFormsOk] = useState<WordForm>();
   const [randomWordOk, setRandomWordOk] = useState('');

   const [isSubmited, setIsSubmited] = useState(false);

   const [countOk, setCountOk] = useState(0);
   const [countError, setCountError] = useState(0);

   async function fetchData() {
      const { randomWord, wordForms } = await getWordFamily();
      setRandomWordOk(randomWord);
      setWordFormsOk(wordForms);
   }

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      if (isSubmited) {
         setTextButtonSubmit('Next');

         const hasError =
         verbStateInput === 'red' ||
         nounStateInput === 'red' ||
         adjectiveStateInput === 'red' ||
         adverbStateInput === 'red';

         if (hasError) {
            setCountError(countError + 1);
         } else {
            setCountOk(countOk + 1);
         }
      } else {
         setTextButtonSubmit('Submit');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isSubmited]);

   const handleSubmit = () => {
      setCountIntentos(countIntentos + 1);

      if (textButtonSubmit === 'Next') {
         setTextButtonSubmit('Submit');
         handleRefresh();
         return;
      }

      validationForm();
   };

   const handleRefresh = () => {
      setWordFormsOk(undefined);
      fetchData();
      resetForm();
   };

   const resetForm = () => {
      setIsSubmited(false);
      setVerb('');
      setVerbResults('');
      setVerbStateInput('');
      setNoun('');
      setNounResults('');
      setNounStateInput('');
      setAdjective('');
      setAdjectiveResults('');
      setAdjectiveStateInput('');
      setAdverb('');
      setAdverbResults('');
      setAdverbStateInput('');
   };

   const validationForm = () => {
      setIsSubmited(true);

      if (wordFormsOk) {
         validateInput(
            'v',
            verb,
            setVerbStateInput,
            setVerbResults,
            wordFormsOk
         );
         validateInput(
            'n',
            noun,
            setNounStateInput,
            setNounResults,
            wordFormsOk
         );
         validateInput(
            'a',
            adjective,
            setAdjectiveStateInput,
            setAdjectiveResults,
            wordFormsOk
         );
         validateInput(
            'r',
            adverb,
            setAdverbStateInput,
            setAdverbResults,
            wordFormsOk
         );
      }
   };

   const validateInput = (
      wordType: WordType,
      word: string,
      setWordStateInput: React.Dispatch<React.SetStateAction<string>>,
      setWordResults: React.Dispatch<React.SetStateAction<string>>,
      wordFormsOk: WordForm
   ): void => {
      if (wordFormsOk?.word_forms[wordType].length > 0) {
         if (wordFormsOk.word_forms[wordType].includes(word.toLowerCase())) {
            setWordStateInput('green');
         } else {
            setWordStateInput('red');
         }
         setWordResults(wordFormsOk.word_forms[wordType].join(', '));
      } else {
         if (word.trim() === '') {
            setWordStateInput('green');
         } else {
            setWordStateInput('red');
         }
      }
   };

   return (
      <div
         className='
            relative 
            h-full 
            w-full 
            bg-no-repeat
            bg-center
            bg-fixed
            bg-cover
            '
      >
         <div
            className='
            bg-black
              w-full
              h-full
              lg:bg-opacity-50
              lg:pt-10
            '
         >
            <div className='flex justify-center'>
               <div
                  className='
                  bg-black 
                    bg-opacity-70 
                    px-6
                    py-8
                    lg:px-12
                    lg:py-12
                    self-center 
                    mt-2 
                    lg:w-2/5
                    rounded-md
                    w-full
                 '
               >
                  <h1
                     className='
                     text-white
                     text-2xl 
                     mb-1 
                     font-light 
                  '
                  >
                     Complete the forms of the word
                  </h1>

                  <h2
                     className='
                     text-gray-500 
                     text-sm 
                     mb-4 
                     font-light
                  '
                  >
                     {`If the word form doesn't exist, leave the input empty`}
                  </h2>

                  <div className='flex justify-between'>
                     <h2 className='text-white text-4xl mb-8 font-semibold'>
                        {wordFormsOk ? randomWordOk : '...'}
                     </h2>

                     {wordFormsOk ? (
                        <button
                           onClick={() => router.refresh()}
                           className='
                                 text-white 
                                 rounded-md 
                                 hover:text-gray-500 
                                 transition
                                 mb-5
                              '
                        >
                           <AiOutlineReload size={33} />
                        </button>
                     ) : (
                        <div>
                           <LoaderForm />
                        </div>
                     )}
                  </div>

                  <>
                     <div className='flex flex-col gap-4'>
                        <Input
                           id='verb'
                           type='text'
                           label='Verb'
                           value={verb}
                           onChange={(ev: any) => setVerb(ev.target.value)}
                           bgColor={verbStateInput}
                        />
                        {isSubmited && (
                           <div className='text-sm ml-1 -mt-3 text-gray-300'>
                              {verbResults !== ''
                                 ? verbResults
                                 : `${randomWordOk} do not have verb forms`}
                           </div>
                        )}

                        <Input
                           id='noun'
                           type='text'
                           label='Noun'
                           value={noun}
                           onChange={(ev: any) => setNoun(ev.target.value)}
                           bgColor={nounStateInput}
                        />
                        {isSubmited && (
                           <div className='text-sm ml-1 -mt-3 text-gray-300'>
                              {nounResults !== ''
                                 ? nounResults
                                 : `${randomWordOk} do not have noun forms`}
                           </div>
                        )}

                        <Input
                           id='adjective'
                           type='text'
                           label='Adjective'
                           value={adjective}
                           onChange={(ev: any) => setAdjective(ev.target.value)}
                           bgColor={adjectiveStateInput}
                        />
                        {isSubmited && (
                           <div className='text-sm ml-1 -mt-3 text-gray-300'>
                              {adjectiveResults !== ''
                                 ? adjectiveResults
                                 : `${randomWordOk} do not have adjective forms`}
                           </div>
                        )}

                        <Input
                           id='adverb'
                           type='text'
                           label='Adverb'
                           value={adverb}
                           onChange={(ev: any) => setAdverb(ev.target.value)}
                           bgColor={adverbStateInput}
                        />
                        {isSubmited && (
                           <div className='text-sm ml-1 -mt-3 text-gray-300'>
                              {adverbResults !== ''
                                 ? adverbResults
                                 : `${randomWordOk} do not have adverbial forms`}
                           </div>
                        )}
                     </div>
                  </>

                  <button
                     onClick={handleSubmit}
                     className='
                    bg-blue-600 
                      py-3 
                      text-white 
                      rounded-md 
                      w-full 
                      mt-6
                    hover:bg-blue-700 
                      transition
                   '
                  >
                     {textButtonSubmit}
                  </button>

                  <Results countOk={countOk} countError={countError} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Form;
