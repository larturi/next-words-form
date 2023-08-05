import React from 'react';

interface ButtonProps {
   handleSubmit: () => Promise<void>;
   textButtonSubmit: string;
   variantIsEnabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   handleSubmit,
   textButtonSubmit,
   variantIsEnabled,
}) => {
   const getButtonStyle = () => {
      if (!variantIsEnabled) {
         return 'py-3 rounded-md w-full mt-6 transition text-white bg-blue-600 hover:bg-blue-700';
      } else {
         return 'py-3 rounded-md w-full mt-6 transition text-white bg-purple-600 hover:bg-purple-700';
      }
   };

   const buttonStyle = getButtonStyle();

   return (
      <button onClick={handleSubmit} className={buttonStyle}>
         {textButtonSubmit}
      </button>
   );
};

export default Button;
