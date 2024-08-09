import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import ring1 from './ring 1.png'
import ring2 from './ring 2.png'
import { Link } from 'react-router-dom';
import Message from './Message';
import { IoIosSearch } from "react-icons/io";
import { PiSortAscendingBold } from "react-icons/pi";
import { MdFilterAlt } from "react-icons/md";


const HODProposalView = () => {
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getProposalDetails = async () => {
      try {
        const response = await axios.get("https://emsbackend-ten.vercel.app/proposalview");
        setProposals(response.data);
        setFilteredProposals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProposalDetails();
  }, []);


  
  const sortByDate = (field) => {
    const sortedProposals = [...filteredProposals].sort((a, b) => {
      if (a.date[field] < b.date[field]) {
        return -1;
      }
      if (a.date[field] > b.date[field]) {
        return 1;
      }
      return 0;
    });

    setFilteredProposals(sortedProposals);
  };

  const sortByField = (field) => {
    const sortedProposals = [...filteredProposals].sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });

    setFilteredProposals(sortedProposals);
  };


  const filterByField = (field) => {
    let filteredArray;
    if(field === 'all')
    {
      filteredArray = proposals;
    }
    else if(field === 'current')
    {
      filteredArray = proposals.filter(obj =>
        obj.hodapproval === 'waiting' || obj.principalapproval === 'waiting'
      );
    }
    else if(field === 'past')
    {
      filteredArray = proposals.filter(obj =>
        obj.hodapproval !== 'waiting' && obj.principalapproval !== 'waiting'
      );
    }
    else
    {
      filteredArray = proposals.filter(obj =>
        obj.hodapproval === field
      );
    }

    setFilteredProposals(filteredArray);
  };


  useEffect(()=>{
    const filteredArray = proposals.filter(obj =>
      Object.values(obj).some(value =>
        typeof value === 'string' && (value.toLowerCase()).includes(searchValue)
      )
    );

    setFilteredProposals(filteredArray);

  },[searchValue])

  return (
    <>
      {/* <ul>
        {proposals.map((proposal, index) => (
          <li key={index}>
            <p>{index}</p>
            <p>Event Number: {proposal.evNum}</p>
            <p>Event Name: {proposal.evName}</p>
          </li>
        ))}
      </ul> */}

      <NavBar name={"HOD CSE"} />
      <div className="h-[100vh] bg-whiteSmoke flex ">
        <div className='parentOfTwo oneLeft '>
          <div className='oneMainCont leftMain'>
            <img className='ring1 mt-[-10px]' src={ring1} />
            <h1 className='proposalQuote text-[45px]'>Proposals Made Easier</h1>
            <img className='ring2' src={ring2} />
          </div>
        </div>
        <div className='h-[100vh] w-[70%] pt-[130px] px-[50px] bg-white overflow-y-auto bg-rocket bg-cover bg-blend-multiply'>
          <div className='h-[70px] w-[100%] bg-whiteSmoke border-borderColor border-2 rounded-t-lg  border-b-4 border-b-backgroundBlue border-solid flex items-center justify-between'>
            <label htmlFor='search' className='bg-white flex items-center shadow-lightBox  rounded-lg h-10 w-72 ml-5 pl-3 justify-between'>
              <input type='text' id='search' className='w-[80%] text-[20px] bg-white focus:outline-none' placeholder='Search By Anything' value={searchValue} onChange={e=>setSearchValue(e.target.value)}></input>
              <IoIosSearch className='text-[20px] mr-5 text-backgroundBlue font-[800]' />
            </label>
            <div className='flex'>
              <div className='relative mr-5 bg-white w-[150px] text-[18px] shadow-lightBox p-1 rounded-lg group hover:bg-backgroundBlue hover:text-white'>
                <p className=' flex items-center justify-center'><PiSortAscendingBold className='mr-2' /> Sort By</p>
                <div className='absolute left-0 right-0 top-[35px] bg-white  hidden group-hover:block text-backgroundBlue rounded-lg'>
                  <button className='text-center flex items-center h-[40px] justify-center w-[100%] hover:bg-backgroundBlue rounded-lg hover:text-white' onClick={()=>sortByDate('start')}> Starting Date</button>
                  <button className='text-center flex items-center h-[40px] justify-center w-[100%] hover:bg-backgroundBlue rounded-lg hover:text-white' onClick={()=>sortByDate('end')}> Ending Date</button>
                  <button className='text-center flex items-center h-[40px] justify-center w-[100%] hover:bg-backgroundBlue rounded-lg hover:text-white' onClick={()=>sortByField('author')}>Staff Name</button>
                </div>
              </div>
              <div className='relative mr-5 bg-white w-[180px] shadow-lightBox text-[18px] p-1 rounded-lg group hover:bg-backgroundBlue hover:text-white'>
                <p className='flex items-center justify-center '><MdFilterAlt className='mr-2' /> Filter By</p>
                <div className='absolute left-0 right-0 top-[35px] bg-white  hidden group-hover:block text-backgroundBlue rounded-lg'>
                  <button className='text-center flex items-center h-[40px] justify-center w-[100%] hover:bg-backgroundBlue rounded-lg hover:text-white' onClick={()=>filterByField('approved')}>Approved By HOD</button>
                  <button className='text-center flex items-center h-[40px] justify-center w-[100%] hover:bg-backgroundBlue rounded-lg hover:text-white' onClick={()=>filterByField('denied')}>Denied By HOD</button>
                </div>

              </div>
            </div>
          </div>
          <div className='w-[100%] h-[85px] bg-whiteSmoke rounded-b-lg border-2 border-t-backgroundBlue border-solid border-borderColor mb-5 flex justify-evenly items-center'>
            <button className='shadow-lightBox h-[60px] w-[250px] bg-white text-backgroundBlue font-semibold rounded-md hover:text-white focus:text-white active:text-white hover:bg-backgroundBlue focus:bg-backgroundBlue active:bg-backgroundBlue flex justify-center items-center text-[20px] focus:outline-none'
              onClick={()=>filterByField('all')}
            >
              All Proposal
            </button>
            <button className='shadow-lightBox h-[60px] w-[250px] bg-white text-backgroundBlue font-semibold rounded-md hover:text-white focus:text-white active:text-white hover:bg-backgroundBlue focus:bg-backgroundBlue active:bg-backgroundBlue flex justify-center items-center text-[20px] focus:outline-none'
              onClick={()=>filterByField('current')}
            >
              Current Proposal
            </button>
            <button className='shadow-lightBox h-[60px] w-[250px] bg-white text-backgroundBlue font-semibold rounded-md hover:text-white focus:text-white active:text-white hover:bg-backgroundBlue focus:bg-backgroundBlue active:bg-backgroundBlue flex justify-center items-center text-[20px] focus:outline-none'
              onClick={()=>filterByField('past')}
            >
              Past Proposal
            </button>
          </div>
          {
            filteredProposals.length === 0 ? 
            <div className='h-[70%] w-[100%] flex justify-center items-center bg-whiteSmoke text-borderColor text-[50px] rounded-lg'>Nothing to show</div>
            : 
            filteredProposals.map((proposal, index) => (
            <Link to={`/hodproposalview/${proposal._id}`} key={index}>
              <div className='oneProposal h-[150px] rounded-[40px] rounded-bl-none bg-whiteSmoke w-[100%] mb-[15px] p-[15px] border-solid border-borderColor border-2 hover:cursor-pointer hover:shadow-allBox'>
                <p className='proposalFrom text-[15px] text-zinc-600 ml-[25px]'>Proposal from <span className='underline text-backgroundBlue text-[18px]'>{proposal.author.toUpperCase()}</span></p>
                <div className='flex w-[100%] h-[90%]'>
                  <div className='w-[50%] h-[100%] flex justify-around  items-center'>
                    <div>
                      <p className='text-[12px]'>Event Number</p>
                      <p className='number text-[20px] font-[600] text-orange'>{proposal.evNum}</p>
                    </div>
                    <div>
                      <p className='text-[12px]'>Event Number</p>
                      <p className='name text-[20px] font-[600] text-backgroundBlue'>{proposal.evName}</p>
                    </div>
                    <div>
                      <p className='text-[12px]'>Event Date</p>
                      <p className='name text-[20px] font-[600] text-backgroundBlue'>{proposal.date.start}</p>
                    </div>
                  </div>
                  <div className='w-[50%] flex justify-around'>
                    <div>
                      <p className='text-[12px]'>HOD Approval</p>
                      {
                        proposal.hodapproval === "waiting" ?
                          <p className='name text-[18px] font-[600] bg-bgYellow px-3 mt-[10px] text-txtYellow rounded-[15px]'>• Waiting</p>
                          : proposal.hodapproval === "approved" ?
                            <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p>
                            : <p className='name text-[18px] font-[600] px-3 mt-[10px] bg-bgRed text-txtRed rounded-[15px]'>• Denied</p>
                      }
                      {/* <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p> */}
                    </div>
                    <div>
                      <p className='text-[12px]'>PRINCIPAL Approval</p>
                      {
                        proposal.principalapproval === "waiting" ?
                          <p className='name text-[18px] font-[600] bg-bgYellow px-3 mt-[10px] text-txtYellow rounded-[15px]'>• Waiting</p>
                          : proposal.principalapproval === "approved" ?
                            <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p>
                            : <p className='name text-[18px] font-[600] px-3 mt-[10px] bg-bgRed text-txtRed rounded-[15px]'>• Denied</p>
                      }
                      {/* <p className='name text-[18px] font-[600] bg-bgYellow px-3 mt-[10px] text-txtYellow rounded-[15px]'>• Waiting</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* <Link to={`/proposalview/${10}`}>
            <div className='oneProposal h-[150px] rounded-[40px] rounded-bl-none bg-whiteSmoke w-[100%] mb-[15px] p-[15px] border-solid border-borderColor border-2 hover:cursor-pointer'>
              <p className='proposalFrom text-[15px] text-zinc-600 ml-[25px]'>Proposal from <span className='underline text-backgroundBlue text-[18px]'>Gajendran</span></p>
              <div className='flex w-[100%] h-[90%]'>
                <div className='w-[50%] h-[100%] flex justify-around  items-center'>
                  <div>
                    <p className='text-[12px]'>Event Number</p>
                    <p className='number text-[20px] font-[600] text-orange'>KCEEV001</p>
                  </div>
                  <div>
                    <p className='text-[12px]'>Event Number</p>
                    <p className='name text-[20px] font-[600] text-backgroundBlue'>Event Name</p>
                  </div>
                  <div>
                    <p className='text-[12px]'>Event Date</p>
                    <p className='name text-[20px] font-[600] text-backgroundBlue'>29/08/2004</p>
                  </div>
                </div>
                <div className='w-[50%] flex justify-around'>
                  <div>
                    <p className='text-[12px]'>HOD Approval</p>
                    <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p>
                  </div>
                  <div>
                    <p className='text-[12px]'>PRINCIPAL Approval</p>
                    <p className='name text-[18px] font-[600] bg-bgYellow px-3 mt-[10px] text-txtYellow rounded-[15px]'>• Waiting</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className='oneProposal h-[150px] rounded-[40px] rounded-bl-none bg-whiteSmoke w-[100%] mb-[15px] p-[15px] border-solid border-borderColor border-2 hover:cursor-pointer'>
            <p className='proposalFrom text-[15px] text-zinc-600 ml-[25px]'>Proposal from <span className='underline text-backgroundBlue text-[18px]'>Gajendran</span></p>
            <div className='flex w-[100%] h-[90%]'>
              <div className='w-[50%] h-[100%] flex justify-around  items-center'>
                <div>
                  <p className='text-[12px]'>Event Number</p>
                  <p className='number text-[20px] font-[600] text-orange'>KCEEV001</p>
                </div>
                <div>
                  <p className='text-[12px]'>Event Number</p>
                  <p className='name text-[20px] font-[600] text-backgroundBlue'>Event Name</p>
                </div>
                <div>
                  <p className='text-[12px]'>Event Date</p>
                  <p className='name text-[20px] font-[600] text-backgroundBlue'>29/08/2004</p>
                </div>
              </div>
              <div className='w-[50%] flex justify-around'>
                <div>
                  <p className='text-[12px]'>HOD Approval</p>
                  <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p>
                </div>
                <div>
                  <p className='text-[12px]'>PRINCIPAL Approval</p>
                  <p className='name text-[18px] font-[600] px-3 mt-[10px] bg-bgRed text-txtRed rounded-[15px]'>• Denied</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HODProposalView;
