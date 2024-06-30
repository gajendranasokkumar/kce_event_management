import React from 'react'
import { LuPlusCircle } from "react-icons/lu";
import { useEffect, useState } from 'react';



const PASystemBox = ({ proposalDetails, setProposalDetails }) => {


    const [newItems,setNewItems] = useState({item :'', qnty : 0});

    const paTable = document.getElementById('paTable');
    const addNewPAITEMButton = (event) => {
        event.preventDefault();
        const oneItem = document.getElementById('oneItem').value;
        const oneQnty = document.getElementById('oneQnty').value;
        if(oneQnty !== '' && oneQnty !== 0)
        {
            let obj = { item: oneItem, qnty: oneQnty };
            setProposalDetails({ ...proposalDetails, pasystem: [...proposalDetails.pasystem, obj] });
        }
        
    }

    useEffect(() => {
        document.getElementById('paTable').innerHTML = "";
        for (let index = 0; index < proposalDetails.pasystem.length; index++) {
            const frag = document.createDocumentFragment();
            const tr = document.createElement('tr');
            tr.classList.add('subTR');

            const btn = document.createElement('button');
            btn.classList.add('deleteButtonStaff');
            btn.innerText = "✕";

            const deleteTd = document.createElement('td');
            deleteTd.classList.add('deleteCol');
            deleteTd.appendChild(btn);
            deleteTd.onclick = (event) => handleDeletePAItem(index, event);

            tr.innerHTML = `
        <td class="snoCol">${index + 1}</td>
        <td class="nameCol">${proposalDetails.pasystem[index].item}</td>
        <td class="roleCol">${proposalDetails.pasystem[index].qnty}</td>  
      `;
            tr.appendChild(deleteTd);
            frag.appendChild(tr);
            paTable.appendChild(frag);

        }
        setNewItems({ item: '', qnty: '' });
    }, [proposalDetails.pasystem]);

    const handleDeletePAItem = (index, event) => {
        event.preventDefault();
        const newArr = [...proposalDetails.pasystem];
        newArr.splice(index, 1);
        setProposalDetails((proposalDetails) => ({ ...proposalDetails, pasystem: [...newArr] }))
    }


    return (
        <>
            <h1 className="text-center text-[25px] text-backgroundBlue self-center mt-10">PA Form (Public Address)</h1>
            <div className='p-3 border-[3px] border-solid border-secondBorderColor min-h-[250px] w-[50vw] bg-whiteSmoke rounded-xl ml-auto mr-auto'>
                <div className="involvedStffCont">
                    <table className="staffTable">
                        <tbody>
                            <tr className="firstRow">
                                <td className="snoCol">S. No</td>
                                <td className="nameCol">Item</td>
                                <td className="roleCol">Quantity</td>
                                <td className="deleteCol bg-backgroundBlue text-white">Delete</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="involvedStffCont">
                    <table className="staffTable" id="paTable">
                        <tbody>
                            {proposalDetails.pasystem.map((exe, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{exe.item}</td>
                                    <td>{exe.qnty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="staffInfoInputCont">
                    <select className="formInputBox selectOption w-[40%]" tabIndex={3}
                        id='oneItem'
                        value={newItems.item}
                        onChange={(event) => { setNewItems({...newItems, item: event.target.value}) }}
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
                        onChange={(event) => { setNewItems({...newItems, qnty: event.target.value}) }}
                    />
                    <button className="addNewStaffButton" id="addNewBudgetButton"
                        onClick={(event) => addNewPAITEMButton(event)}
                    ><LuPlusCircle /></button>
                </div>
            </div>
        </>
    )
}

export default PASystemBox