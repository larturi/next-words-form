import React from 'react';
import { IVariant } from '@unleash/nextjs';

interface ButtonProps {
   handleSubmit: () => Promise<void>;
   textButtonSubmit: string;
   isEnabled?: boolean;
   variant?: IVariant;
}

const Button: React.FC<ButtonProps> = ({
   handleSubmit,
   textButtonSubmit,
   isEnabled,
   variant
}) => {
   const getButtonStyle = () => {
      if (isEnabled) {
        if(variant?.name === 'BotonRojo') {
            return 'py-3 rounded-md w-full mt-6 transition text-white bg-purple-600 hover:bg-purple-700';
        }
      }
      return 'py-3 rounded-md w-full mt-6 transition text-white bg-blue-600 hover:bg-blue-700';
   };

   const buttonStyle = getButtonStyle();

   return (
      <button onClick={handleSubmit} className={buttonStyle}>
         {textButtonSubmit}
      </button>
   );
};

export default Button;
