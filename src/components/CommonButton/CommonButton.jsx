import React from 'react'

const CommonButton = ({commonbuttoncontent,commonbuttonclick,commonclick}) => {
  return (
    <>
      <button onClick={commonbuttonclick}  className='py-1 px-10 rounded bg-brandcolor text-white active:scale-[1.2]'>{commonbuttoncontent}</button>
    </>
  )
}

export default CommonButton