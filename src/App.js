import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-url.com/bfhl', jsonData);
      setResponseData(res.data);
    } catch (error) {
      alert('Invalid JSON input or error in API call');
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const filteredData = {};
    selectedOptions.forEach(option => {
      filteredData[option.value] = responseData[option.value] || [];
    });
    return (
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON: {"data": ["A", "C", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>
      <Select
        isMulti
        options={options}
        onChange={setSelectedOptions}
        placeholder="Select Response Fields"
      />
      <div>
        <h2>Response:</h2>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
