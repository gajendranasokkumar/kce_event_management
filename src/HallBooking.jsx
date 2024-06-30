import React from 'react'
import { LuPlusCircle } from "react-icons/lu";
import { useEffect, useState } from 'react';



const HallBooking = ({ proposalDetails, setProposalDetails }) => {

    let halls = [[],
    ['Lal Bahadur Shastri Hall (LBS) - C Block', 'Mr.R.Naveen Raj R (AP-ME)', '+91 8056942460'],
    ['Karpagam Innovation Centre (KIC) - E Block', 'Mr.R.Naveen Raj R (AP-ME)', '+91 8056942460'],
    ['Mahatma Gandhi Hall (MG) - B Block', 'Dr.Vanithamani Director SoMS', '+91 9944574966'],
    ['ECE Seminar Hall - E Block', 'Ms.A.Vasumathi (AP-EC)', '+91 9976525673'],
    ['Auditorium', 'Mr.M.Raja Admin Manager', '+91 9791997263'],
    ['Dr. Radhakrishnan Hall - D Block', 'Dr.Vijaya Kumar (ASP-CT)', '+91 9566332636']];

    return (
        <>
            <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">Hall Booking Form</h1>
            <div className='p-3 border-[3px] border-solid border-secondBorderColor min-h-[350px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                <div className='flex flex-col items-center '>
                    <p className='text-center underline text-txtRed text-lg'>Instructions</p>
                    <ol className='pl-16 mb-5 text-[15px] font-[600]'>
                        <li>1. Should not paste/fix the flex in the stage's background.</li>
                        <li>2. Can use the stage table front to fix the flex (3'x2') in LBS.</li>
                        <li>3. All the materials used for the event from the department should be taken back.</li>
                        <li>4. Kindly hand over the hall key to the Hall In-Charge soon after the event.</li>
                        <li>5. The Coordinator shall ensure all the fan, light, A/C and Audio Video equipment are switched OFF before leaving the hall.</li>
                        <li>6. Audio and Video Equipment operations to be taken care of by respective departments with trained technicians.</li>
                        <li>7. Facility to be maintained in Spick and Span</li>
                    </ol>
                </div>
                <div className="involvedStffCont">
                    <table className="staffTable">
                        <tbody>
                            <tr className="firstRow">
                                <td className="">Name Of Faculty</td>
                                <td className="">In-Charge</td>
                                <td className="">Contact</td>
                            </tr>
                            <tr className='bg-white'>
                                <td>{proposalDetails.hallbooking.hall}</td>
                                <td>{proposalDetails.hallbooking.name}</td>
                                <td>{proposalDetails.hallbooking.contact}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="staffInfoInputCont">
                    <div className="oneInputCont">
                        <div className="nameForINput flex justify-end items-center">Select Hall :</div>
                        <select className="formInputBox selectOption w-[50%]" tabIndex={3}
                            onChange={(event) => {
                                setProposalDetails({
                                    ...proposalDetails,
                                    hallbooking: {
                                        hall: halls[event.target.value][0],
                                        name: halls[event.target.value][1],
                                        contact: halls[event.target.value][2]
                                    }
                                }); console.log(proposalDetails)
                            }}
                        >
                            <option>--</option>
                            <option value="1">Lal Bahadur Shastri Hall (LBS) - C Block</option>
                            <option value="2">Karpagam Innovation Centre (KIC) - E Block</option>
                            <option value="3">Mahatma Gandhi Hall (MG) - B Block</option>
                            <option value="4">ECE Seminar Hall - E Block</option>
                            <option value="5">Auditorium</option>
                            <option value="6">Dr. Radhakrishnan Hall - D Block</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HallBooking