'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineReload } from 'react-icons/ai';
import Input from './Input';
import getInputFormCount from '../helpers/getCountInputs';

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

interface FormProps {
   randomWord: string;
   wordForms: WordForm;
}

const Form: React.FC<FormProps> = ({ randomWord, wordForms }) => {
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

   const [inputsOk, setInputsOk] = useState(0);
   const inputFormCount = getInputFormCount(wordForms.word_forms);

   useEffect(() => {
      // Si el servicio no trae palabras hace un reload
      if (inputFormCount < 4) {
         router.refresh();
      }

      setTimeout(() => {
         if (inputFormCount === inputsOk) {
            router.refresh();
         }
      }, 500);

      const inputs = document.querySelectorAll('.bg-green-700');
      let contador = 0;
      inputs.forEach((input) => {
         if (input.tagName === 'INPUT') {
            contador++;
         }
      });
      setInputsOk(contador);

      if (inputFormCount === inputsOk) {
         setTextButtonSubmit('Next');
      } else {
         setTextButtonSubmit('Submit');
      }
   }, [countIntentos, inputFormCount, inputsOk, router, setTextButtonSubmit]);

   const handleSubmit = () => {
      setCountIntentos(countIntentos + 1);

      if (textButtonSubmit === 'Next') {
         setTextButtonSubmit('Submit');
         router.refresh();
      }

      if (wordForms?.word_forms.v.length > 0) {
         if (wordForms.word_forms.v.includes(verb.toLowerCase())) {
            setVerbStateInput('green');
         } else {
            setVerbStateInput('red');
         }

         setVerbResults(wordForms?.word_forms.v.join(', '));
      }

      if (wordForms?.word_forms.n.length > 0) {
         if (wordForms.word_forms.n.includes(noun.toLowerCase())) {
            setNounStateInput('green');
         } else {
            setNounStateInput('red');
         }

         setNounResults(wordForms?.word_forms.n.join(', '));
      }

      if (wordForms?.word_forms.a.length > 0) {
         if (wordForms.word_forms.a.includes(adjective.toLowerCase())) {
            setAdjectiveStateInput('green');
         } else {
            setAdjectiveStateInput('red');
         }

         setAdjectiveResults(wordForms?.word_forms.a.join(', '));
      }

      if (wordForms?.word_forms.r.length > 0) {
         if (wordForms.word_forms.r.includes(adverb.toLowerCase())) {
            setAdverbStateInput('green');
         } else {
            setAdverbStateInput('red');
         }

         setAdverbResults(wordForms?.word_forms.r.join(', '));
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
                    py-12
                    lg:px-12
                    lg:py-12
                    self-center 
                    mt-2 
                    lg:w-2/5
                    rounded-md
                    w-full
                 '
               >
                  <h1 className='text-gray-300 text-xl mb-4 font-light'>
                     Complete the forms of words to:
                  </h1>

                  <div className='flex justify-between'>
                     <h2 className='text-white text-4xl mb-8 font-semibold'>
                        {randomWord}
                     </h2>

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
                  </div>

                  <div className='flex flex-col gap-4'>
                     {wordForms?.word_forms.v.length > 0 && (
                        <>
                           <Input
                              id='verb'
                              type='text'
                              label='Verb'
                              value={verb}
                              onChange={(ev: any) => setVerb(ev.target.value)}
                              bgColor={verbStateInput}
                           />
                           {verbResults !== '' && (
                              <div className='text-sm text-gray-400'>
                                 {verbResults}
                              </div>
                           )}
                        </>
                     )}

                     {wordForms?.word_forms.n.length > 0 && (
                        <>
                           <Input
                              id='noun'
                              type='text'
                              label='Noun'
                              value={noun}
                              onChange={(ev: any) => setNoun(ev.target.value)}
                              bgColor={nounStateInput}
                           />
                           {nounResults !== '' && (
                              <div className='text-sm text-gray-400'>
                                 {nounResults}
                              </div>
                           )}
                        </>
                     )}

                     {wordForms?.word_forms.a.length > 0 && (
                        <>
                           <Input
                              id='adjective'
                              type='text'
                              label='Adjective'
                              value={adjective}
                              onChange={(ev: any) =>
                                 setAdjective(ev.target.value)
                              }
                              bgColor={adjectiveStateInput}
                           />
                           {adjectiveResults !== '' && (
                              <div className='text-sm text-gray-400'>
                                 {adjectiveResults}
                              </div>
                           )}
                        </>
                     )}

                     {wordForms?.word_forms.r.length > 0 && (
                        <>
                           <Input
                              id='adverb'
                              type='text'
                              label='Adverb'
                              value={adverb}
                              onChange={(ev: any) => setAdverb(ev.target.value)}
                              bgColor={adverbStateInput}
                           />
                           {adverbResults !== '' && (
                              <div className='text-sm text-gray-400'>
                                 {adverbResults}
                              </div>
                           )}
                        </>
                     )}
                  </div>
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
               </div>
            </div>
         </div>
      </div>
   );
};

export default Form;
