import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios, { all } from 'axios';
import NavBar from './NavBar';
import { FaArrowLeft } from "react-icons/fa6";
import Message from './Message';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';





const UserProposalView = () => {
    const { oneproposal } = useParams();
    const [onePro, setOnePro] = useState({});
    const navigate = useNavigate();
    const [oneProEdit, setOneProEdit] = useState({ ...onePro });



    useEffect(() => {
        console.log("inside comming")
        const getProposalById = async () => {
            try {
                const receivedObject = await axios.get(`http://localhost:3001/proposalview/${oneproposal}`);
                console.log("Came")
                console.log(receivedObject.data)
                setOnePro(receivedObject.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProposalById();
    }, [oneproposal])


    
    useEffect(() => {
        const deptItemContainer = document.getElementById('deptItemContainer');
        deptItemContainer.innerHTML = "";
        for (let index = 0; index < oneProEdit.dept.length; index++) {

            const element = document.createElement('p');
            element.classList.add('onedept', 'px-2');
            const textNode = document.createTextNode(oneProEdit.dept[index].toUpperCase());
            element.appendChild(textNode);


            const btn = document.createElement('button');
            btn.classList.add('deleteButton');
            btn.innerText = "✕";
            btn.onclick = (event) => handleDeleteDep(index, event);
            element.appendChild(btn);
            deptItemContainer.appendChild(element);
        }
    }, [oneProEdit.dept]);

    const handleDeleteDep = (index, event) => {
        event.preventDefault();
        const newArr = [...oneProEdit.dept];
        newArr.splice(index, 1);
        setOneProEdit((oneProEdit) => ({ ...oneProEdit, dept: [...newArr] }))
    }


    /**Associate dept */


    useEffect(() => {
        const deptItemContainer = document.getElementById('assoDeptItemContainer');
        deptItemContainer.innerHTML = "";
        for (let index = 0; index < oneProEdit.assoDept.length; index++) {

            const element = document.createElement('p');
            element.classList.add('onedept', 'px-2');
            const textNode = document.createTextNode(oneProEdit.assoDept[index].toUpperCase());
            element.appendChild(textNode);


            const btn = document.createElement('button');
            btn.classList.add('deleteButton');
            btn.innerText = "✕";
            btn.onclick = (event) => handleAssoDeleteDep(index, event);
            element.appendChild(btn);
            deptItemContainer.appendChild(element);
        }
    }, [oneProEdit.assoDept]);

    const handleAssoDeleteDep = (index, event) => {
        event.preventDefault();
        const newArr = [...oneProEdit.assoDept];
        newArr.splice(index, 1);
        setOneProEdit((oneProEdit) => ({ ...oneProEdit, assoDept: [...newArr] }))
    }



    if (Object.keys(onePro).length === 0) {
        return <div>div</div>
    }


    // if(onePro.hodapproval !== "approved"){
    //     const approveBtn = document.getElementById('approveBtn');
    //     const denyBtn = document.getElementById('denyBtn');

    //     approveBtn.style.opacity = "0.5"
    //     approveBtn.setAttribute("disabled" , "")
    //     approveBtn.style.cursor = "not-allowed";

    //     denyBtn.style.opacity = "0.5"
    //     denyBtn.setAttribute("disabled" , "")
    //     denyBtn.style.cursor = "not-allowed";

    // }

    

    let [hours, minutes] = onePro.time.start.split(':');
    let amPmHours = hours % 12 || 12;
    let amPm = hours >= 12 ? 'PM' : 'AM';
    let amPmTime = amPmHours + ':' + minutes + ' ' + amPm;

    let [hours2, minutes2] = onePro.time.end.split(':');
    let amPmHours2 = hours2 % 12 || 12;
    let amPm2 = hours2 >= 12 ? 'PM' : 'AM';
    let amPmTime2 = amPmHours2 + ':' + minutes2 + ' ' + amPm2;







    const editTheProposal = () => {
        let allInput = document.querySelectorAll('input');
        let allSelect = document.querySelectorAll('select');
        console.log(allInput)
        for (let index = 0; index < allInput.length; index++) {
            allInput[index].removeAttribute("readOnly", "");
        }
        for (let index = 0; index < allSelect.length; index++) {
            allSelect[index].removeAttribute("readOnly", "");
        }
    }

    // const autoReadOnly = () => {
    //     let allInput = document.querySelectorAll('input');
    //     let allSelect = document.querySelectorAll('select');
    //     console.log(allInput)
    //     for (let index = 0; index < allInput.length; index++) {
    //         allInput[index].setAttribute("readOnly" , "");
    //     }
    //     for (let index = 0; index < allSelect.length; index++) {
    //         allSelect[index].setAttribute("readOnly" , "");
    //     }
    // }

    // autoReadOnly();




    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/updateProposal", {
            ...onePro, ...oneProEdit
        })
            .then((result) => {
                const root = createRoot(document.getElementById('mainSingle'));
                root.render(<Message message={"Proposal Updated"} status={true} />);
                setTimeout(() => { navigate(`/pastproposals/${sumData.author}`) }, 800);
                console.log(result)
            }).catch((err) => {
                const root = createRoot(document.getElementById('mainSingle'));
                root.render(<Message message={"Cannot Update"} status={false} />);
                setTimeout(() => { navigate("/proposalmain") }, 800);
                console.log(err)
            });
    }




    return (
        <>
            <div>
                <NavBar name={onePro.author.toUpperCase()} />
                {/* <div>Proposal Id : {id}</div> */}
                <div id='mainSingle' className='min-h-[100vh] w-[100vw] flex justify-center pt-[100px]'>
                    <div className=' relative w-[800px] rounded-[20px] bg-whiteSmoke mb-[15px] p-[15px] border-solid border-borderColor border-2 '>
                        <div className='absolute bg-orange h-[80px] w-[80px] left-[-100px] rounded-[100%] flex justify-center items-center'>
                            <Link to={`/home/${onePro.author}`} className=' bg-white h-[70px] w-[70px] left-[260px] rounded-[100%] flex justify-center items-center text-[30px]'><FaArrowLeft /></Link>
                        </div>
                        <div >
                            <h1 className="fromMainHeading mb-2">New Proposal from Gajendran</h1>
                            <hr className='bg-whiteSmoke mb-[15px] border-solid border-borderColor border-2 ' />
                            <div className='flex justify-evenly items-center mb-[25px]'>
                                <p className='text-[20px]'>HOD Approval :</p>
                                {
                                    onePro.hodapproval === "waiting" ?
                                        <p className='name text-[17px] font-[600] bg-bgYellow px-3  text-txtYellow rounded-[15px]'>• Waiting</p>
                                        : onePro.hodapproval === "approved" ?
                                            <p className='name text-[17px] font-[600] bg-bgGreen px-3  text-txtGreen rounded-[15px]'>• Approved</p>
                                            : <p className='name text-[17px] font-[600] px-3  bg-bgRed text-txtRed rounded-[15px]'>• Denied</p>
                                }
                                <p className='text-[20px]'>PRINCIPAL Approval :</p>
                                {
                                    onePro.principalapproval === "waiting" ?
                                        <p className='name text-[17px] font-[600] bg-bgYellow px-3  text-txtYellow rounded-[15px]'>• Waiting</p>
                                        : onePro.principalapproval === "approved" ?
                                            <p className='name text-[17px] font-[600] bg-bgGreen px-3  text-txtGreen rounded-[15px]'>• Approved</p>
                                            : <p className='name text-[17px] font-[600] px-3  bg-bgRed text-txtRed rounded-[15px]'>• Denied</p>
                                }
                            </div>

                            <div>
                                <div className="oneInputCont">
                                    <div className="nameForINput">Author</div>
                                    <div className="formInputBoxCont flex items-center ">
                                        :
                                        <div className="formInputBox w-[95%] ">{oneProEdit.author}</div>
                                    </div>
                                </div>
                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Event No</div>
                                    <div className="formInputBoxCont flex items-center ">
                                        :
                                        <div className="formInputBox w-[95%] ">{oneProEdit.evNum}</div>
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Event Name</div>
                                    <div className="formInputBoxCont flex items-center">
                                        :
                                        <input type='text' className="formInputBox w-[95%] " value={oneProEdit.evName}
                                            onChange={(event) => { setOneProEdit({ ...oneProEdit, evName: event.target.value }) }} />
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Organizing Department</div>
                                    <div className="formInputBoxCont flex items-center">
                                        :
                                        <div className='justify-center items-center w-[95%]'>
                                            <select className="formInputBox selectOption w-[100%]" tabIndex={3}
                                                value={oneProEdit.dept}
                                                onChange={(event) => { setOneProEdit({ ...oneProEdit, dept: [...oneProEdit.dept, event.target.value] }) }}
                                            >
                                                <option>--</option>
                                                <option value="cse">CSE</option>
                                                <option value="it">IT</option>
                                                <option value="ece">ECE</option>
                                                <option value="ete">ETE</option>
                                            </select>
                                            <div className="multipleOptionsBox formInputBox w-[97%]" id="deptItemContainer">
                                                {/* <p className="onedept" id="1">CSE <button className="deleteButton" onClick={() => handleDeleteDep(1, event)}>O</button></p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Associate Dept. | NSC</div>
                                    <div className="formInputBoxCont flex items-center">
                                        :
                                        <div className='justify-center items-center w-[95%]'>
                                            <select className="formInputBox selectOption w-[100%]" tabIndex={3}
                                                value={oneProEdit.assoDept}
                                                onChange={(event) => { setOneProEdit({ ...oneProEdit, assoDept: [...oneProEdit.assoDept, event.target.value] }) }}
                                            >
                                                <option>--</option>
                                                <option value="cse">CSE</option>
                                                <option value="it">IT</option>
                                                <option value="ece">ECE</option>
                                                <option value="ete">ETE</option>
                                            </select>
                                            <div className="multipleOptionsBox formInputBox w-[97%]" id="assoDeptItemContainer">
                                                {/* <p className="onedept" id="1">CSE <button className="deleteButton" onClick={() => handleDeleteDep(1, event)}>O</button></p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Date of the Event</div>
                                <div className="formInputBoxCont flex items-center dateInputBoxCont ">
                                    :
                                    <input type='date' className="formInputBox dateINputBox date1 w-[44%]" value={oneProEdit.date.start}
                                        onChange={(event) => { setOneProEdit((oneProEdit) => ({ ...oneProEdit, date: { ...oneProEdit.date, start: event.target.value } })) }} />
                                    to
                                    <input type='date' className="formInputBox dateINputBox date1 w-[44%]" value={oneProEdit.date.end}
                                        onChange={(event) => { setOneProEdit((oneProEdit) => ({ ...oneProEdit, date: { ...oneProEdit.date, end: event.target.value } })) }} />
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Time of the Event</div>
                                <div className="formInputBoxCont flex items-center dateInputBoxCont">
                                    :
                                    <input type='time' className="formInputBox dateINputBox date1 w-[44%]" value={oneProEdit.time.start}
                                        onChange={(event) => { setOneProEdit((oneProEdit) => ({ ...oneProEdit, time: { ...oneProEdit.time, start: event.target.value } })) }} />
                                    to
                                    <input type='time' className="formInputBox dateINputBox date1 w-[44%]" value={oneProEdit.time.start}
                                        onChange={(event) => { setOneProEdit((oneProEdit) => ({ ...oneProEdit, time: { ...oneProEdit.time, end: event.target.value } })) }} />
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Event Mode</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    {/* <div   className="formInputBox w-[95%]">{onePro.evMode}</div> */}
                                    <select className="formInputBox selectOption w-[95%]" tabIndex={9}
                                        value={oneProEdit.evMode}
                                        onChange={(event) => { setOneProEdit({ ...oneProEdit, evMode: event.target.value }) }}
                                    >
                                        <option>--</option>
                                        <option value="offlineCampus">{`Offline - With in campus`}</option>
                                        <option value="offlineOfCampus">{`Offline - Out of campus`}</option>
                                        <option value="onlineCampus">{`Online - With in campus`}</option>
                                        <option value="onlineOfCampus">{`Online - Out f campus`}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Event For</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <select className="formInputBox selectOption  w-[95%]" tabIndex={10}
                                        value={oneProEdit.evFor}
                                        onChange={(event) => { setOneProEdit({ ...oneProEdit, evFor: event.target.value }) }}
                                    >
                                        <option>--</option>
                                        <option value="student">Students</option>
                                        <option value="teachers">Teachers</option>
                                    </select>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Event Type</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <input
                                        className="formInputBox w-[95%]"
                                        type="text"
                                        tabIndex={11}
                                        value={oneProEdit.evType}
                                        onChange={(event) => { setOneProEdit({ ...oneProEdit, evType: event.target.value }) }}
                                    />
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Event Level</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <select className="formInputBox selectOption w-[95%]" tabIndex={12}
                                        value={oneProEdit.evLevel}
                                        onChange={(event) => { setOneProEdit({ ...oneProEdit, evLevel: event.target.value }) }}
                                    >
                                        <option>--</option>
                                        <option value="college">College</option>
                                        <option value="interCollege">Inter College</option>
                                    </select>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Venue</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <input
                                        className="formInputBox w-[95%]"
                                        type="text"
                                        tabIndex={13}
                                        value={oneProEdit.venue}
                                        onChange={(event) => { setOneProEdit({ ...oneProEdit, venue: event.target.value }) }}
                                    />
                                </div>
                            </div>

                            <br />
                            <div className="nameForINput">Related SDG : </div>
                            <div className="oneInputCont mt-3 addIMageContainer">
                                <div className="imageContainer" id="imageContainer"></div>
                            </div>

                            <br />
                            <div className="nameForINput">Involved Staffs : </div>
                            <div className="involvedStffCont">
                                <table className="staffTable">
                                    <tbody>
                                        <tr className="firstRow">
                                            <td>S. No</td>
                                            <td>Name</td>
                                            <td>Role</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="involvedStffCont">
                                <table className="staffTable" id="staffTable">
                                    <tbody>
                                        {/* {onePro.allStaff.map((staff, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{staff.name}</td>
                                            <td>{staff.role}</td>
                                        </tr>
                                    ))} */}

                                        {oneProEdit.allStaff.map((staff, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{staff.name}</td>
                                                <td>{staff.role}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            <br />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    {
                        (onePro.hodapproval !== "approved" && onePro.principalapproval !== 'approved') ?
                            <>
                                <button id='denyBtn' onClick={() => { editTheProposal() }} className="m-3 bg-bgRed font-semibold text-txtRed px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtRed">Edit Proposal</button>
                                <button id='approveBtn' onClick={() => { handleUpdate(e) }} className="m-3 bg-bgGreen font-semibold text-txtGreen px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtGreen">Update Proposal</button>
                            </>
                            :
                            <>
                                <button disabled id='denyBtn' onClick={() => { denyProposal(JSON.stringify(onePro), denyData) }} className="m-3 bg-bgRed font-semibold text-txtRed px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtRed opacity-[0.5] cursor-not-allowed">Edit Proposal</button>
                                <button disabled id='approveBtn' onClick={() => { handleUpdate(e) }} className="m-3 bg-bgGreen font-semibold text-txtGreen px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtGreen opacity-[0.5] cursor-not-allowed">Update Proposal</button>
                            </>
                    }
                </div>
            </div >

        </>
    )
}

export default UserProposalView