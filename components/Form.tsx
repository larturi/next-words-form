/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IVariant } from '@unleash/nextjs';
import ReactGA from 'react-ga';

import { AiOutlineReload } from 'react-icons/ai';
import Input from './Input';
import LoaderForm from './LoaderForm';
import Results from './Results';
import { useGetWordForm } from '../hooks/useGetWordForms';
import { useGetTranslateWord } from '../hooks/useGetTranslateWord';
import { WordForm, WordType } from '../types/word-form-types';
import Button from './Button';

interface FormProps {
   isEnabled: boolean
   variant: IVariant
}

const Form: React.FC<FormProps> = ({ isEnabled, variant }) => {

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
   const [wordFormsValue, setWordFormsValue] = useState<WordForm>();
   const [randomWordValue, setRandomWordValue] = useState('');
   const [translatedWord, setTranslatedWord] = useState('');

   const [isSubmited, setIsSubmited] = useState(false);

   const [countOk, setCountOk] = useState(0);
   const [countError, setCountError] = useState(0);
   const [errorService, setErrorService] = useState(false);

   const { getWordForms } = useGetWordForm();
   const { getTranslateWord } = useGetTranslateWord();

   async function fetchData() {
      const { randomWord, wordForms, errorExists } = await getWordForms();
      setRandomWordValue(randomWord);
      setWordFormsValue(wordForms);
      setErrorService(errorExists);
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
            ReactGA.event({
               category: 'Social',
               action: 'Win',
               value: 1
            });
         }
      } else {
         setTextButtonSubmit('Submit');
      }
   }, [isSubmited]);

   const handleSubmit = async () => {
      setCountIntentos(countIntentos + 1);

      // Analytics Color Button - Test AB Unleash
      ReactGA.event({
         category: 'Boton', 
         action: 'Click',
         label: variant?.name === 'BotonRojo' ? 'boton-purple' : 'boton-blue',
      });

      const translate = await getTranslateWord(randomWordValue);
      setTranslatedWord(translate.translation);

      if (textButtonSubmit === 'Next') {
         setTextButtonSubmit('Submit');
         handleRefresh();
         return;
      }

      validationForm();
   };

   const handleRefresh = () => {
      setWordFormsValue(undefined);
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
      setTranslatedWord('');
   };

   const validationForm = () => {
      setIsSubmited(true);

      if (wordFormsValue) {
         validateInput(
            'v',
            verb,
            setVerbStateInput,
            setVerbResults,
            wordFormsValue
         );
         validateInput(
            'n',
            noun,
            setNounStateInput,
            setNounResults,
            wordFormsValue
         );
         validateInput(
            'a',
            adjective,
            setAdjectiveStateInput,
            setAdjectiveResults,
            wordFormsValue
         );
         validateInput(
            'r',
            adverb,
            setAdverbStateInput,
            setAdverbResults,
            wordFormsValue
         );
      }
   };

   const validateInput = (
      wordType: WordType,
      word: string,
      setWordStateInput: React.Dispatch<React.SetStateAction<string>>,
      setWordResults: React.Dispatch<React.SetStateAction<string>>,
      wordFormsValue: WordForm
   ): void => {
      if (wordFormsValue?.word_forms[wordType].length > 0) {
         if (
            wordFormsValue.word_forms[wordType].includes(word.toLowerCase().trim())
         ) {
            setWordStateInput('green');
         } else {
            setWordStateInput('red');
         }
         setWordResults(wordFormsValue.word_forms[wordType].join(', '));
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
                    py-5
                    lg:px-12
                    lg:py-8
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
                     text-xl 
                     md:text-2xl 
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

                  <hr className='h-px mb-6 bg-gray-500 border-0 w-11/12' />

                  <div className='flex justify-between'>
                     <div>
                        <h2 className='text-white text-4xl font-semibold'>
                           {wordFormsValue && !errorService ? (
                              randomWordValue
                           ) : errorService ? (
                              <>
                                 <p className='text-red-400 text-sm lg:pr-20'>
                                    We are experiencing issues with our word
                                    service. Please try again later.
                                 </p>
                              </>
                           ) : (
                              '...'
                           )}
                        </h2>

                        <span
                           className='
                              text-gray-400 mt-3 italic
                           '
                        >
                           { translatedWord }
                        </span>
                     </div>

                     {wordFormsValue ? (
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
                     <div className='flex flex-col gap-4 mt-4'>
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
                                 : `${randomWordValue} do not have verb forms`}
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
                                 : `${randomWordValue} do not have noun forms`}
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
                                 : `${randomWordValue} do not have adjective forms`}
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
                                 : `${randomWordValue} do not have adverbial forms`}
                           </div>
                        )}
                     </div>
                  </>

                  <Button 
                     textButtonSubmit={textButtonSubmit} 
                     handleSubmit={handleSubmit}
                     isEnabled={isEnabled}
                     variant={variant}
                  />

                  <Results countOk={countOk} countError={countError} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Form;
