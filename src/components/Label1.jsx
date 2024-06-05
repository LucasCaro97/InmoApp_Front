import React from 'react'

const Label1 = ({children, className}) => {
  const defaultClassName = "font-semibold text-xl lg:text-3xl text-green-900 p-5"
  
  return (
    <div>
      <h1 className={ defaultClassName + ( className ? ` ${className}` : '')}>{children}</h1>
    </div>
  )
}

export default Label1
