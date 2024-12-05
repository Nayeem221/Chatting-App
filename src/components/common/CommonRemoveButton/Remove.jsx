import React from 'react'

const Remove = ({RemoveButtonContent,REmoveButtonClick}) => {
  return (
    <>
      <button onClick={REmoveButtonClick} className='py-2 px-5 rounded active:scale-[1.2] bg-red-500 text-white text-lg font-semibold '>{RemoveButtonContent}</button>
    </>
  )
}

export default Remove
