import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import NavBar from './NavBar';
import { FaArrowLeft } from "react-icons/fa6";
import Message from './Message';
import { createRoot } from 'react-dom/client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Loader from './Loader';
import { storage } from './firebase';
import { ref, getDownloadURL } from "firebase/storage";




const SingleProposalView = () => {

    const navigate = useNavigate();
    const { oneproposal } = useParams();
    const [onePro, setOnePro] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageList, setImageList] = useState([]);

    const contentRef = useRef(null);

    const downloadPDF = () => {
        const idd = document.getElementById('backButton')
        idd.style.display = 'none';

        // let elements = document.querySelectorAll('#textBox');

        // elements.forEach(function (element) {

        // });


        html2canvas(contentRef.current).then((canvas) => {
            const base64image = canvas.toDataURL('image/png');

            const textElements = contentRef.current.querySelectorAll('*');

            textElements.forEach((element) => {
                if (element.tagName === 'div' || element.tagName === 'p' || element.tagName === 'span') {
                    element.style.paddingTop = `${0}px`;
                    element.style.display = "flex"
                    element.style.alignItems = "center"
                    element.style.paddingBottom = `${-100}px`;
                }
            });

            const pdf = new jsPDF('p', 'px', [1200, 2600]);
            pdf.addImage(base64image, 'PNG', 0, 1, 1250, 2500);
            pdf.save(`${onePro.evName}` + '.pdf');

            textElements.forEach((element) => {
                element.style.paddingTop = '';
            });
        });
        idd.style.display = '';
    };



    const getProposalById = async () => {
        try {
            const receivedObject = await axios.get(`https://emsbackend-ten.vercel.app/proposalview/${oneproposal}`);
            console.log("Came")
            console.log(receivedObject.data)
            setOnePro(receivedObject.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("inside comming")
        getProposalById();
    }, [])


    useEffect(() => {
        if (Object.keys(onePro).length !== 0 && onePro.svgImagesURLS) {
            const fetchImageURLs = async (ids) => {
                try {
                    let urls = [];
                    for (let index = 0; index < ids.length; index++) {
                        const imgRef = ref(storage, 'images/' + index + ids[index]);
                        const imageUrl = await getDownloadURL(imgRef);
                        urls.push(imageUrl)
                    }
                    setImageList(urls);

                } catch (error) {
                    console.error("Error fetching image URLs:", error);
                }
            };

            fetchImageURLs(onePro.svgImagesURLS);
        }
    }, [onePro]);


    if (Object.keys(onePro).length === 0) {
        return <Loader display={loading} />
    }

    let [hours, minutes] = onePro.time.start.split(':');
    let amPmHours = hours % 12 || 12;
    let amPm = hours >= 12 ? 'PM' : 'AM';
    let amPmTime = amPmHours + ':' + minutes + ' ' + amPm;

    let [hours2, minutes2] = onePro.time.end.split(':');
    let amPmHours2 = hours2 % 12 || 12;
    let amPm2 = hours2 >= 12 ? 'PM' : 'AM';
    let amPmTime2 = amPmHours2 + ':' + minutes2 + ' ' + amPm2;


    const approveData = { principalapproval: "approved" };
    const denyData = { principalapproval: "denied" };



    const denyProposal = async (onePro, denyData) => {
        try {
            const response = await axios.put(`https://emsbackend-ten.vercel.app/proposalview/${oneproposal}`, denyData);
            console.log(response.data);
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Approval Denied"} status={false} />);
            setTimeout(() => { navigate("/proposalview") }, 800);
        } catch (error) {
            console.error(error);
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Cannot Approve"} status={false} />);

        }
    }

    const approveProposal = async (onePro, approveData) => {
        try {
            const response = await axios.put(`https://emsbackend-ten.vercel.app/proposalview/${oneproposal}`, approveData);
            console.log(response.data);
            // const rootElement = document.getElementById('mainSingle');
            // ReactDOM.render(<Message message={"Approval Succeed"} status={true} />, rootElement);
            setTimeout(() => { navigate("/proposalview") }, 800);
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Approval Succeed"} status={true} />);
        } catch (error) {
            const root = createRoot(document.getElementById('mainSingle'));
            root.render(<Message message={"Approval Failed"} status={false} />);
            console.error(error);
        }
    }

    const getTotalAmt = () => {
        let result = 0;
        for (let index = 0; index < onePro.budget.length; index++) {
            result = parseInt(onePro.budget[index].amount)
        }
        return result;
    }


    return (
        <>
            {/* {
                loading ?
                <Loader display={true} />
                    : <></>
            } */}
            <div>

                <NavBar name={"Principal"} />
                {/* <div>Proposal Id : {id}</div> */}
                <div id='contentToDownload' ref={contentRef}>
                    <div id='mainSingle' className='min-h-[100vh] w-[100vw] flex justify-center pt-[100px]'>
                        <div className=' relative w-[800px] rounded-[20px] bg-whiteSmoke mb-[15px] p-[15px] border-solid border-borderColor border-2 '>
                            <div id='backButton' className='absolute bg-orange h-[80px] w-[80px] left-[-100px] rounded-[100%] flex justify-center items-center'>
                                <Link to="/proposalview" className=' bg-white h-[70px] w-[70px] left-[260px] rounded-[100%] flex justify-center items-center text-[30px]'><FaArrowLeft /></Link>
                            </div>
                            <div >
                                <h1 className="fromMainHeading mb-2">New Proposal from {onePro.author.toUpperCase()}</h1>
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
                                        <div className="nameForINput">Faculty Coordinator</div>
                                        <div className="formInputBoxCont flex items-center">
                                            :
                                            <div className="formInputBox w-[95%] ">{onePro.author}</div>
                                        </div>
                                    </div>

                                    <div className="oneInputCont mt-3">
                                        <div className="nameForINput">Event Type</div>
                                        <div className="formInputBoxCont flex items-center">
                                            :
                                            <div className="formInputBox w-[95%]">{onePro.evType}</div>
                                        </div>
                                    </div>

                                    <div className="oneInputCont mt-3">
                                        <div className="nameForINput">Event No</div>
                                        <div className="formInputBoxCont flex items-center ">
                                            :
                                            <div id='textBox' className="formInputBox w-[95%] ">{onePro.evNum}</div>
                                        </div>
                                    </div>

                                    <div className="oneInputCont mt-3">
                                        <div className="nameForINput">Event Name</div>
                                        <div className="formInputBoxCont flex items-center">
                                            :
                                            <div id='textBox' className="formInputBox w-[95%]">{onePro.evName}</div>
                                        </div>
                                    </div>

                                    <div className="oneInputCont mt-3">
                                        <div className="nameForINput">Event Level</div>
                                        <div className="formInputBoxCont flex items-center">
                                            :
                                            <div id='textBox' className="formInputBox w-[95%]">{onePro.evLevel}</div>
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
                                        <div className="nameForINput">Association Clubs</div>
                                        <div className="formInputBoxCont flex items-center">
                                            :
                                            <div className="multipleOptionsBox formInputBox w-[95%] border-solid rounded-md border-borderColor border-2" id="deptItemContainer">
                                                {/* <p className="onedept px-2" id="1">CSE</p>
                                        <p className="onedept px-2" id="1">IT</p>
                                        <p className="onedept px-2" id="1">ECE</p> */}
                                                {onePro.assoClub.map((club, index) => (
                                                    <p key={index} className="onedept px-2" id="1">{club.toUpperCase()}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="oneInputCont mt-3">
                                        <div className="nameForINput">Association Dept. | NSC</div>
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
                                        <div className="formInputBox dateINputBox date1 w-[44%]">{onePro.date.start}</div>
                                        to
                                        <div className="formInputBox dateINputBox date1 w-[44%]">{onePro.date.end}</div>
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Time of the Event</div>
                                    <div className="formInputBoxCont flex items-center dateInputBoxCont">
                                        :
                                        <div className="formInputBox dateINputBox date1 w-[44%]">{amPmTime}</div>
                                        to
                                        <div className="formInputBox dateINputBox date1 w-[44%]">{amPmTime2}</div>
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Event Mode</div>
                                    <div className="formInputBoxCont flex items-center">
                                        :
                                        <div className="formInputBox w-[95%]">{onePro.evMode}</div>
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Event For</div>
                                    <div className="formInputBoxCont flex items-center">
                                        :
                                        <div className="formInputBox w-[95%]">{onePro.evFor}</div>
                                    </div>
                                </div>

                                <div className="oneInputCont mt-3">
                                    <div className="nameForINput">Venue</div>
                                    <div className="formInputBoxCont flex items-center">
                                        :
                                        <div className="formInputBox w-[95%]">{onePro.venue}</div>
                                    </div>
                                </div>

                                {/* <div className="oneInputCont mt-3">
                                <div className="nameForINput">Student - Internal</div>
                                <div className="formInputBoxCont flex items-center">
                                    :
                                    <div className="formInputBox w-[95%]">{onePro.stuCount}</div>
                                </div>
                            </div> */}

                                <br />
                                <div className="nameForINput">Related SDG : </div>
                                <div className="oneInputCont mt-3 addIMageContainer">
                                    <div className="imageContainer" id="imageContainer">
                                        {imageList && imageList.map((oneImage, index) => (
                                            // <tr key={index}>
                                            //     <td>{index + 1}</td>
                                            //     <td>{staff.name}</td>
                                            //     <td>{staff.role}</td>
                                            // </tr>
                                            <img key={index} src={oneImage} className='max-h-[150px]' />
                                        ))}
                                    </div>
                                </div>

                                <br />
                                <div className="nameForINput">Involved Staffs : </div>
                                <div className="involvedStffCont">
                                    <table className="staffTable">
                                        <tbody>
                                            <tr className="firstRow max-w-[100%]">
                                                <td className='w-[10%]'>S. No</td>
                                                <td className='w-[45%]'>Name</td>
                                                <td className='w-[45%]'>Role</td>
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

                                            {onePro.allStaff.map((staff, index) => (
                                                <tr key={index} className='max-w-[100%]'>
                                                    <td className='w-[10%]'>{index + 1}</td>
                                                    <td className='w-[45%]'>{staff.name}</td>
                                                    <td className='w-[45%]'>{staff.role}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>

                                <br />
                                <div className="nameForINput mb-2">Resource Persons : </div>
                                <div className="involvedStffCont px-3">
                                    <div className="h-[70px] w-[100%] flex bg-backgroundBlue text-white rounded-lg">
                                        <div className="flex flex-col w-[15%]">
                                            <div className="w-[100%] h-[100%] border-solid border-[1px] border-white flex justify-center items-center">
                                                From
                                            </div>
                                            <div className="w-[100%] h-[100%] border-solid border-[1px] border-white flex justify-center items-center">
                                                Category
                                            </div>
                                        </div>
                                        <div className="w-[85%] h-[100%] ">
                                            <div className="h-[50%] w-[100%] flex">
                                                <div className="w-[30%] h-[100%]  border-solid border-[1px] border-white flex justify-center items-center">Type</div>
                                                <div className="w-[35%] h-[100%]  border-solid border-[1px] border-white flex justify-center items-center">Name</div>
                                                <div className="w-[35%] h-[100%]  border-solid border-[1px] border-white flex justify-center items-center">Designation</div>
                                            </div>
                                            <div className="h-[50%] w-[100%] flex">
                                                <div className="w-[30%] h-[100%]  border-solid border-[1px] border-white flex justify-center items-center">Company</div>
                                                <div className="w-[35%] h-[100%]  border-solid border-[1px] border-white flex justify-center items-center">Email</div>
                                                <div className="w-[35%] h-[100%]  border-solid border-[1px] border-white flex justify-center items-center">Phone</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="involvedStffCont mb-10">
                                    <div className="w-[96%]" id="internalTable">
                                        {
                                            onePro.internalResourcePerson.map((oneResource, index) => (
                                                <div key={index} className="h-[70px] w-[100%] flex bg-white text-backgroundBlue rounded-lg mt-2">
                                                    <div className="flex flex-col w-[15%]">
                                                        <div className="w-[100%] h-[100%] border-solid border-[1px] border-backgroundBlue flex justify-center items-center">
                                                            {oneResource.fromPerson}
                                                        </div>
                                                        <div className="w-[100%] h-[100%] border-solid border-[1px] border-backgroundBlue flex justify-center items-center">
                                                            {oneResource.internalCategory}
                                                        </div>
                                                    </div>
                                                    <div className="w-[85%] h-[100%] ">
                                                        <div className="h-[50%] w-[100%] flex">
                                                            <div className="w-[30%] h-[100%]  border-solid border-[1px] border-backgroundBlue flex justify-center items-center">{oneResource.internalType}</div>
                                                            <div className="w-[35%] h-[100%]  border-solid border-[1px] border-backgroundBlue flex justify-center items-center">{oneResource.internalName}</div>
                                                            <div className="w-[35%] h-[100%]  border-solid border-[1px] border-backgroundBlue flex justify-center items-center">{oneResource.internalDesignation}</div>
                                                        </div>
                                                        <div className="h-[50%] w-[100%] flex">
                                                            <div className="w-[30%] h-[100%]  border-solid border-[1px] border-backgroundBlue flex justify-center items-center">{oneResource.internalCompany}</div>
                                                            <div className="w-[35%] h-[100%]  border-solid border-[1px] border-backgroundBlue flex justify-center items-center">{oneResource.internalEmail}</div>
                                                            <div className="w-[35%] h-[100%]  border-solid border-[1px] border-backgroundBlue flex justify-center items-center">{oneResource.internalPhone}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="nameForINput">Event Objective : </div>
                                <div className="textAreaCont items-start">
                                    <div className="outcomeText items-start formInputBox mt-4 min-h-[30px]">{onePro.objective}</div>
                                </div>

                                <div className="nameForINput ">Event Outcome : </div>
                                <div className="textAreaCont items-start">
                                    <div className="outcomeText items-start formInputBox mt-4 min-h-[30px]">{onePro.outcome}</div>
                                </div>

                                <br />
                                {/* <div className="nameForINput">Event Summary : </div>
                            <div className="textAreaCont">
                                <div className="summaryText"
                                >{onePro.summary}</div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    {
                        (onePro.pasystem[0]) ?
                            <>
                                <div className=''>
                                    <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">PA Form (Public Address)</h1>
                                    <div className='p-3 border-[3px] border-solid border-borderColor min-h-[250px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                                        <div className="involvedStffCont">
                                            <table className="staffTable">
                                                <tbody>
                                                    <tr className="firstRow w-[100%]">
                                                        <td className="snoCol w-[10%]">S. No</td>
                                                        <td className="nameCol w-[45%]">Item</td>
                                                        <td className="roleCol w-[45%]">Quantity</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                        <div className="involvedStffCont">
                                            <table className="staffTable" id="paTable">
                                                <tbody>
                                                    {onePro.pasystem.map((exe, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{exe.item}</td>
                                                            <td>{exe.qnty}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* <div className="staffInfoInputCont">
                            <select className="formInputBox selectOption w-[40%]" tabIndex={3}
                                id='oneItem'
                                value={newItems.item}
                                onChange={(event) => { setNewItems({ ...newItems, item: event.target.value }) }}
                            >
                                <option>--</option>
                                <option value="collar">Collar</option>
                                <option value="hand">Hand</option>
                                <option value="podium">Podium</option>
                            </select>
                            <input
                                className="formInputBox staffInput"
                                id="oneQnty"
                                type="text"
                                placeholder="Quantity"
                                tabIndex={14}
                                value={newItems.qnty}
                                onChange={(event) => { setNewItems({ ...newItems, qnty: event.target.value }) }}
                            />
                            <button className="addNewStaffButton" id="addNewBudgetButton"
                                onClick={(event) => addNewPAITEMButton(event)}
                            ><LuPlusCircle /></button>
                        </div> */}
                                    </div>

                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        (onePro.hallbooking[0]) ?
                            <>
                                <div>
                                    <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">Hall Booking Form</h1>
                                    <div className='p-3 border-[3px] border-solid border-borderColor min-h-[200px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                                        <div className="involvedStffCont">
                                            <table className="staffTable">
                                                <tbody>
                                                    <tr className="firstRow">
                                                        <td className="">Name Of Faculty</td>
                                                        <td className="">In-Charge</td>
                                                        <td className="">Contact</td>
                                                    </tr>
                                                    <tr className='bg-white'>
                                                        <td>{onePro.hallbooking.hall}</td>
                                                        <td>{onePro.hallbooking.name}</td>
                                                        <td>{onePro.hallbooking.contact}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <></>
                    }

                    {
                        (onePro.refreshment.vendor) ?
                            <>
                                <div>
                                    <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">Refreshment Form</h1>
                                    <div className='p-3 border-[3px] border-solid border-borderColor min-h-[300px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                                        <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Vendor</h3>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Vendor</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className="outcomeText items-center formInputBox mt-4 min-h-[40px]">{onePro.refreshment.vendor}</div>
                                            </div>
                                        </div>
                                        <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Morning</h3>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Tea - Rs. 7 </div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.forenoonTea || 0}</div>
                                                <div
                                                    className="formInputBox w-[47%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.forenoonTea * 7}</span> </div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Coffee - Rs. 10</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.forenoonCoffee}</div>
                                                <div
                                                    className="formInputBox w-[47%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.forenoonCoffee * 10}</span> </div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Snacks - Rs. 8</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.forenoonSnacks}</div>
                                                <div
                                                    className="formInputBox w-[47%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.forenoonSnacks * 8}</span> </div>
                                            </div>
                                        </div>
                                        <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Afternoon</h3>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Lunch VEG Menu</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[95%]">{onePro.refreshment.lunch.vegMenu}</div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">VEG Count</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.lunch.vegQnty}</div>
                                                <div
                                                    className="formInputBox w-[46%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.lunch.vegQnty * onePro.refreshment.lunch.vegMenu.match(/\d+$/)}</span> </div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Lunch NON-VEG Menu</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[95%]">{onePro.refreshment.lunch.nonvegMenu}</div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">NON-VEG Count</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.lunch.nonvegQnty}</div>
                                                <div
                                                    className="formInputBox w-[46%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.lunch.nonvegQnty * onePro.refreshment.lunch.nonvegMenu.match(/\d+$/)}</span> </div>
                                            </div>
                                        </div>
                                        <h3 className='text-white pl-5 text-2xl text-center bg-backgroundBlue m-5 p-1 rounded-lg'>Evening</h3>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Tea - Rs. 7 </div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.afternoonTea}</div>
                                                <div
                                                    className="formInputBox w-[47%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.afternoonTea * 7}</span> </div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Coffee - Rs. 10</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.afternooncoffee}</div>
                                                <div
                                                    className="formInputBox w-[47%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.afternooncoffee * 10}</span> </div>
                                            </div>
                                        </div>
                                        <div className="oneInputCont flex justify-center items-center">
                                            <div className="nameForINput">Snacks - Rs. 8</div>
                                            <div className="formInputBoxCont flex justify-center items-center">
                                                :
                                                <div className=" formInputBox min-h-[40px] w-[47%]">{onePro.refreshment.afternoonSnacks}</div>
                                                <div
                                                    className="formInputBox w-[47%] inline-block text-borderColor"
                                                > <span className='text-orange'>{onePro.refreshment.afternoonSnacks * 8}</span> </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </>
                            : <></>
                    }
                    {
                        (onePro.budget || onePro.refreshment.vendor) ?
                            <>
                                <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">Budget Form</h1>
                                <div className='p-3 border-[3px] border-solid border-secondBorderColor min-h-[300px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                                    <div className="involvedStffCont">
                                        <table className="staffTable">
                                            <tbody>
                                                <tr className="firstRow w-[100%]">
                                                    <td className="snoCol w-[10%]">S. No</td>
                                                    <td className="nameCol w-[50%]">Expense</td>
                                                    <td className="roleCol w-[40%]">Amount (Rs)</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Refreshment Total</td>
                                                    <td>{ }</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="involvedStffCont">
                                        <table className="staffTable" id="budgetTable">
                                            <tbody>
                                                {onePro.budget.map((exe, index) => (
                                                    <tr key={index} className='w-[100%]'>
                                                        <td className='w-[10%]'>{index + 2}</td>
                                                        <td className='w-[50%]'>{exe.expense}</td>
                                                        <td className='w-[40%]'>{exe.amount}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="involvedStffCont mt-5">
                                        <table className="staffTable">
                                            <tbody className=''>
                                                <tr className="firstRow bg-whiteSmoke text-[#2B7E5A] font-[600] ">
                                                    <th className="w-[50%] border-[#2B7E5A] border-[2px] border-solid">Total Amount </th>
                                                    <th className="border-[#2B7E5A] border-[2px] border-solid bg-[#2B7E5A] text-white rounded-none" id='totalAmount'>{getTotalAmt()}</th>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </>
                            : <></>
                    }
                    {
                        (onePro.stuCount) ?
                            <>
                                <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">POST EVENT DETAILS</h1>
                                <div className='p-3 border-[3px] border-solid border-borderColor min-h-[250px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto mt-[5px] mb-[25px]'>
                                    {
                                        onePro.hodapproval !== 'denied' && onePro.principalapproval !== 'denied' ?
                                            <>
                                                <div className="oneInputCont flex justify-center items-center">
                                                    <div className="nameForINput">Student - Internal</div>
                                                    <div className="formInputBoxCont flex justify-center items-center">
                                                        :
                                                        <div className=" formInputBox min-h-[40px] w-[95%]">{onePro.stuCount}</div>
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="nameForINput">Event Summary : </div>
                                                <div className="textAreaCont mt-2">
                                                    <div className="outcomeText items-start formInputBox mt-2 min-h-[100px]">{onePro.summary}</div>
                                                    {/* <textarea className="summaryText" value={sumData.summary} onChange={e => setSumData({ ...sumData, summary: e.target.value })}></textarea> */}
                                                </div>
                                            </>
                                            :
                                            <p className='text-center bg-bgRed text-txtRed p-2 rounded-md font-medium'>You can't Update this proposal !</p>
                                    }
                                </div>
                            </>
                            : <></>
                    }
                </div>
                <div className="flex justify-center">
                    {
                        (onePro.hodapproval !== "waiting") ?
                            <>
                                <button id='denyBtn' onClick={() => { denyProposal(JSON.stringify(onePro), denyData) }} className="m-3 bg-bgRed font-semibold text-txtRed px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtRed">Deny Proposal</button>
                                <button id='approveBtn' onClick={() => { approveProposal(JSON.stringify(onePro), approveData) }} className="m-3 bg-bgGreen font-semibold text-txtGreen px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtGreen">Approve Proposal</button>
                            </>
                            :
                            <>
                                <button disabled id='denyBtn' onClick={() => { denyProposal(JSON.stringify(onePro), denyData) }} className="m-3 bg-bgRed font-semibold text-txtRed px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtRed opacity-[0.5] cursor-not-allowed">Deny Proposal</button>
                                <button disabled id='approveBtn' onClick={() => { approveProposal(JSON.stringify(onePro), approveData) }} className="m-3 bg-bgGreen font-semibold text-txtGreen px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtGreen opacity-[0.5] cursor-not-allowed">Approve Proposal</button>
                            </>
                    }

                    <button id="downloadButton" onClick={downloadPDF} className="m-3 bg-bgBlue font-semibold text-txtBlue px-3 py-2 mt-3 rounded-md border-2 border-solid border-txtBlue">Download As Pdf</button>
                </div>
            </div >

        </>
    )
}

export default SingleProposalView