import "./App.css";
import "./Media.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import CreateProposal from "./CreateProposal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeOptions from "./HomeOptions";
import ProposalMain from "./ProposalMain";
import ProposalView from "./ProposalView";
import SingleProposalView from "./SingleProposalView";
import NavBar from "./NavBar";
import HODProposalView from "./HODProposalView";
import HODSingleProposalView from "./HODSingleProposalView";
import PastProposals from "./PastProposals";
import UpdateAfterApproval from "./UpdateAfterApproval";
import UserProposalView from "./UserProposalView";
import App22 from "./App22";
import Loader from "./Loader";
import Uploadimage from "./Uploadimage";
import NewComp from "./NewComp"
import SpeechToText from "./SpeechToTest";




function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/new" element={<NewComp />} />
        <Route path="/speech" element={<SpeechToText />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp  />} />
        <Route path="/home/:name" element={<Home />} />
        {/* <Route path="/proposals" element={<ProposalMain />} /> */}
        <Route path="/createproposal/:name" element={<CreateProposal />} />
        <Route path="/proposalview" element={<ProposalView />} />
        <Route path="/download" element={<App22 />} />
        <Route path="/hodproposalview" element={<HODProposalView />} />
        <Route path="/proposalview/:oneproposal" element={<SingleProposalView />} />
        <Route path="/userProposalView/:oneproposal" element={<UserProposalView />} />
        <Route path="/hodproposalview/:oneproposal" element={<HODSingleProposalView />} />
        <Route path="/pastproposals/:name" element={<PastProposals  />} />
        <Route path="/updateProposal/:oneproposal" element={<UpdateAfterApproval  />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/uploadimg" element={<Uploadimage />} />

      </Routes>
    </BrowserRouter>




      {/* <Login
        userName={userName}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <SignUp 
        newUserName={newUserName}
        setNewUsername={setNewUsername}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
      />
      <NavBar />
      <Home />
      <CreateProposal /> */}

    </>
  );
}

export default App;
