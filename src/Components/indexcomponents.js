import React, { useState } from 'react';
import './indexcomponents.css'
import img1 from '../img/New_page.png'
import NDAform from './ndaform';
import Thankyou from './thankyou';
import SearchModal from './searchmodal';
import Terminatemodal from './terminatemodal';
import Ammendmodal from './ammendmodal';

const Indexcomponent = (props)=>{

    const [currentview, SetmodalView] = useState(false)
    const [currentsearchView, Setsearchview] = useState(false)
    const [currentterminateView, Setterminateview] = useState(false)
    const [ammendView, Setammendview] = useState(false)


    const ThankUpdateHandler = ()=>{
        SetmodalView(true)
            
    }


    const ModalUpdateHandler = ()=>{
        SetmodalView(true)
            
    }
    const SearchUpdateHandler = ()=>{
        Setsearchview(true)
            
    }
    const TerminateUpdateHandler = ()=>{
        Setterminateview(true)
            
    }
    const Closemodal = () =>{
        SetmodalView(null)
    }
    

    const ReadingUserInput = (data)=>{
        // console.log(data)

    }
    const AmmendUpdateHandler = ()=>{
        Setammendview(true)
    }
    return(

        
         <React.Fragment  >
        <header>
            <div className="header">
            <div className="logo-container">
                 
                <p className="l-automate">L-automate</p>
            </div>
             
            <div className="header-options">
                <div>ABOUT</div>
                <div>BLOG</div>
                <div>CONTACT</div>
                <div>JOIN OUR TEAM</div>
                <button className="demo">BOOK A DEMO</button>
                
            </div>

            </div>
            
        </header>
        <body  >
            <div className="first-section"   >
            <div className="section-one">
                <div className="transformation">

                <h1 className="writing"> IMPROVE YOUR LEGAL OPERATIONS. </h1>
                 
                <p className="paragraph-1">
                We help In-house Legal Teams establish efficient contract Process and manage legal requesrs from different departments.
                </p>
                <button className="Demo-booking">BOOK A DEMO</button>
                </div>
            </div>
            <div className="section-two">
                 <img src={img1} className="paragraph-2" alt="DataAnalytics" />   
            </div>
            </div>
            <div className="third-section">

     <div className="contract-creation-container">
        <h2 className="contract-creation">Automate Several Legal Operations Workflow in Seconds through our Tech Tools</h2>
         
        
        </div>
        <div className="grid-container">
    <div className="grid-item">
    <button className="jorja" onClick={ModalUpdateHandler} >Create an NDA</button>
    {currentview && <NDAform SaveItem={ReadingUserInput}  onClose={Closemodal} />}
     
     
    </div>
    <div className="grid-item"> 
    <button className="jorja">Create a Vendor Contract</button>
    
    </div>
    <div className="grid-item"><button className="jorja">Create an SLA</button> </div>
    
</div>

<div className="fourth-section">
<div className="fourth-contract-creation-container"></div>
        <h2 className="fourth-contract-creation">Other Contract Workflow Automations</h2>
    
<div className="grid-container">
    <div className="grid-item">
    <button className="jorja" onClick={SearchUpdateHandler} >Search a Contract</button>
    {currentsearchView && <SearchModal/>}
     
     
    </div>
    <div className="grid-item"> 
    <button className="jorja" onClick={TerminateUpdateHandler}>Terminate a Contract</button>
    {currentterminateView && <Terminatemodal/>}
    
    </div>
    <div className="grid-item"><button className="jorja" onClick={AmmendUpdateHandler}>Ammend a Contract</button>
    {ammendView && <Ammendmodal/>}
    </div>
    
    
</div>
</div>




        </div>

        

            
            </body>


        

         </React.Fragment>
    )
   

}

export default Indexcomponent