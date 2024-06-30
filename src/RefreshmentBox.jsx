import React from 'react'
import { LuPlusCircle } from "react-icons/lu";
import { useEffect, useState } from 'react';



const RefreshmentBox = ({ proposalDetails, setProposalDetails }) => {


    return (
        <>
            <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">Refreshment Form</h1>
            <div className='p-3 border-[3px] border-solid border-secondBorderColor min-h-[300px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Vendor</h3>
                <div className="oneInputCont">
                    <div className="nameForINput">Vendor<sup className='text-txtRed'>  *Important</sup></div>
                    <div className="formInputBoxCont">
                        :
                        <select className="formInputBox selectOption w-[95%]" tabIndex={3}
                            value={proposalDetails.refreshment.vendor}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, vendor: event.target.value } }) }}
                        >
                            <option>--</option>
                            <option value="MAXX Hospitalities">MAXX Hospitalities</option>
                            <option value="Grace Caterers">Grace Caterers</option>
                            <option value="Chilleta Food">Chilleta Food</option>
                        </select>
                    </div>
                </div>
                <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Morning</h3>
                <div className="oneInputCont">
                    <div className="nameForINput">Tea - Rs. 7 </div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[47%]"
                            type="number"
                            value={proposalDetails.refreshment.forenoonTea}
                            placeholder='Tea Quantity'
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, forenoonTea: event.target.value } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[47%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.forenoonTea * 7}</span> </div>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">Coffee - Rs. 10</div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[47%]"
                            placeholder='Coffee Quantity'
                            type="number"
                            value={proposalDetails.refreshment.forenoonCoffee}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, forenoonCoffee: event.target.value } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[47%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.forenoonCoffee * 10}</span> </div>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">Snacks - Rs. 8</div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[47%]"
                            placeholder='Snacks Quantity'
                            type="number"
                            value={proposalDetails.refreshment.forenoonSnacks}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, forenoonSnacks: event.target.value } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[47%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.forenoonSnacks * 8}</span> </div>
                    </div>
                </div>
                <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Afternoon</h3>
                <div className="oneInputCont">
                    <div className="nameForINput">Lunch VEG Menu</div>
                    <div className="formInputBoxCont">
                        :
                        <select className="formInputBox selectOption w-[95%]" tabIndex={3}
                            value={proposalDetails.refreshment.lunch.vegMenu}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, lunch: { ...proposalDetails.refreshment.lunch, vegMenu: event.target.value } } }) }}
                        >
                            <option>--</option>
                            <option value="menu 1 85">Menu 1 - Rs. 85</option>
                            <option value="menu 2 100">Menu 2 - Rs. 100</option>
                            <option value="menu 3 110">Menu 3 - Rs. 110</option>
                            <option value="menu 4 150">Menu 4 - Rs. 150</option>
                        </select>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">VEG Count</div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[46%]"
                            type="number"
                            value={proposalDetails.refreshment.lunch.vegQnty}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, lunch: { ...proposalDetails.refreshment.lunch, vegQnty: event.target.value } } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[46%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.lunch.vegQnty * proposalDetails.refreshment.lunch.vegMenu.match(/\d+$/)}</span> </div>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">Lunch NON-VEG Menu</div>
                    <div className="formInputBoxCont">
                        :
                        <select className="formInputBox selectOption w-[95%]" tabIndex={3}
                            value={proposalDetails.refreshment.lunch.nonvegMenu}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, lunch: { ...proposalDetails.refreshment.lunch, nonvegMenu: event.target.value } } }) }}
                        >
                            <option>--</option>
                            <option value="menu 1 170">Menu 1 - Rs. 170</option>
                            <option value="menu 2 155">Menu 2 - Rs. 155</option>
                        </select>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">NON-VEG Count</div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[46%]"
                            type="number"
                            value={proposalDetails.refreshment.lunch.nonvegQnty}
                            tabIndex={2}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, lunch: { ...proposalDetails.refreshment.lunch, nonvegQnty: event.target.value } } }) }}
                        />
                        <div
                            className="formInputBox w-[46%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.lunch.nonvegQnty * proposalDetails.refreshment.lunch.nonvegMenu.match(/\d+$/)}</span> </div>
                    </div>
                </div>
                <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Evening</h3>
                <div className="oneInputCont">
                    <div className="nameForINput">Tea - Rs. 7 </div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[47%]"
                            type="number"
                            value={proposalDetails.refreshment.afternoonTea}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, afternoonTea: event.target.value } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[47%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.afternoonTea * 7}</span> </div>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">Coffee - Rs. 10</div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[47%]"
                            type="number"
                            value={proposalDetails.refreshment.afternooncoffee}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, afternooncoffee: event.target.value } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[47%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.afternooncoffee * 10}</span> </div>
                    </div>
                </div>
                <div className="oneInputCont">
                    <div className="nameForINput">Snacks - Rs. 8</div>
                    <div className="formInputBoxCont">
                        :
                        <input
                            className="formInputBox w-[47%]"
                            type="number"
                            value={proposalDetails.refreshment.afternoonSnacks}
                            onChange={(event) => { setProposalDetails({ ...proposalDetails, refreshment: { ...proposalDetails.refreshment, afternoonSnacks: event.target.value } }) }}
                            tabIndex={2}
                        />
                        <div
                            className="formInputBox w-[47%] inline-block text-borderColor"
                        > <span className='text-orange'>{proposalDetails.refreshment.afternoonSnacks * 8}</span> </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RefreshmentBox