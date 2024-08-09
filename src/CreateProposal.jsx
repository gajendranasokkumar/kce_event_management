import React, { useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import NavBar from "./NavBar";
import axios from "axios";
import Message from "./Message";
import { createRoot } from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import BudgetBox from "./BudgetBox";
import PASystemBox from "./PASystemBox";
import RefreshmentBox from "./RefreshmentBox";
import HallBooking from "./HallBooking";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { IoIosCloudDone } from "react-icons/io";



const CreateProposal = () => {

  const navigate = useNavigate();
  const { name } = useParams();



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Comming into submit axios function ")
    console.log(proposalDetails);
    await axios.post("https://emsbackend-ten.vercel.app/allproposals", {
      ...proposalDetails, hodapproval: "waiting", principalapproval: "waiting"
    })
      .then((result) => {
        const root = createRoot(document.getElementById('mainSingle'));
        root.render(<Message message={"Proposal Created"} status={true} />);
        setTimeout(() => { navigate(`/home/${name}`) }, 800);
        console.log(result)
      }).catch((err) => {
        const root = createRoot(document.getElementById('mainSingle'));
        root.render(<Message message={"Cannot create"} status={false} />);
        setTimeout(() => { navigate(`/home/${name}`) }, 800);
        console.log(err)
      });
  }

  const [addStaff, setAddStaff] = useState({ name: '', role: '' });
  const [addInternalResourse, setAddInternalResourse] = useState({
    fromPerson: '',
    internalType: '',
    internalName: '',
    internalDesignation: '',
    internalCompany: '',
    internalEmail: '',
    internalPhone: '',
    internalCategory: ''
  })

  const [options, setOptions] = useState({
    pasystem: '',
    budget: '',
    refreshment: '',
    hallbooking: '',
    imageUploaded: ''
  });

  const [proposalDetails, setProposalDetails] = useState({
    author: sessionStorage.getItem("userName"),
    evNum: 'KCEEV001',
    evName: '',
    dept: [],
    assoDept: [],
    assoClub: [],
    date: { start: '', end: '' },
    time: { start: '', end: '' },
    evMode: '',
    evFor: '',
    evType: '',
    evLevel: '',
    venue: '',
    stuCount: '',
    allStaff: [], 
    internalResourcePerson: [],
    externalResourcePerson: [],
    outcome: '',
    summary: '',
    budget: [],
    pasystem: [],
    refreshmentTotal: '',
    refreshment: {
      vendor: '',
      forenoonTea: '',
      afternoonTea: '',
      forenoonCoffee: '',
      afternooncoffee: '',
      forenoonSnacks: '',
      afternoonSnacks: '',
      breakfast: { vegMenu: '', vegQnty: '', nonvegMenu: '', nonvegQnty: '' },
      lunch: { vegMenu: '', vegQnty: '', nonvegMenu: '', nonvegQnty: '' },
      dinner: { vegMenu: '', vegQnty: '', nonvegMenu: '', nonvegQnty: '' },
    },
    hallbooking: { hall: '', name: '', contact: '' },
    svgImages: 0,
    svgImagesURLS: []
  });

  const [image, setImage] = useState(null);

  /*ORGANIZING DEPT CONTAINER HANDLING  */

  useEffect(() => {
    const deptItemContainer = document.getElementById('deptItemContainer');
    deptItemContainer.innerHTML = "";
    for (let index = 0; index < proposalDetails.dept.length; index++) {

      const element = document.createElement('p');
      element.classList.add('onedept', 'px-2');
      const textNode = document.createTextNode(proposalDetails.dept[index].toUpperCase());
      element.appendChild(textNode);


      const btn = document.createElement('button');
      btn.classList.add('deleteButton');
      btn.innerText = "✕";
      btn.onclick = (event) => handleDeleteDep(index, event);
      element.appendChild(btn);

      deptItemContainer.appendChild(element);
    }
  }, [proposalDetails.dept]);

  const handleDeleteDep = (index, event) => {
    event.preventDefault();
    const newArr = [...proposalDetails.dept];
    newArr.splice(index, 1);
    setProposalDetails((proposalDetails) => ({ ...proposalDetails, dept: [...newArr] }))
  }



  /* ASSOCIATE DEPT CONTAINER HANDLING  */
  useEffect(() => {
    const deptItemContainer = document.getElementById('assoDeptItemContainer');
    deptItemContainer.innerHTML = "";
    for (let index = 0; index < proposalDetails.assoDept.length; index++) {

      const element = document.createElement('p');
      element.classList.add('onedept', 'px-2');
      const textNode = document.createTextNode(proposalDetails.assoDept[index].toUpperCase());
      element.appendChild(textNode);


      const btn = document.createElement('button');
      btn.classList.add('deleteButton');
      btn.innerText = "✕";
      btn.onclick = (event) => handleDeleteAssoDep(index, event);
      element.appendChild(btn);

      deptItemContainer.appendChild(element);
    }
  }, [proposalDetails.assoDept]);


  const handleDeleteAssoDep = (index, event) => {
    event.preventDefault();
    const newArr = [...proposalDetails.assoDept];
    newArr.splice(index, 1);
    setProposalDetails((proposalDetails) => ({ ...proposalDetails, assoDept: [...newArr] }))
  }



  /* ASSOCIATE CLUBS CONTAINER HANDLING  */
  useEffect(() => {
    const deptItemContainer = document.getElementById('assoClubItemContainer');
    deptItemContainer.innerHTML = "";
    for (let index = 0; index < proposalDetails.assoClub.length; index++) {

      const element = document.createElement('p');
      element.classList.add('onedept', 'px-2');
      const textNode = document.createTextNode(proposalDetails.assoClub[index].toUpperCase());
      element.appendChild(textNode);


      const btn = document.createElement('button');
      btn.classList.add('deleteButton');
      btn.innerText = "✕";
      btn.onclick = (event) => handleDeleteAssoClub(index, event);
      element.appendChild(btn);

      deptItemContainer.appendChild(element);
    }
  }, [proposalDetails.assoClub]);


  const handleDeleteAssoClub = (index, event) => {
    event.preventDefault();
    const newArr = [...proposalDetails.assoClub];
    newArr.splice(index, 1);
    setProposalDetails((proposalDetails) => ({ ...proposalDetails, assoClub: [...newArr] }))
  }


  /* HANDLES THE ADDED STAFF FOR THE EVENT */
  const staffTable = document.getElementById('staffTable');
  const addNewStaffButton = (event) => {
    event.preventDefault();
    const sname = document.getElementById('staffname').value;
    const srole = document.getElementById('staffrole').value;
    let obj = { name: sname, role: srole };
    setProposalDetails({ ...proposalDetails, allStaff: [...proposalDetails.allStaff, obj] });
  }

  useEffect(() => {
    document.getElementById('staffTable').innerHTML = "";
    for (let index = 0; index < proposalDetails.allStaff.length; index++) {
      const frag = document.createDocumentFragment();
      const tr = document.createElement('tr');
      tr.classList.add('subTR');

      const btn = document.createElement('button');
      btn.classList.add('deleteButtonStaff');
      btn.innerText = "✕";

      const deleteTd = document.createElement('td');
      deleteTd.classList.add('deleteCol');
      deleteTd.appendChild(btn);
      deleteTd.onclick = (event) => handleDeleteStaffRole(index, event);

      tr.innerHTML = `
        <td className="snoCol">${index + 1}</td>
        <td className="nameCol">${proposalDetails.allStaff[index].name}</td>
        <td className="roleCol">${proposalDetails.allStaff[index].role}</td>  
      `;
      tr.appendChild(deleteTd);
      frag.appendChild(tr);
      staffTable.appendChild(frag);

    }
    setAddStaff({ name: '', role: '' });
  }, [proposalDetails.allStaff]);

  const handleDeleteStaffRole = (index, event) => {
    event.preventDefault();
    const newArr = [...proposalDetails.allStaff];
    newArr.splice(index, 1);
    setProposalDetails((proposalDetails) => ({ ...proposalDetails, allStaff: [...newArr] }))
  }


  /* HANDLES THE ADDED INTERNAL RESOURCE PERSON FOR THE EVENT */
  const internalTable = document.getElementById('internalTable');
    // const getFromPerson = () => {
    //   let radios = document.getElementsByName('fromPerson');

    //   for (var i = 0; i < radios.length; i++) {
    //     if (radios[i].checked) {
    //       fromPersonnnn = radios[i].value
    //       return;
    //     }
    //   }
    // }
  const addNewInternalResourceButton = (event) => {
    event.preventDefault();
    const intType = document.getElementById('internalType').value;
    const intName = document.getElementById('internalName').value;
    const intDesignation = document.getElementById('internalDesignation').value;
    const intCompany = document.getElementById('internalCompany').value;
    const intEmail = document.getElementById('internalEmail').value;
    const intPhone = document.getElementById('internalPhone').value;
    const intCategory = document.getElementById('internalCategory').value;
    let fromPersonnnn = '';

    let radios = document.getElementsByName('fromPerson');

      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          fromPersonnnn = radios[i].value
          break;
        }
      }
    console.log(fromPersonnnn)
    let obj = {
      fromPerson: fromPersonnnn, internalType: intType, internalName: intName, internalDesignation: intDesignation,
      internalCompany: intCompany, internalEmail: intEmail, internalPhone: intPhone, internalCategory: intCategory
    };
    setProposalDetails({ ...proposalDetails, internalResourcePerson: [...proposalDetails.internalResourcePerson, obj] });
  }

  useEffect(() => {
    const parentContainer = document.getElementById('internalTable');
    parentContainer.innerHTML = "";

    for (let index = 0; index < proposalDetails.internalResourcePerson.length; index++) {
      const divContainer = document.createElement('div');
      divContainer.classList.add('min-h-[auto]', 'w-[100%]', 'flex', 'bg-whitesmoke', 'text-backgroundBlue', 'rounded-lg', 'border-2', 'mt-1');


      const onemain = document.createElement('div');
      onemain.className = "flex flex-col w-[15%]"

      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'w-[100%] min-h-[40px] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center rounded-tl-md';
      categoryDiv.textContent = proposalDetails.internalResourcePerson[index].fromPerson;

      onemain.appendChild(categoryDiv)

      const fromPersonDiv = document.createElement('div');
      fromPersonDiv.className = 'w-[100%] min-h-[40px] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center rounded-bl-md';
      fromPersonDiv.textContent = proposalDetails.internalResourcePerson[index].internalCategory;

      onemain.appendChild(fromPersonDiv)

      divContainer.appendChild(onemain);

      const innerDiv = document.createElement('div');
      innerDiv.className = 'w-[85%] min-h-[100%]';

      const firstRowDiv = document.createElement('div');
      firstRowDiv.className = 'min-h-[50%] w-[100%] flex';

      const typeDiv = document.createElement('div');
      typeDiv.className = 'w-[30%] min-h-[100%] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center';
      typeDiv.textContent = proposalDetails.internalResourcePerson[index].internalType;
      firstRowDiv.appendChild(typeDiv);

      const nameDiv = document.createElement('div');
      nameDiv.className = 'w-[35%] min-h-[100%] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center overflow-hidden';
      nameDiv.textContent = proposalDetails.internalResourcePerson[index].internalName;
      firstRowDiv.appendChild(nameDiv);

      const designationDiv = document.createElement('div');
      designationDiv.className = 'w-[35%] overflow-hidden min-h-[100%] leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center overflow-hidden rounded-tr-md';
      designationDiv.textContent = proposalDetails.internalResourcePerson[index].internalDesignation;
      firstRowDiv.appendChild(designationDiv);

      innerDiv.appendChild(firstRowDiv);

      const secondRowDiv = document.createElement('div');
      secondRowDiv.className = 'min-h-[50%] w-[100%] flex';

      const companyDiv = document.createElement('div');
      companyDiv.className = 'w-[30%] min-h-[100%] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center overflow-hidden';
      companyDiv.textContent = proposalDetails.internalResourcePerson[index].internalCompany;
      secondRowDiv.appendChild(companyDiv);

      const emailDiv = document.createElement('div');
      emailDiv.className = 'w-[35%] min-h-[100%] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center overflow-hidden';
      emailDiv.textContent = proposalDetails.internalResourcePerson[index].internalEmail;
      secondRowDiv.appendChild(emailDiv);

      const phoneDiv = document.createElement('div');
      phoneDiv.className = 'w-[35%] min-h-[100%] overflow-hidden leading-[17px] border-solid border-[1px] border-backgroundBlue flex justify-center items-center overflow-hidden rounded-br-md';
      phoneDiv.textContent = proposalDetails.internalResourcePerson[index].internalPhone;
      secondRowDiv.appendChild(phoneDiv);

      innerDiv.appendChild(secondRowDiv);

      divContainer.appendChild(innerDiv);
      parentContainer.appendChild(divContainer);
    }

    console.log(proposalDetails)
    setAddInternalResourse({
      fromPerson: '',
      internalType: '',
      internalName: '',
      internalDesignation: '',
      internalCompany: '',
      internalEmail: '',
      internalPhone: '',
      internalCategory: ''
    });
  }, [proposalDetails.internalResourcePerson]);



  /* DISPLAYING THE SELECTED IMAGES */


  useEffect(() => {
    const handleImageInputChange = (event) => {
      const files = event.target.files;//important
      if (files) {
        setImage(event.target.files)

        const imagePreview = document.getElementById('imageContainer');
        imagePreview.innerHTML = '';

        setProposalDetails(proposalDetails => ({
          ...proposalDetails,
          svgImages: files.length
        }));

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.maxHeight = '150px';
            imagePreview.appendChild(imgElement);
          };
        }

        console.log(proposalDetails)

      }
    };



    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', handleImageInputChange);

    // Clean up the event listener when the component unmounts
    return () => {
      imageInput.removeEventListener('change', handleImageInputChange);
    };
  }, []);



  const uploadImage = async (e) => {
    e.preventDefault();
    if (image.length === 0) return;

    const confirmation = confirm("Are you sure to upload the selected images? Once you uploaded you cant change it!")

    if (confirmation) {
      const urls = [];
      for (let index = 0; index < image.length; index++) {
        let oneUnikId = v4();
        setProposalDetails(proposalDetails => { return { ...proposalDetails, svgImagesURLS: [...proposalDetails.svgImagesURLS, oneUnikId] } })
        const imageRef = ref(storage, `images/${index + oneUnikId}`);
        await uploadBytes(imageRef, image[index]);
        const downloadURL = await getDownloadURL(imageRef);
        urls.push(downloadURL);
      }
      // for (const oneimage of image) {
      //   const imageRef = ref(storage, `images/${oneimage.name + v4() }`);
      //   await uploadBytes(imageRef, oneimage);
      //   const downloadURL = await getDownloadURL(imageRef);
      //   urls.push(downloadURL);
      // }

      setImage([]);
      setOptions({ ...options, imageUploaded: true })
      alert("Images Uploaded!!!");
    }
  };


  return (
    <>
      <NavBar name={name.toUpperCase()} />
      <div className="h-[200px] w-[320px] bg-whiteSmoke fixed right-5 top-32 border-solid border-[3px] border-secondBorderColor rounded-lg flex flex-col justify-center items-center">
        {/* <div className="control-group">
          <label className="control control-checkbox">
            Include PA
            <input type="checkbox" value={options.pasystem} onChange={e => { setOptions({ ...options, pasystem: !options.pasystem }); setProposalDetails({ ...proposalDetails, pasystem: [] }) }} />
            <div className="control_indicator"></div>
          </label>
          <label className="control control-checkbox">
            Include Hall Booking
            <input type="checkbox" value={options.hallbooking} onChange={e => { setOptions({ ...options, hallbooking: !options.hallbooking }); setProposalDetails({ ...proposalDetails, hallbooking: [] }) }} />
            <div className="control_indicator"></div>
          </label>
          <label className="control control-checkbox">
            Include Refreshment
            <input type="checkbox" value={options.refreshment} onChange={e => {
              setOptions({ ...options, refreshment: !options.refreshment }); setProposalDetails({
                ...proposalDetails, refreshment: {
                  forenoonTea: 0,
                  afternoonTea: 0,
                  forenoonCoffee: 0,
                  afternooncoffee: 0,
                  forenoonSnacks: 0,
                  afternoonSnacks: 0,
                  breakfast: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                  lunch: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                  dinner: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                }
              })
            }} />
            <div className="control_indicator"></div>
          </label>
          <label className="control control-checkbox">
            Include Budget
            <input type="checkbox" value={options.budget} onChange={e => { setOptions({ ...options, budget: !options.budget }); setProposalDetails({ ...proposalDetails, budget: [] }) }} />
            <div className="control_indicator"></div>
          </label>
        </div> */}

        <div className="control-group">
          <div className="flex space-x-5 text-orange font-[600]">
            <p>No</p>
            <p>Yes</p>
            <p>Options</p>
          </div>
          <div className="flex space-x-4">
            <label className="control control-radio">
              <input type="radio" name="pa" value="exclude" onChange={e => { console.log(options); setOptions({ ...options, pasystem: false }); setProposalDetails({ ...proposalDetails, pasystem: [] }); console.log(+ options) }} />
              <div className="control_indicator flex justify-center items-center text-white"><RxCross2 /></div>
            </label>
            <label className="control control-radio">
              <input type="radio" name="pa" value="include" checked={options.pasystem} onChange={e => { setOptions({ ...options, pasystem: true }); setProposalDetails({ ...proposalDetails, pasystem: [] }) }} />
              Include PA
              <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
            </label>
          </div>

          <div className="flex space-x-4">
            <label className="control control-radio">
              <input type="radio" name="hallbooking" value="exclude" onChange={e => { setOptions({ ...options, hallbooking: false }); setProposalDetails({ ...proposalDetails, hallbooking: [] }) }} />
              <div className="control_indicator flex justify-center items-center text-white"><RxCross2 /></div>
            </label>
            <label className="control control-radio">
              <input type="radio" name="hallbooking" value="include" checked={options.hallbooking} onChange={e => { setOptions({ ...options, hallbooking: true }); setProposalDetails({ ...proposalDetails, hallbooking: [] }) }} />
              Include Hall Booking
              <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
            </label>
          </div>

          <div className="flex space-x-4">
            <label className="control control-radio">
              <input type="radio" name="refreshment" value="exclude" onChange={e => {
                setOptions({ ...options, refreshment: false }); setProposalDetails({
                  ...proposalDetails, refreshment: {
                    forenoonTea: 0,
                    afternoonTea: 0,
                    forenoonCoffee: 0,
                    afternooncoffee: 0,
                    forenoonSnacks: 0,
                    afternoonSnacks: 0,
                    breakfast: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                    lunch: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                    dinner: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                  }
                })
              }} />
              <div className="control_indicator flex justify-center items-center text-white"><RxCross2 /></div>
            </label>
            <label className="control control-radio">
              <input type="radio" name="refreshment" value="include" checked={options.refreshment} onChange={e => {
                setOptions({ ...options, refreshment: true, budget: true }); setProposalDetails({
                  ...proposalDetails, refreshment: {
                    forenoonTea: 0,
                    afternoonTea: 0,
                    forenoonCoffee: 0,
                    afternooncoffee: 0,
                    forenoonSnacks: 0,
                    afternoonSnacks: 0,
                    breakfast: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                    lunch: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                    dinner: { vegMenu: '', vegQnty: 0, nonvegMenu: '', nonvegQnty: 0 },
                  }
                })
              }} />
              Include Refreshment
              <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="control control-radio">
              <input type="radio" name="budget" value="exclude" onChange={e => { setOptions({ ...options, budget: false }); setProposalDetails({ ...proposalDetails, budget: [] }) }} />
              <div className="control_indicator flex justify-center items-center text-white"><RxCross2 /></div>
            </label>
            <label className="control control-radio">
              <input type="radio" name="budget" value="include" checked={options.budget} onChange={e => { setOptions({ ...options, budget: true }); setProposalDetails({ ...proposalDetails, budget: [] }) }} />
              <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
              Include Budget
            </label>
          </div>
        </div>

      </div>
      <form onSubmit={handleFormSubmit}>
        <div id="mainSingle" className="createProposalMainPage">
          <div className="formMainCont">
            <div className="flex items-center justify-start mb-5">
              <div className=' bg-orange mt-3 ml-3 h-[80px] w-[80px] left-[-100px] rounded-[100%] flex justify-center items-center'>
                <Link to={`/home/${name}`} className=' bg-white h-[70px] w-[70px] left-[260px] rounded-[100%] flex justify-center items-center text-[30px]'><FaArrowLeft /></Link>
              </div>
              <h1 className="fromMainHeading self-center ml-[20%]">Create New Proposal</h1>
            </div>


            <div className="oneInputCont">
              <div className="nameForINput">Faculty Coordinator</div>
              <div className="formInputBoxCont">
                :
                <input
                  className="formInputBox w-[95%]"
                  type="text"
                  value={proposalDetails.author}
                  readOnly
                  tabIndex={2}
                />
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Event Type</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={3}
                  value={proposalDetails.evType}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, evType: event.target.value }) }}
                >
                  <option>--</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Contest - Quiz">Contest - Quiz</option>
                  <option value="Contest - Debugging">Contest - Debugging</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Faculty Developer Program">Faculty Developer Program</option>
                </select>
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Event No</div>
              <div className="formInputBoxCont">
                :
                <input
                  className="formInputBox w-[95%]"
                  type="text"
                  value={proposalDetails.evNum}
                  readOnly
                  tabIndex={2}
                />
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Event Name</div>
              <div className="formInputBoxCont">
                :
                <input
                  className="formInputBox w-[95%]"
                  type="text"
                  value={proposalDetails.evName}
                  onChange={(event) => setProposalDetails({ ...proposalDetails, evName: event.target.value })}
                  tabIndex={1}
                />
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Event Level</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={12}
                  value={proposalDetails.evLevel}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, evLevel: event.target.value }) }}
                >
                  <option>--</option>
                  <option value="state">State</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                  <option value="college">College</option>
                  <option value="otherinstitutions">Other Institutions</option>
                </select>
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Organizing Department</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={3}
                  value={proposalDetails.dept}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, dept: [...proposalDetails.dept, event.target.value] }) }}
                >
                  <option>--</option>
                  <option value="cse">CSE</option>
                  <option value="it">IT</option>
                  <option value="ece">ECE</option>
                  <option value="ete">ETE</option>
                  <option value="mech">MECH</option>
                  <option value="cyber">CYBER</option>
                  <option value="aids">AIDS</option>
                  <option value="cst">CST</option>
                  <option value="csd">CSD</option>
                </select>
                <div className="multipleOptionsBox formInputBox w-[95%]" id="deptItemContainer">
                  {/* <p className="onedept" id="1">CSE <button className="deleteButton" onClick={() => handleDeleteDep(1, event)}>O</button></p> */}
                </div>
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Association Clubs</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={4}
                  value={proposalDetails.assoClub}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, assoClub: [...proposalDetails.assoClub, event.target.value] }) }}
                >
                  <option>--</option>
                  <option value="my campus club">My Campus Club</option>
                  <option value="sdc">SDC</option>

                </select>
                <div className="multipleOptionsBox formInputBox w-[95%]" id="assoClubItemContainer">

                </div>
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Association Dept. | NSC</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={4}
                  value={proposalDetails.assoDept}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, assoDept: [...proposalDetails.assoDept, event.target.value] }) }}
                >
                  <option>--</option>
                  <option value="cse">CSE</option>
                  <option value="it">IT</option>
                  <option value="ece">ECE</option>
                  <option value="ete">ETE</option>
                  <option value="mech">MECH</option>
                  <option value="cyber">CYBER</option>
                  <option value="aids">AIDS</option>
                  <option value="cst">CST</option>
                  <option value="csd">CSD</option>
                </select>
                <div className="multipleOptionsBox formInputBox w-[95%]" id="assoDeptItemContainer">

                </div>
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Date of the Event</div>
              <div className="formInputBoxCont dateInputBoxCont ">
                :
                <input
                  className="formInputBox dateINputBox date1 w-[44%]"
                  type="date"
                  tabIndex={5}
                  value={proposalDetails.date.start}
                  onChange={(event) => { setProposalDetails((proposalDetails) => ({ ...proposalDetails, date: { ...proposalDetails.date, start: event.target.value } })) }}

                />
                to
                <input
                  className="formInputBox dateINputBox date2 w-[44%]"
                  type="date"
                  tabIndex={6}
                  value={proposalDetails.date.end}
                  onChange={(event) => { setProposalDetails((proposalDetails) => ({ ...proposalDetails, date: { ...proposalDetails.date, end: event.target.value } })) }}
                />
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Time of the Event</div>
              <div className="formInputBoxCont dateInputBoxCont">
                :
                <input
                  className="formInputBox dateINputBox date1 w-[44%]"
                  type="time"
                  tabIndex={7}
                  value={proposalDetails.time.start}
                  onChange={(event) => { setProposalDetails((proposalDetails) => ({ ...proposalDetails, time: { ...proposalDetails.time, start: event.target.value } })) }}
                />
                to
                <input
                  className="formInputBox dateINputBox date2 w-[44%]"
                  type="time"
                  tabIndex={8}
                  value={proposalDetails.time.end}
                  onChange={(event) => { setProposalDetails((proposalDetails) => ({ ...proposalDetails, time: { ...proposalDetails.time, end: event.target.value } })) }}
                />
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Event Mode</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={9}
                  value={proposalDetails.evMode}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, evMode: event.target.value }) }}
                >
                  <option>--</option>
                  <option value="Offline - Within campus">{`Offline - Within campus `}</option>
                  <option value="Offline - Out of campus">{`Offline - Out of campus `}</option>
                  <option value="Online - Within campus">{`Online - Within campus `}</option>
                  <option value="Online - Out of campus">{`Online - Out of campus `}</option>
                </select>
              </div>
            </div>

            <div className="oneInputCont">
              <div className="nameForINput">Event For</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption  w-[95%]" tabIndex={10}
                  value={proposalDetails.evFor}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, evFor: event.target.value }) }}
                >
                  <option>--</option>
                  <option value="Student">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Student and Teachers">Students And Teachers</option>
                </select>
              </div>
            </div>

            {/* <div className="oneInputCont">
              <div className="nameForINput">Event Level</div>
              <div className="formInputBoxCont">
                :
                <select className="formInputBox selectOption w-[95%]" tabIndex={12}
                  value={proposalDetails.evLevel}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, evLevel: event.target.value }) }}
                >
                  <option>--</option>
                  <option value="college">College</option>
                  <option value="interCollege">Inter College</option>
                </select>
              </div>
            </div> */}

            <div className="oneInputCont">
              <div className="nameForINput">Venue</div>
              <div className="formInputBoxCont">
                :
                <input
                  className="formInputBox w-[95%]"
                  type="text"
                  tabIndex={13}
                  value={proposalDetails.venue}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, venue: event.target.value }) }}
                />
              </div>
            </div>

            {/* <div className="oneInputCont">
              <div className="nameForINput">Student - Internal</div>
              <div className="formInputBoxCont">
                :
                <input
                  className="formInputBox w-[95%]"
                  type="number"
                  tabIndex={14}
                  value={proposalDetails.stuCount}
                  onChange={(event) => { setProposalDetails({ ...proposalDetails, stuCount: event.target.value }) }}
                />
              </div>
            </div> */}

            <br />
            <div className="nameForINput">Related SDG : </div>
            <div className="oneInputCont addIMageContainer">
              <div className="imageContainer" id="imageContainer"></div>
              <input multiple id="imageInput" className="imageINput" type="file" accept="image/*" tabIndex={15} />
              <div className="flex">
                {
                  !options.imageUploaded ?
                    <>
                      <label htmlFor="imageInput" className="addIMageBtn">Add Images</label>
                    </>
                    :
                    <></>
                }
                {
                  proposalDetails.svgImages !== 0 && !options.imageUploaded ?
                    <>
                      <button onClick={(e) => uploadImage(e)} className='addIMageBtn ml-5'>Submit</button>
                    </>
                    :
                    <>
                      <button disabled onClick={(e) => uploadImage(e)} className='addIMageBtn ml-5 opacity-40 cursor-not-allowed'>Submit</button>
                    </>
                }
                {
                  options.imageUploaded ? <div className=" text-green rounded-[100%] px-5"><IoIosCloudDone className="text-[30px] " /></div> : <></>
                }

              </div>
            </div>

            <br />
            <div className="nameForINput">Involved Staffs : </div>
            <div className="involvedStffCont">
              <table className="staffTable">
                <tbody>
                  <tr className="firstRow">
                    <td className="snoCol">S. No</td>
                    <td className="nameCol">Name</td>
                    <td className="roleCol">Role</td>
                    <td className="deleteCol bg-backgroundBlue text-white">Delete</td>
                  </tr>
                </tbody>
              </table>

            </div>

            <div className="involvedStffCont">
              <table className="staffTable" id="staffTable">
                <tbody>
                  {proposalDetails.allStaff.map((staff, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{staff.name}</td>
                      <td>{staff.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="staffInfoInputCont">
              <input
                className="formInputBox staffInput"
                id="staffname"
                type="text"
                value={addStaff.name}
                onChange={(event) => { setAddStaff({ ...addStaff, name: event.target.value }) }}
                placeholder="Staff Name"
                tabIndex={13}
              />
              <input
                className="formInputBox staffInput"
                id="staffrole"
                type="text"
                value={addStaff.role}
                onChange={(event) => { setAddStaff({ ...addStaff, role: event.target.value }) }}
                placeholder="Role"
                tabIndex={14}
              />
              <button className="addNewStaffButton" id="addNewStaffButton"
                onClick={(event) => addNewStaffButton(event)}
              ><LuPlusCircle /></button>
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
            <div className="involvedStffCont">
              <div className="w-[96%]" id="internalTable">

              </div>
            </div>

            <div className="staffInfoInputCont mb-[-10px] mt-8">
              <fieldset>
                <legend>From</legend>
                <div className="flex w-[95%] justify-evenly">
                  <label className="control control-radio" htmlFor="internalRadio">
                    <input type="radio" id="internalRadio" name="fromPerson" value="Internal"
                       />
                    Internal
                    <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
                  </label>
                  <label className="control control-radio" htmlFor="externalRadio">
                    <input type="radio" id="externalRadio" name="fromPerson" value="External"
                      />
                    External
                    <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Category</legend>
                <input
                  className=" formInputBox staffInput legendInput"
                  id="internalCategory"
                  type="text"
                  tabIndex={14}
                  value={addInternalResourse.internalCategory}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalCategory: e.target.value })}
                />
              </fieldset>
            </div>
            <div className="staffInfoInputCont">
              <fieldset>
                <legend>Type</legend>
                <input
                  className="formInputBox staffInput legendInput"
                  id="internalType"
                  type="text"
                  tabIndex={14}
                  value={addInternalResourse.internalType}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalType: e.target.value })}
                />
              </fieldset>

              <fieldset>
                <legend>Resource Person Name</legend>
                <input
                  className="formInputBox staffInput legendInput"
                  id="internalName"
                  type="text"
                  tabIndex={13}
                  value={addInternalResourse.internalName}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalName: e.target.value })}
                />
              </fieldset>

            </div>
            <div className="staffInfoInputCont mt-0">
              <fieldset>
                <legend>Designation</legend>
                <input
                  className="formInputBox staffInput legendInput"
                  id="internalDesignation"
                  type="text"
                  tabIndex={14}
                  value={addInternalResourse.internalDesignation}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalDesignation: e.target.value })}
                />
              </fieldset>
              <fieldset>
                <legend>Company</legend>
                <input
                  className="formInputBox staffInput legendInput"
                  id="internalCompany"
                  type="text"
                  tabIndex={13}
                  value={addInternalResourse.internalCompany}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalCompany: e.target.value })}
                />
              </fieldset>
            </div>
            <div className="staffInfoInputCont mt-0">
              <fieldset>
                <legend>Email</legend>
                <input
                  className="formInputBox staffInput legendInput"
                  id="internalEmail"
                  type="text"
                  tabIndex={14}
                  value={addInternalResourse.internalEmail}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalEmail: e.target.value })}
                />
              </fieldset>
              <fieldset>
                <legend>Phone</legend>
                <input
                  className="formInputBox staffInput legendInput"
                  id="internalPhone"
                  type="number"
                  tabIndex={13}
                  value={addInternalResourse.internalPhone}
                  onChange={e => setAddInternalResourse({ ...addInternalResourse, internalPhone: e.target.value })}
                />
              </fieldset>

            </div>
            <button className="addNewStaffButton mr-auto ml-auto p-2 text-2xl mt-1" id="addNewInteralResourceButton"
              onClick={(event) => addNewInternalResourceButton(event)}
            ><LuPlusCircle /></button>
            <br />



            <div className="nameForINput">Event Objective : </div>
            <div className="textAreaCont">
              <textarea className="outcomeText" rows={5}
                value={proposalDetails.objective}
                onChange={(event) => { setProposalDetails({ ...proposalDetails, objective: event.target.value }) }}
              ></textarea>
            </div>

            <br />

            <div className="nameForINput">Event Outcome : </div>
            <div className="textAreaCont">
              <textarea className="outcomeText" rows={5}
                value={proposalDetails.outcome}
                onChange={(event) => { setProposalDetails({ ...proposalDetails, outcome: event.target.value }) }}
              ></textarea>
            </div>

            <br />
            {/* <div className="nameForINput">Event Summary : </div>
            <div className="textAreaCont">
              <textarea className="summaryText"
                value={proposalDetails.summary}
                onChange={(event) => { setProposalDetails({ ...proposalDetails, summary: event.target.value }) }}
              ></textarea>
            </div> */}

          </div>
        </div>
        {
          options.pasystem ? <PASystemBox proposalDetails={proposalDetails} setProposalDetails={setProposalDetails} /> : <></>
        }
        {
          options.hallbooking ? <HallBooking proposalDetails={proposalDetails} setProposalDetails={setProposalDetails} /> : <></>
        }
        {
          options.refreshment ? <RefreshmentBox proposalDetails={proposalDetails} setProposalDetails={setProposalDetails} /> : <></>
        }
        {
          options.budget || options.refreshment ? <BudgetBox proposalDetails={proposalDetails} setProposalDetails={setProposalDetails} /> : <></>
        }
        <div className="flex justify-center">
          {
            (options.budget !== '' && options.hallbooking !== '' && options.pasystem !== '' && options.refreshment !== '' && options.imageUploaded !== '') ?
              <button className="mb-10 w-40 bg-backgroundBlue font-semibold text-white px-3 py-2 mt-3 rounded-md">Submit</button>
              :
              <button disabled className="mb-10 w-40 opacity-[0.5] cursor-not-allowed bg-backgroundBlue font-semibold text-white px-3 py-2 mt-3 rounded-md">Submit</button>
          }
        </div>
      </form>
    </>
  );
};

export default CreateProposal;
