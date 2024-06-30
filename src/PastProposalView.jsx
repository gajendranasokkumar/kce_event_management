import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import NavBar from './NavBar';
import { FaArrowLeft } from "react-icons/fa6";
import Message from './Message';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Loader from "./Loader"





const PastProposalView = () => {
    const { oneproposal } = useParams();
    const [onePro, setOnePro] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getProposalById = async () => {
            try {
                const receivedObject = await axios.get(`http://localhost:3001/proposalview/${oneproposal}`);
                console.log(receivedObject.data)
                setOnePro(receivedObject.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProposalById();
    }, [oneproposal])


    if (Object.keys(onePro).length === 0) {
        return <Loader display={loading} />
    }

    console.log(oneproposal)

    let [hours, minutes] = onePro.time.start.split(':');
    let amPmHours = hours % 12 || 12;
    let amPm = hours >= 12 ? 'PM' : 'AM';
    let amPmTime = amPmHours + ':' + minutes + ' ' + amPm;

    let [hours2, minutes2] = onePro.time.end.split(':');
    let amPmHours2 = hours2 % 12 || 12;
    let amPm2 = hours2 >= 12 ? 'PM' : 'AM';
    let amPmTime2 = amPmHours2 + ':' + minutes2 + ' ' + amPm2;


    const approveData = {principalapproval : "approved"};
    const denyData = {principalapproval : "denied"};



    const denyProposal = async (onePro, denyData) =>{
        try {
            const response = await axios.put(`http://localhost:3001/proposalview/${onePro}`, denyData);
            console.log(response.data);
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Approval Denied"} status={false} />);
            setTimeout(()=>{navigate("/proposalview")}, 800);  
        } catch (error) {
            console.error(error);
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Cannot Approve"} status={false} />);

        }
    }
    
    const approveProposal = async (onePro, approveData) =>{
        try {
            const response = await axios.put(`http://localhost:3001/proposalview/${onePro}`, approveData);
            console.log(response.data);
            // const rootElement = document.getElementById('mainSingle');
            // ReactDOM.render(<Message message={"Approval Succeed"} status={true} />, rootElement);
            setTimeout(()=>{navigate("/proposalview")}, 800);
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Approval Succeed"} status={true} />);
        } catch (error) {
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Approval Failed"} status={false} />);
            console.error(error);
        }
    }



    return (
    <> 
        <div>
            <NavBar name={"Principal"} />
            {/* <div>Proposal Id : {id}</div> */}
            <div id='mainSingle' className='min-h-[100vh] w-[100vw] flex justify-center pt-[100px]'>
                <div className=' relative w-[800px] rounded-[20px] bg-whiteSmoke mb-[15px] p-[15px] border-solid border-borderColor border-2 '>
                    <div className='absolute bg-orange h-[80px] w-[80px] left-[-100px] rounded-[100%] flex justify-center items-center'>
                        <Link to="/pastproposal/" className=' bg-white h-[70px] w-[70px] left-[260px] rounded-[100%] flex justify-center items-center text-[30px]'><FaArrowLeft /></Link>
                    </div>
                    <div >
                        <h1 className="fromMainHeading mb-2">New Proposal from Gajendran</h1>
                        <hr className='bg-whiteSmoke mb-[15px] border-solid border-borderColor border-2 '/>
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

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Event No</div>
                                <div className="formInputBoxCont flex items-center ">
                                    :
                                    <div className="formInputBox w-[95%] ">{onePro.evNum}</div>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Event Name</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <div className="formInputBox w-[95%]">{onePro.evName}</div>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Organizing Department</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <div className="multipleOptionsBox formInputBox w-[95%] border-solid rounded-md border-borderColor border-2" id="deptItemContainer">
                                        {/* <p className="onedept px-2" id="1">CSE</p>
                                        <p className="onedept px-2" id="1">IT</p>
                                        <p className="onedept px-2" id="1">ECE</p> */}
                                        {onePro.dept.map((dept, index) => (
                                            <p key={index} className="onedept px-2" id="1">{dept.toUpperCase()}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="oneInputCont mt-3">
                                <div className="nameForINput">Associate Dept. | NSC</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <div className="multipleOptionsBox formInputBox w-[95%] border-solid rounded-md border-borderColor border-2" id="deptItemContainer">
                                        {/* <p className="onedept px-2" id="1">CSE</p>
                                        <p className="onedept px-2" id="1">IT</p>
                                        <p className="onedept px-2" id="1">ECE</p> */}
                                        {onePro.assoDept.map((dept, index) => (
                                            <p key={index} className="onedept px-2" id="1">{dept.toUpperCase()}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Date of the Event</div>
                            <div className="formInputBoxCont flex items-center dateInputBoxCont ">
                                :
                                <div  className="formInputBox dateINputBox date1 w-[44%]">{onePro.date.start}</div>
                                to
                                <div   className="formInputBox dateINputBox date1 w-[44%]">{onePro.date.end}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Time of the Event</div>
                            <div className="formInputBoxCont flex items-center dateInputBoxCont">
                                :
                                <div  className="formInputBox dateINputBox date1 w-[44%]">{amPmTime}</div>
                                to
                                <div  className="formInputBox dateINputBox date1 w-[44%]">{amPmTime2}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Event Mode</div>
                            <div className="formInputBoxCont flex items-center">
                                :
                                <div   className="formInputBox w-[95%]">{onePro.evMode}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Event For</div>
                            <div className="formInputBoxCont flex items-center">
                                :
                                <div  className="formInputBox w-[95%]">{onePro.evFor}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Event Type</div>
                            <div className="formInputBoxCont flex items-center">
                                :
                                <div  className="formInputBox w-[95%]">{onePro.evType}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Event Level</div>
                            <div className="formInputBoxCont flex items-center">
                                :
                                <div  className="formInputBox w-[95%]">{onePro.evLevel}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Venue</div>
                            <div className="formInputBoxCont flex items-center">
                                :
                                <div    className="formInputBox w-[95%]">{onePro.venue}</div>
                            </div>
                        </div>

                        <div className="oneInputCont mt-3">
                            <div className="nameForINput">Student - Internal</div>
                            <div className="formInputBoxCont flex items-center">
                                :
                                <div    className="formInputBox w-[95%]">{onePro.stuCount}</div>
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
                                    {/* {proposalDetails.allStaff.map((staff, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{staff.name}</td>
                                            <td>{staff.role}</td>
                                        </tr>
                                    ))} */}

                                    {onePro.allStaff.map((staff, index) => (
                                        <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{staff.name}</td>
                                        <td>{staff.role}</td>
                                    </tr>
                                    ))}
                                        
                                </tbody>
                            </table>
                        </div>

                        <br />
                        <div className="nameForINput">Event Outcome : </div>
                        <div className="textAreaCont items-start">
                            <div className="outcomeText items-start ">{onePro.outcome}</div>
                        </div>

                        <br />
                        <div className="nameForINput">Event Summary : </div>
                        <div className="textAreaCont">
                            <div className="summaryText"
                            >{onePro.summary}</div>
                        </div>
                        <div className="flex justify-center">
                            {
                                (onePro.hodapproval === "approved") ?
                                <>
                                    <button id='denyBtn' onClick={()=>{denyProposal(JSON.stringify(onePro), denyData)}} className="m-3 bg-bgRed font-semibold text-txtRed px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtRed">Deny Proposal</button>
                                    <button id='approveBtn' onClick={()=>{approveProposal(JSON.stringify(onePro), approveData)}} className="m-3 bg-bgGreen font-semibold text-txtGreen px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtGreen">Approve Proposal</button>
                                </>
                                :
                                <>
                                    <button disabled id='denyBtn' onClick={()=>{denyProposal(JSON.stringify(onePro), denyData)}} className="m-3 bg-bgRed font-semibold text-txtRed px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtRed opacity-[0.5] cursor-not-allowed">Deny Proposal</button>
                                    <button disabled id='approveBtn' onClick={()=>{approveProposal(JSON.stringify(onePro), approveData)}} className="m-3 bg-bgGreen font-semibold text-txtGreen px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtGreen opacity-[0.5] cursor-not-allowed">Approve Proposal</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    
    </>
  )
}

export default PastProposalView