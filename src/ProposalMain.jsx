import React from 'react'
import { Link } from 'react-router-dom'

const ProposalMain = ({ name, proposals }) => {

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const proposal = proposals.filter(one => {
    const startDate = new Date(one.date.start);
    startDate.setHours(0, 0, 0, 0);
    return startDate >= currentDate;
  })
  console.log(proposals)
  // const proposal = {
  //     author: "nantha",
  //     evNum: "KCEEV001",
  //     evName: "Event 1",
  //     date: {
  //         start: "29/08/2004",
  //         end: "29/08/2004"
  //     },
  //     hodapproval : "approved",
  //     principalapproval: "waiting"
  // }
  return (
    <>
      <div className='parentOfTwo oneRight'>
        <div className='oneMainCont rightMain'>
          <div className='oprions flex justify-center items-end h-[50%] w-[100%] '>
            <Link to={`/createproposal/${name}`} className='optionsCardContainer'>
              <div className='cardContentContainer'>
                Create New <br />Proposal
              </div>
            </Link>
            <Link to={`/pastproposals/${name}`} className='optionsCardContainer'>
              <div className='cardContentContainer'>
                View Past <br />Proposals
              </div>
            </Link>
          </div>

          {proposals.length > 0 &&
            <>
              <p className='ml-[50px] font-sans text-[25px] mt-5 text-backgroundBlue font-[600] text-center decoration-backgroundBlue decoration-solid underline'>Current Proposal</p>

              <div className='overflow-y-auto h-[42%] pb-[50px]  pt-5'>
                {proposal.map((prop, index) => (
                  <Link className='w-[100%] flex justify-center' to={`/userProposalView/${prop._id}`} key={index}>
                    <div className='shadow-allBox  oneProposal h-[150px] w-[80%] rounded-[40px]  rounded-bl-none bg-white mb-[15px] p-[15px] border-solid border-borderColor border-1 hover:cursor-pointer'>
                      <p className='proposalFrom text-[15px] text-zinc-600 ml-[25px] mb-5'>Proposal By <span className='underline text-backgroundBlue text-[18px]'>{prop.author.toUpperCase()}</span></p>
                      <div className='flex w-[100%] h-[90%]'>
                        <div className='w-[50%] h-[50%] flex justify-around  items-center '>
                          <div>
                            <p className='text-[12px]'>Event Number</p>
                            <p className='number text-[20px] font-[600] text-orange'>{prop.evNum}</p>
                          </div>
                          <div>
                            <p className='text-[12px]'>Event Name</p>
                            <p className='name text-[20px] font-[600] text-backgroundBlue'>{prop.evName}</p>
                          </div>
                          <div>
                            <p className='text-[12px]'>Event Date</p>
                            <p className='name text-[20px] font-[600] text-backgroundBlue'>{prop.date.start}</p>
                          </div>
                        </div>
                        <div className='w-[50%] flex justify-around'>
                          <div>
                            <p className='text-[12px]'>HOD Approval</p>
                            {
                              prop.hodapproval === "waiting" ?
                                <p className='name text-[18px] font-[600] bg-bgYellow px-3 mt-[10px] text-txtYellow rounded-[15px]'>• Waiting</p>
                                : prop.hodapproval === "approved" ?
                                  <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p>
                                  : <p className='name text-[18px] font-[600] px-3 mt-[10px] bg-bgRed text-txtRed rounded-[15px]'>• Denied</p>
                            }
                            {/* <p className='name text-[18px] font-[600] bg-bgGreen px-3 mt-[10px] text-txtGreen rounded-[15px]'>• Approved</p> */}
                          </div>
                          <div>
                            <p className='text-[12px]'>PRINCIPAL Approval</p>
                            {
                              prop.principalapproval === "waiting" ?
                                <p className='name text-[18px] font-[600] bg-bgYellow px-3 mt-[10px] text-txtYellow rounded-[15px]'>• Waiting</p>
                                : prop.principalapproval === "approved" ?
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
            </>
          }
        </div>
      </div>
    </>
  )
}

export default ProposalMain
