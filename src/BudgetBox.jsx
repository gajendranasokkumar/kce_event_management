import React from 'react'
import { LuPlusCircle } from "react-icons/lu";
import { useEffect, useState } from 'react';



const BudgetBox = ({ proposalDetails, setProposalDetails }) => {

    // console.log("In budgetBox");
    // console.log(proposalDetails)
    // setProposalDetails({...proposalDetails , evLevel: "national"})
    // console.log(proposalDetails)


    /* HANDLES THE ADDED BUDGET FOR THE EVENT */

    let refreshmentTotalAmt = (proposalDetails.refreshment.forenoonTea * 7) +
    (proposalDetails.refreshment.forenoonCoffee * 10) +
    (proposalDetails.refreshment.forenoonSnacks * 8) +
    (proposalDetails.refreshment.lunch.vegQnty * proposalDetails.refreshment.lunch.vegMenu.match(/\d+$/)) +
    (proposalDetails.refreshment.lunch.nonvegQnty * proposalDetails.refreshment.lunch.nonvegMenu.match(/\d+$/)) +
    (proposalDetails.refreshment.afternoonTea * 7) +
    (proposalDetails.refreshment.afternooncoffee * 10) +
    (proposalDetails.refreshment.afternoonSnacks * 8)


    const [addBudget,setAddBudget] = useState({expense :'', amount : 0});
    const [totalAmt , setTotalAmt] = useState(refreshmentTotalAmt !== 0 ? refreshmentTotalAmt : 0);

    const budgetTable = document.getElementById('budgetTable');
    const addNewBudgetButton = (event) => {
        event.preventDefault();
        const oneExpense = document.getElementById('oneExpense').value;
        const oneAmount = document.getElementById('oneAmount').value;
        setTotalAmt(totalAmt + parseInt(oneAmount));
        if(oneAmount !== '' && oneAmount !== 0)
        {
            let obj = { expense: oneExpense, amount: oneAmount };
            setProposalDetails({ ...proposalDetails, budget: [...proposalDetails.budget, obj] });
        }
        
    }

    useEffect(()=>{
        setProposalDetails({...proposalDetails , refreshmentTotalAmt : refreshmentTotalAmt})
    }, [refreshmentTotalAmt])

    useEffect(() => {
        document.getElementById('budgetTable').innerHTML = "";
        for (let index = 0; index < proposalDetails.budget.length; index++) {
            const frag = document.createDocumentFragment();
            const tr = document.createElement('tr');
            tr.classList.add('subTR');

            const btn = document.createElement('button');
            btn.classList.add('deleteButtonStaff');
            btn.innerText = "✕";

            const deleteTd = document.createElement('td');
            deleteTd.classList.add('deleteCol');
            deleteTd.appendChild(btn);
            deleteTd.onclick = (event) => handleDeleteAmountRole(index, event);

            tr.innerHTML = `
        <td class="snoCol">${index + 2}</td>
        <td class="nameCol">${proposalDetails.budget[index].expense}</td>
        <td class="roleCol">${proposalDetails.budget[index].amount}</td>  
      `;
            tr.appendChild(deleteTd);
            frag.appendChild(tr);
            budgetTable.appendChild(frag);

        }
        setAddBudget({ expense: '', amount: '' });
    }, [proposalDetails.budget]);

    const handleDeleteAmountRole = (index, event) => {
        event.preventDefault();
        const newArr = [...proposalDetails.budget];
        newArr.splice(index, 1);
        setTotalAmt(totalAmt - parseInt(proposalDetails.budget[index].amount))
        setProposalDetails((proposalDetails) => ({ ...proposalDetails, budget: [...newArr] }))
    }


    // useEffect(()=>{
    //     let total = 0;
    //     if(proposalDetails.budget.length !== 0)
    //     proposalDetails.budget.forEach(element => {
    //         total += parseInt(element.amount)
    //     });
    //     setTotalAmt(total)
    // },[proposalDetails.budget])


    return (
        <>
            <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">Budget Form</h1>
            <div className='p-3 border-[3px] border-solid border-secondBorderColor min-h-[300px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                <div className="involvedStffCont">
                    <table className="staffTable">
                        <tbody>
                            <tr className="firstRow">
                                <td className="snoCol">S. No</td>
                                <td className="nameCol">Expense</td>
                                <td className="roleCol">Amount (Rs)</td>
                                <td className="deleteCol bg-backgroundBlue text-white">Delete</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Refreshment Total</td>
                                <td>{refreshmentTotalAmt}</td>
                                <td>---</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="involvedStffCont">
                    <table className="staffTable" id="budgetTable">
                        <tbody>
                            {proposalDetails.budget.map((exe, index) => (
                                <tr key={index}>
                                    <td>{index + 2}</td>
                                    <td>{exe.name}</td>
                                    <td>{exe.role}</td>
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
                                <th className="border-[#2B7E5A] border-[2px] border-solid bg-[#2B7E5A] text-white rounded-none" id='totalAmount'>{totalAmt + refreshmentTotalAmt}</th>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className="staffInfoInputCont">
                    <input
                        
                        className="formInputBox staffInput"
                        id="oneExpense"
                        type="text"
                        placeholder="Expense"
                        tabIndex={13}
                        value={addBudget.expense}
                        onChange={e=>setAddBudget({...addBudget, expense: e.target.value})}
                    />
                    <input
                        
                        className="formInputBox staffInput"
                        id="oneAmount"
                        type="number"
                        placeholder="Amount"
                        tabIndex={14}
                        value={addBudget.amount}
                        onChange={e=>setAddBudget({...addBudget, amount: e.target.value})}
                    />
                    <button className="addNewStaffButton" id="addNewBudgetButton"
                        onClick={(event) => addNewBudgetButton(event)}
                    ><LuPlusCircle /></button>
                </div>
            </div>
        </>
    )
}

export default BudgetBox