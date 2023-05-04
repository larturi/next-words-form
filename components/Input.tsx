import React from 'react';

interface InputProps {
   id: string;
   onChange: any;
   value: string;
   label: string;
   type?: string;
   bgColor?: string;
}

const Input: React.FC<InputProps> = ({
   id,
   onChange,
   value,
   label,
   type,
   bgColor,
}) => {
   const getBgColor = (): string => {
      if (bgColor === 'green') {
         return 'bg-green-700';
      } else if (bgColor === 'red') {
         return 'bg-red-700';
      } else {
         return 'bg-neutral-700';
      }
   };

   const getLabelColor = (): string => {
      if (bgColor === 'green') {
         return 'text-gray-100';
      } else if (bgColor === 'red') {
         return 'text-gray-100';
      } else {
         return 'text-gray-300';
      }
   };

   return (
      <div className='relative'>
         <input
            onChange={onChange}
            value={value}
            type={type}
            id={id}
            className={`
               block
               rounded-md
               px-6
               pt-6
               pb-1
               w-full
               text-md
              ${getBgColor()}
               appearance-none
               focus:outline-none
               focus:ring-0
               peer
               invalid:border-b-1
            `}
            placeholder=' '
         />
         <label
            htmlFor={id}
            className={`
               absolute 
               text-md
               ${getLabelColor()}
               duration-150 
               transform 
               -translate-y-3 
               scale-75 
               top-4 
               z-10 
               origin-[0] 
               left-6
               peer-placeholder-shown:scale-100 
               peer-placeholder-shown:translate-y-0 
               peer-focus:scale-75
               peer-focus:-translate-y-3
            `}
         >
            {label}
         </label>
      </div>
   );
};

export default Input;
