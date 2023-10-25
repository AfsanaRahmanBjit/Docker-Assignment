import React, { useContext } from 'react';
import ThemeContext from './ThemeContext'; // Import the context

const ThemedComponent = () => {
  const { theme } = useContext(ThemeContext);

  const themeStyles = {
    light: {
      backgroundColor: 'white',
      color: 'black',
    },
    dark: {
      backgroundColor: 'black',
      color: 'white',
    },
  };

  return (
    <div style={themeStyles[theme]}>
      <h1>Themed Component</h1>
      <p>This component has a themed background and text color.</p>
    </div>
  );
};

export default ThemedComponent;