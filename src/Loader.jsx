import React from 'react'
import loader from './assets/KCEgif.gif'

const Loader = ({display}) => {
  if(display)
      return (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center bg-white'>
            <div className='h-[250px] w-[250px]'>
                <img src={loader} className='h-[100%] w-[100%]'/>
            </div>
        </div>
      )
  else
    return <></>
}

export default Loader