import React, { useContext } from 'react';
import MyContext from './MyContext'; 
const SomeComponent = () => {
  const { data, setData } = useContext(MyContext);

  const handleButtonClick = () => {
    setData('New Data');
  };

  return (
    <div>
      <p style={{color:"darkOrange"}}>Data from context: {data}</p>
      <button style={{color:"white", border:"none", background:"darkOrange"}} onClick={handleButtonClick}>Change Data</button>
    </div>
  );
};

export default SomeComponent;