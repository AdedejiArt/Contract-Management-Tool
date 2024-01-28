import React, { useState, useRef,   } from 'react';
import axios from 'axios';
import './ndaform.css';
import Thankyouammend from './ammendthankyou';


const organizationId =1008911
const apiKey = "MGNdDMNUR6mttBPrigTO8g"
const payloadr={
    "invitations": {
      "a.roheem@alustudent": {
        "permission": "NO_EDIT"
        
      }
    },
    "message": {
      "subject": "Invitation to sign",
      "content": "Hello, this is an invite for a Non-Disclosure Agreement.",
      "name": "Internal message name"
    },
    "saveMessage": false,
    "sendWithDocument": false
  }
  const payloadt = {
    "organizationId": 1008911,
    "source": {
      "uid": '02tGNbJFhvFrm9TjBOa8GS',
      "templatingParameters": {
        "property1": "string",
        "property2": "string"
      }
    },
    "folderId": 1155050,
    "status": "DRAFT",
    "parametersSource": "NONE",
    "title": "Ammended Agreement",
    "description": "This Ammends the agreement between two parties.",
    "tags": [
      "string"
    ],
    "parties": {
        'Party A': {
          name: 'John Doe',
          email: 'a.roheem@alustudent.com',
        },
        'Party B': {
          name: 'Jane Smith',
          email: 'adiobusrat@gmail.com',
        },
      },
    
  };
const Ammendform = (props) => {


  const nameInputRef = useRef();
  const locationInputRef = useRef();
  const paymentInputRef = useRef();
  const serviceInputRef = useRef();
   

   

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

   

    const enteredName = nameInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredPayment = paymentInputRef.current.value;
    const enteredService = serviceInputRef.current.value;
     

    const formData = {
      Name: enteredName,
      Location: enteredLocation,
      Payment: enteredPayment,
      Service: enteredService,
       
    };
    //  
    
    
    
         
    
    nameInputRef.current.value =""
    locationInputRef.current.value=""
    paymentInputRef.current.value = ""
    serviceInputRef.current.value = ""
     

    const selectedOption = props.selectedOption.value

    

    async function fetchData() {
        try {
          const response = await axios.get(`/api/rest/1/organizations/1008911/agreements/${selectedOption}/versions/last/fields`, {
            headers: {
              'X-API-KEY': apiKey
            }
          });
      
          const existingFields = response.data.fields;
          const fieldsList = existingFields.map(field => ({
            uuid: field.uuid,
            placeholder: field.placeholder,
            values: field.values || []
          }));
      
          const fieldValueMap = {
            'Payment Frequency': enteredPayment,
            'Clientlocation': enteredLocation,
            'Clientfullname': enteredName,
            'Service Fee': enteredService
            // Add more placeholder-value mappings as needed
          };
          const updatedFieldValues = fieldsList.map(field => ({
            uuid: field.uuid,
            values: [fieldValueMap[field.placeholder]]
          }));
          const fieldData = {
            fields: []
          };
          updatedFieldValues.forEach(field => {
            const { uuid, values } = field;
      
            if (uuid && values) {
              fieldData.fields.push({
                ...field,
                required: true,
                type: 'TEXT',
                reservation: {
                  type: 'NONE'
                }
              });
            } else {
              console.error('Field is missing required properties:', field);
            }
          });
      
          await axios.patch(
            `/api/rest/1/organizations/1008911/agreements/${selectedOption}/versions/last/fields`,
            fieldData,
            {
              headers: {
                'X-API-KEY': apiKey
              }
            }
          );
      
         await axios.post(
            `/api/rest/1/organizations/1008911/agreements/${selectedOption}/signature/request`,
            {
              headers: {
                'X-API-KEY': apiKey
              },
            }
          );
          
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
       
       


     
     
  };
  
  const [currentview, SetmodalView] = useState(false)
    const ModalUpdateHandler = ()=>{
       
        SetmodalView(true)
        
            
    }
    

  return (
    <form onSubmit={formSubmissionHandler} >
      <div className="overlay"  >
        <div className="card">
          <div className="card-body">
            <div className="username-input">
              <label className="username-label">
                What is the Name of the recipient of this contract
              </label>
              <input
                ref={nameInputRef}
                type="text"
                className="username-input-field"
              />
            </div>
            <div className="username-input">
              <label className="username-label">What is the Client Location</label>
              <input
                ref={locationInputRef}
                type="text"
                className="username-input-field"
              />
            </div>
            <div className="username-input">
              <label className="username-label">What is the Payment Frequency</label>
              <input
                ref={paymentInputRef}
                type="text"
                className="username-input-field"
              />
            </div>
            <div className="username-input">
              <label className="username-label">What is the Service Fee</label>
              <input
                ref={serviceInputRef}
                type="text"
                className="username-input-field"
              />
            </div>
             
            <button type="submit" className="user-button" onClick={ModalUpdateHandler}  >
              Create Contract
            </button>
            {currentview && <Thankyouammend/>}
             

          </div>
        </div>
      </div>
    </form>
  );
};

export default Ammendform;
