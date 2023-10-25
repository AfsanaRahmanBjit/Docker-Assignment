import React, { useContext } from 'react';
import ThemeContext from './ThemeContext'; // Import the context

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})
    </button>
  );
};

export default ThemeToggleButton;