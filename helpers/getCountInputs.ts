interface WordForms {
   n: string[];
   a: string[];
   v: string[];
   r: string[];
}

export default function getInputFormCount(wordForms: WordForms): number {
   const nonEmptyForms = Object.values(wordForms).filter(
      (form) => form.length > 0
   );
   return nonEmptyForms.length;
}
