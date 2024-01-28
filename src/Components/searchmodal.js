import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './searchmodal.css';

const SearchModal = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const getContractPdf = async (organizationId, agreementUid) => {
      const apiKey = 'MGNdDMNUR6mttBPrigTO8g';
      try {
        const apiUrl = `/api/rest/1/organizations/${organizationId}/agreements/${agreementUid}.pdf`;

        // Make a GET request to retrieve the PDF
        const response = await axios({
          method: 'get',
          url: apiUrl,
          responseType: 'blob',
          headers: {
            'X-API-KEY': apiKey,
          },
        });

        // Create a Readable stream from the response data
        if (response.status === 200) {
          const blob = await response.data;
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'downloadedcontractfile.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('Failed to download PDF:', response.statusText);
        }
      } catch (error) {
        console.error('Error retrieving PDF:', error);
        throw error;
      }
    };

    if (selectedOption) {
      const agreementUid = selectedOption.value;
      getContractPdf(1008911, agreementUid);
    }
  }, [selectedOption]);


  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'rgb(5,31,106)' }),
    option: (styles) => ({ ...styles, backgroundColor: 'rgb(5,31,106)' }),
  };

  return (
    <Select
      styles={colorStyles}
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
    />
  );
};

export default SearchModal;
