import React from 'react'

const Message = ({status,message}) => {

    const time = setTimeout(()=>{
        document.getElementById('messageBox').style.display = "none";
    },1000)

    clearTimeout(time);
    

  return (
    <>
        {(status) ?
            <div id='messageBox' className='h-[60px] w-[270px] absolute bg-bgGreen text-txtGreen text-[20px] font-[600] border-l-txtGreen border-l-solid border-l-[7px] z-10 right-6 bottom-6 rounded-[12px] flex justify-center items-center'>
            {message}
            </div> :
            <div id='messageBox' className='h-[60px] w-[270px] absolute bg-bgRed text-txtRed text-[20px] font-[600] border-l-txtRed border-l-solid border-l-[7px] z-10 right-6 bottom-6 rounded-[12px] flex justify-center items-center'>
            {message}
            </div>
        }
    </>
  )
}

export default Message