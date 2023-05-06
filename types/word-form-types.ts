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
 
export type WordType = 'v' | 'n' | 'a' | 'r';