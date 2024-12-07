import React from 'react'

interface ButtonProps {
  handleSubmit: () => Promise<void>
  textButtonSubmit: string
  isEnabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ handleSubmit, textButtonSubmit, isEnabled }) => {
  const getButtonStyle = () => {
    return 'py-3 rounded-md w-full mt-6 transition text-white bg-blue-600 hover:bg-blue-700'
  }

  const buttonStyle = getButtonStyle()

  return (
    <button onClick={handleSubmit} className={buttonStyle}>
      {textButtonSubmit}
    </button>
  )
}

export default Button
