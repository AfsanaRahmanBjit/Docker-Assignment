import React, { useState, useEffect } from "react";
import "./timer.style.scss";

function Timer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [backgroundColor, setBackgroundColor] = useState("#F5F5DC");
  const [textColor, setTextColor] = useState("");
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");

  const colorOptions = [
    { label: "Red", value: "#FF5733" },
    { label: "Green", value: "#33FF57" },
    { label: "Blue", value: "#5733FF" },
    { label: "Yellow", value: "#FFFF33" },
    { label: "Pink", value: "#EE82EE" },
    { label: "Sky Blue", value: "#87CEEB" },
    { label: "Orange", value: "#FFA500" }
  ];

  const textColorOptions = [
    { label: "Black", value: "#000000" },
    { label: "White", value: "#FFFFFF" }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBackgroundColorChange = () => {
    setBackgroundColor(selectedBackgroundColor);
  };

  const handleTextColorChange = () => {
    setTextColor(selectedTextColor);
  };

  return (
    <>
      <div className="timer-header-style"></div>
      <div style={{ backgroundColor }}>
        <div className="timer-container">
          <div className="timer-style" style={{ color: textColor }}>
            Time: {time}
          </div>
        </div>
        <div className="selector-style">
          <select
            className="button-style"
            value={selectedBackgroundColor}
            onChange={(e) => setSelectedBackgroundColor(e.target.value)}
          >
            <option value="">Select a Background Color</option>
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="button-style"
            onClick={(e) => {
              e.stopPropagation();
              handleBackgroundColorChange();
              alert("Do you want to change the background color of the timer?");
            }}
          >
            Change Background Color
          </button>
          <select
            className="button-style"
            value={selectedTextColor}
            onChange={(e) => setSelectedTextColor(e.target.value)}
          >
            <option value="">Select a Text Color</option>
            {textColorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="button-style"
            onClick={(e) => {
              e.stopPropagation();
              handleTextColorChange();
              alert("Do you want to change the text color of the timer?");
            }}
          >
            Change Text Color
          </button>
        </div>
      </div>
      <div className="timer-header-style"></div>
    </>
  );
}

export default Timer;
