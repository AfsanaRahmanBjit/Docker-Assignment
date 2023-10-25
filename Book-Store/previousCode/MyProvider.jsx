import React, { useState } from 'react';
import MyContext from './MyContext'; 

const MyProvider = ({ children }) => {
  const [data, setData] = useState('Initial Data');

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;