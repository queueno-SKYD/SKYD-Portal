import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import url from "../../api/url.ts"
import useAxios from '../../api/restClient';
import { dangerToast } from '../customToast/index.js';

const UserSearch = ({multiSelections, setMultiSelections, placeHolder="Search for a user..."}) => {
 const [isLoading, setIsLoading] = useState(false);
 const [options, setOptions] = useState([]);
 const axios = useAxios()

 const handleSearch = async (query) => {
    setIsLoading(true);
    // Your function to search users
    try {
      setIsLoading(true);
      const response = await axios.post(url.searchUsers, {
        query
      });
      if(response.statusCode === 200){
        const output = response?.data;
        setOptions(output)
      }
    } catch (error) {
      dangerToast(error.message)
    } finally {
      setIsLoading(false)
    }
 };

 return (
  <AsyncTypeahead
    id="basic-typeahead-multiple"
    isLoading={isLoading}
    labelKey="email" // Assuming email is unique and can be used as identifier
    onSearch={handleSearch}
    options={options}
    onChange={setMultiSelections}
    selected={multiSelections}
    placeholder={placeHolder}
    multiple
    style={{width: "100%"}}
    renderMenuItemChildren={(option, props, idx) => (
      <div>
        <span>{option.firstName} {option.lastName}</span>
        <br />
        <small>{option.email}</small>
      </div>
    )}
  />
 );
};

export default UserSearch;
