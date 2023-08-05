import React from 'react';

interface ButtonProps {
   handleSubmit: () => Promise<void>;
   textButtonSubmit: string;
   variant?: 'Original' | 'Variante';
}

const Button: React.FC<ButtonProps> = ({ 
    handleSubmit, 
    textButtonSubmit,
    variant
}) => {

    const getButtonStyle = () => {
        switch (variant) {
            case 'Original':
                return 'py-3 rounded-md w-full mt-6 transition text-white bg-blue-600 hover:bg-blue-700';
            case 'Variante':
                return 'py-3 rounded-md w-full mt-6 transition text-white bg-purple-600 hover:bg-purple-700';
            default:
                return 'py-3 rounded-md w-full mt-6 transition text-white bg-blue-600 hover:bg-blue-700';
        }
    };

    const buttonStyle = getButtonStyle();

    return (
      <button
         onClick={handleSubmit}
         className={buttonStyle}
      >
         {textButtonSubmit}
      </button>
    );
};

export default Button;
