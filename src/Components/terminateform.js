import React, { useState, useRef } from 'react';
import axios from 'axios';
import Thankyouterminate from './thankyouterminate'
import './terminateform.css'

const apiKey = "MGNdDMNUR6mttBPrigTO8g"

const Terminateform = (props) =>{
  const [currentview,setcurrentview] =useState(false)

    
      const payloadr={
        "invitations": {
          "adiobusrat@gmail.com": {
            "permission": "NO_EDIT"
            
          }
        },
        "message": {
          "subject": "Invitation to sign",
          "content": "Hello, this is an invite for a termination contract.",
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
        "title": "Termination Agreement",
        "description": "This terminates the agreement between two parties.",
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
    const emailInput = useRef();
    const terminationdate = useRef();
    const lastdate = useRef();
    const reasons = useRef();

    

    const HandleTerminationsubmission = async(event)=>{
        event.preventDefault()

    const enteredemail = emailInput.current.value;
    const enteredtermination = terminationdate.current.value;
    const enteredlastdate = lastdate.current.value;
    const enteredreasons = reasons.current.value;


    emailInput.current.value = ""
    terminationdate.current.value =""
    lastdate.current.value = ""
    reasons.current.value = ""
    
    

    

        const selectedOption = props.selectedOption.value
        console.log(selectedOption)

        payloadt["title"] = `${enteredemail}_Termination_Contract`
        payloadr.invitations[enteredemail] = payloadr.invitations['adiobusrat@gmail.com'];

        async function updateAgreementStatus(selectedOption) {
          const queryparams = {
            "status": "BROKEN"
          };
        
          try {
            await axios.patch(`/api/rest/1/organizations/1008911/agreements/${selectedOption}`, queryparams, {
              headers: {
                 'X-API-KEY': apiKey
              }
            });
            
            console.log("Agreement status updated successfully!");
          } catch (error) {
            console.error("Failed to update agreement status:", error);
          }
        }

        try {
           updateAgreementStatus(selectedOption)
            const response = await axios.get(`/api/rest/1/organizations/1008911/agreements/${selectedOption}/versions/last/fields`, {
              headers: {
                'X-API-KEY': apiKey
              }
            });
          
            const oldexistingFields = response.data.fields;
          
            let clientLocationValues;
          
            // Iterate over the fields array
            for (const field of oldexistingFields) {
              if (field.placeholder === "Clientfullname") {
                // Found the object with placeholder "Clientlocation"
                // Access the values key
                clientLocationValues = field.values;
                break; // Exit the loop since we found the desired object
              }
            }
          
            const new_item = clientLocationValues[0];
            console.log(new_item);
            console.log(terminationdate)
             
             
          
            const agreementResponse = await axios.post(
              `/api/rest/1/organizations/1008911/agreements`,
              payloadt,
              {
                headers: {
                  'X-API-KEY': apiKey
                },
              }
            );
            const postId = agreementResponse.data.id;
            console.log(postId);
          
            const fieldsResponse = await axios.get(`/api/rest/1/organizations/1008911/agreements/${postId}/versions/last/fields`, {
              headers: {
                'X-API-KEY': apiKey
              }
            });
            const existingFields = fieldsResponse.data.fields;
            const fieldsList = existingFields.map(field => ({
              uuid: field.uuid,
              placeholder: field.placeholder,
              values: field.values || []
            }));
          
            const fieldValueMap = {
              'EmployeeName': new_item,
              'Termination Date': enteredtermination,
              'Last working Date': enteredlastdate,
              'Reasons': enteredreasons
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
            console.log(postId);
          
            const patchResponse = await axios.patch(
              `/api/rest/1/organizations/1008911/agreements/${postId}/versions/last/fields`,
              fieldData,
              {
                headers: {
                  'X-API-KEY': apiKey
                }
              }
            );
          
            await axios.post(
              `/api/rest/1/organizations/1008911/agreements/${postId}/members`,
              payloadr,
              {
                headers: {
                  'X-API-KEY': apiKey
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
   
          emailInput.current.value = ""
          terminationdate.current.value =""
           lastdate.current.value=""
           reasons.current.value=""
    }

     

    const Thankyoumodal =()=>{
      setcurrentview(true)


      

    }


   
     
    return (
<form  onSubmit={HandleTerminationsubmission}>
      <div className="overlay"  >
        <div className="card">
          <div className="card-body">
            <div className="username-input">
              <label className="username-label">
                Enter the Email address of the Person whose contract is to be terminated
              </label>
              <input
                ref={emailInput}
                type="text"
                className="username-input-field"
              />
            </div>
            <div className="username-input">
              <label className="username-label">Enter the termination Date</label>
              <input
                ref={terminationdate}
                type="text"
                className="username-input-field"
              />
            </div>
            <div className="username-input">
              <label className="username-label">Enter the Last working day</label>
              <input
                ref={lastdate}
                type="text"
                className="username-input-field"
              />
            </div>
            <div className="username-input">
              <label className="username-label">
                Enter the  reasons for the termination
              </label>
              <input
                ref={reasons}
                type="text"
                className="username-input-field"
              />
            </div>
            <button type="submit" className="user-button" onClick={Thankyoumodal} >
              Terminate Contract
            </button>
            {currentview && <Thankyouterminate></Thankyouterminate>}
             
             

          </div>
        </div>
      </div>
    </form>
    )
}

export default Terminateform