import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ndaform.css';
import Thankyou from './thankyou';

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
const NDAform = (props) => {
  const nameInputRef = useRef();
  const locationInputRef = useRef();
  const paymentInputRef = useRef();
  const serviceInputRef = useRef();
  const emailInputRef = useRef();

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

   

    const enteredName = nameInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredPayment = paymentInputRef.current.value;
    const enteredService = serviceInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const formData = {
      Name: enteredName,
      Location: enteredLocation,
      Payment: enteredPayment,
      Service: enteredService,
      Email: enteredEmail,
    };
    props.SaveItem(formData);
    
    
    
         
    
    nameInputRef.current.value =""
    locationInputRef.current.value=""
    paymentInputRef.current.value = ""
    serviceInputRef.current.value = ""
    emailInputRef.current.value=""



    const payload = {
        "organizationId": 1008911,
        "source": {
          "uid": "02tGNSNFiLBmiRn1ggIFd0",
          "templatingParameters": {
            "property1": "string",
            "property2": "string"
          }
        },
        "folderId": 1155050,
        "status": "DRAFT",
        "parametersSource": "NONE",
        "title": "Non-Disclosure Agreement",
        "description": "This NDA covers the company for 10 years.",
        "tags": [
          "string"
        ],
        "parties": {
            'Party A': {
              name: 'John Doe',
              email: 'a.roheem@alustudent.com',
            },
            // 'Party B': {
            //   name: 'Jane Smith',
            //   email: 'adiobusrat@gmail.com',
            // },
          },
        
      };
      payload["title"] = `${enteredName}_NDA_Agreement`
      payloadr.invitations[enteredEmail] = payloadr.invitations['a.roheem@alustudent'];
      // delete payloadr.invitations['a.roheem@alustudent'];


    try {
        const response = await axios.post(
            `/api/rest/1/organizations/1008911/agreements`,
          payload,
          {
            headers: {
                'X-API-KEY': "MGNdDMNUR6mttBPrigTO8g"
            },
          }
        );
      // Handle the response as needed
       const postId = response.data.id;
       console.log(postId)
       try {
        const response = await axios.get(`/api/rest/1/organizations/${organizationId}/agreements/${postId}/versions/last/fields`, {
          headers: {
            'X-API-KEY': apiKey
          }
        });
      
        const existingFields = response.data.fields;
      
        // Extract the list of fields into an array of dictionaries
        const fieldsList = existingFields.map(field => ({
          uuid: field.uuid,
          placeholder: field.placeholder,
          values: field.values || []
        }));
      
        // const uuidList = fieldsList.map(field => field.uuid);
      
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
      
        // Iterate over the fields and ensure required properties are present
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
      
        try {
          const updateResponse = await axios.patch(`/api/rest/1/organizations/${organizationId}/agreements/${postId}/versions/last/fields`, fieldData, {
            headers: {
              'X-API-KEY': apiKey
            }
          });
          console.log('Field values updated:', updateResponse.data);
        } catch (updateError) {
          console.error('Error updating field values:', updateError.response.data);
        }
      
        try {
          await axios.post(`/api/rest/1/organizations/${organizationId}/agreements/${postId}/members`, payloadr, {
            headers: {
              'X-API-KEY': apiKey
            },
          });
        } catch (error) {
          console.error('Error adding members:', error.response.data);
        }
      } catch (error) {
        console.error('Error fetching field data:', error.response.data);
      }

      
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
     
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
            <div className="username-input">
              <label className="username-label">
                Enter the email address of the recipient
              </label>
              <input
                ref={emailInputRef}
                type="email"
                className="username-input-field"
              />
            </div>
            <button type="submit" className="user-button" onClick={ModalUpdateHandler}  >
              Create Contract
            </button>
            {currentview && <Thankyou/>}
             

          </div>
        </div>
      </div>
    </form>
  );
};

export default NDAform;
