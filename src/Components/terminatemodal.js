import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './searchmodal.css';
import Terminateform from './terminateform';

const Terminatemodal = () =>{
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentview, SetmodalView] = useState(false)

    useEffect(() => {
        fetchData();
      }, []);

    async function fetchData() {
        try {
          // Define the API endpoint and organization ID
          const apiEndpoint = '/api/rest/1/organizations/1008911/agreements';
          const organizationId = 1008911;
          const apiKey = 'MGNdDMNUR6mttBPrigTO8g';
    
          // Set the query parameters
          const queryParams = {
            organization: organizationId,
            type: 'NEGOTIATION',
            limit: 10,
            trashed: false,
            accessFromRole: false,
            search: '',
          };
    
          // Make the API request
          const response = await axios.get(apiEndpoint, {
            params: queryParams,
            headers: {
              'X-API-KEY': apiKey,
            },
          });
    
          const agreements = response.data;
    
          const mappedOptions = agreements.map((item) => ({
            label: item.metadata.title,
            value: item.uid,
          }));
    
          setOptions(mappedOptions);

           


        } catch (error) {
          console.error('Error occurred:', error.message);
        }
      }
      const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'rgb(5,31,106)' }),
        option: (styles) => ({ ...styles, backgroundColor: 'rgb(5,31,106)' }),
      };
      const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        SetmodalView(true)
      };

    return (
        <div>
        <Select
        styles={colorStyles}
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
      />
      {currentview && <Terminateform selectedOption = {selectedOption} />}
      </div>
      
    ) 

}

export default Terminatemodal