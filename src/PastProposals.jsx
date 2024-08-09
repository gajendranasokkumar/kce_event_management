import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import ring1 from './ring 1.png'
import ring2 from './ring 2.png'
import { Link, useParams } from 'react-router-dom';
import Message from './Message';
import { FaArrowLeft } from "react-icons/fa6";




const PastProposals = () => {


  const { name } = useParams();

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const getProposalDetails = async () => {
      try {
        const response = await axios.get("https://emsbackend-ten.vercel.app/proposalview");
        console.log(response.data)
        let arr = response.data;
        setProposals(arr.filter(one => new Date(one.date.end) < new Date() && 
          new Date(one.date.end).toDateString() !== new Date().toDateString() && 
          new Date(one.date.start) < new Date() &&
          new Date(one.date.start).toDateString() !== new Date().toDateString() && one.author === name));
      } catch (error) {
        console.log(error);
      }
    };

    getProposalDetails();
  }, []);

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

      <NavBar name={name.toUpperCase()} />
      <div className='h-[100vh] bg-white flex justify-center'>
        <div className=' h-[100vh] w-[70%] pt-[130px] px-[50px] bg-white overflow-y-auto'>
          <div className=' mb-5 flex flex-row justify-between items-center'>
            <div className=' bg-orange  ml-3 h-[80px] w-[80px] left-[-100px] rounded-[100%] flex justify-center items-center'>
              <Link to={`/home/${name}`} className=' bg-white h-[70px] w-[70px] left-[260px] rounded-[100%] flex justify-center items-center text-[30px]'><FaArrowLeft /></Link>
            </div>
            <h1 className="fromMainHeading self-center">Past Proposals</h1>
          </div>
          {proposals.map((proposal, index) => (
            <Link to={`/updateProposal/${proposal._id}`} key={index}>
              <div className='oneProposal h-[150px] rounded-[40px] rounded-bl-none bg-whiteSmoke w-[100%] mb-[15px] p-[15px] border-solid border-borderColor border-2 hover:cursor-pointer'>
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
        </div>
      </div>
    </>
  );
};

export default PastProposals;
