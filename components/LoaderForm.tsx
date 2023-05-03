'use client';

import { PuffLoader } from 'react-spinners';

const LoaderForm = () => {
   return (
      <div
         className='
                flex 
                flex-col 
                justify-center 
                items-center 
                
    '
      >
         <PuffLoader size={40} color='#1C4ED8' />
      </div>
   );
};

export default LoaderForm;
