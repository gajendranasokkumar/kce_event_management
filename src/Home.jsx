import React from 'react' 
import ring1 from './ring 1.png'
import ring2 from './ring 2.png'
import HomeOptions from './HomeOptions';
import ProposalMain from './ProposalMain';
import NavBar from './NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import Message from './Message';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Home = () => {

  const navigate = useNavigate();
  const {name} = useParams();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const getProposalDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/proposalview");
        console.log(response.data)
        setProposals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProposalDetails();
  }, []);


  
  useEffect(() => {
    const sessionName = sessionStorage.getItem("userName");
    if (name !== sessionName) {
      setSessionExpired(true);
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }
  }, [name, navigate]);



  let arr = proposals.filter(one=>one.author===name);


  if (sessionExpired) {
    return <Message message={"Something Went Wrong"} status={false} />;
  }
  return (
    <>
    <NavBar name={name.toUpperCase()}/>
    <div className='proposalMainContainer' id='mainSingle'>
        <div className='parentOfTwo oneLeft'>
            <div className='oneMainCont leftMain'>
                <img className='ring1 ' src={ring1} />
                <h1 className='proposalQuote text-[45px]'>Proposals Made Easier</h1>
                <img className='ring2' src={ring2} />
            </div>
        </div>
        {/* {proposals.length > 0 && <ProposalMain name={name} proposals={arr} />} */}
        <ProposalMain name={name} proposals={proposals.filter(one=>one.author===name)}/>
    </div>
    </>
  )
}

export default Home