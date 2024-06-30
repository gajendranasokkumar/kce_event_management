import React from 'react' 
import ring1 from './ring 1.png'
import ring2 from './ring 2.png'
import HomeOptions from './HomeOptions';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import ProposalMain from './ProposalMain';
import NavBar from './NavBar';



const Home = () => {
  return (
    <>
    <NavBar />
    <div className='proposalMainContainer'>
        <div className='parentOfTwo oneLeft'>
            <div className='oneMainCont leftMain'>
                <img className='ring1 mt-[-150px]' src={ring1} />
                <h1 className='proposalQuote text-[45px]'>Proposals Made Easier</h1>
                <img className='ring2' src={ring2} />
            </div>
        </div>
        <ProposalMain />
    </div>
    </>
  )
}

export default Home