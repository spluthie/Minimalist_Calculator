// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Display from './components/Display';

const title = "Simple calculator";





function App() {
  // --- State variables ---
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [isOperatorPressed, setIsOperatorPressed] = useState(false);
  const [history, setHistory] = useState("");





  // --- Button click handler ---
  const handleClick = (value) => {
    if (!isNaN(value)) {
      // Number pressed
      if (!isOperatorPressed) {
        const updated = firstNumber + value;
        setFirstNumber(updated);
        setHistory(prev => prev + value);
      } else {
        const updated = secondNumber + value;
        setSecondNumber(updated);
        setHistory(prev => prev + value);
      }
      setResult(""); // clear result until "="
    }
    else if (["+", "-", "*", "/"].includes(value)) {
      // Operator pressed
      if (firstNumber === "") return; // ignore if no first number
      if (!isOperatorPressed){
        setOperator(value);
        setIsOperatorPressed(true);
        setHistory(prev => prev + value);
        setResult("");
      }
      
      else if(isOperatorPressed&&secondNumber==""){
        setOperator(value);
        setIsOperatorPressed(true);
        setHistory(history.slice(0, -1));
        setHistory(prev => prev + value);
        setResult("");
      }
      else{
        return;
      }
      
    } 
    else if (value === "=") {
      // Equals pressed
      if (firstNumber === "" || secondNumber === "" || operator === "") return;

      const a = parseFloat(firstNumber);
      const b = parseFloat(secondNumber);
      let res;

      switch (operator) {
        case "+": res = a + b; break;
        case "-": res = a - b; break;
        case "*": res = a * b; break;
        case "/": res = b !== 0 ? a / b : "Error"; break;
        default: res = "Error";
      }

      setResult(res.toString());
      setHistory(res.toString()); // only show result now
      setFirstNumber(res.toString());
      setSecondNumber("");
      setOperator("");
      setIsOperatorPressed(false);
    } 
    else if (value === "C") {
      // Backspace
      if (isOperatorPressed && secondNumber !== "") {
        setSecondNumber(secondNumber.slice(0, -1));
        setHistory(history.slice(0, -1));
      } else if (!isOperatorPressed && firstNumber !== "") {
        setFirstNumber(firstNumber.slice(0, -1));
        setHistory(history.slice(0, -1));
      }
      else if(isOperatorPressed && secondNumber==""){
          setHistory(history.slice(0, -1));
          setIsOperatorPressed(false);
      }
    } 
    else if (value === "AC") {
      // Clear all
      setFirstNumber("");
      setSecondNumber("");
      setOperator("");
      setResult("");
      setIsOperatorPressed(false);
      setHistory("");
      setHistory(result);
    }
  };






  // --- Keyboard support ---
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (!isNaN(key)) handleClick(key); // numbers
      else if (["+", "-", "*", "/"].includes(key)) handleClick(key); // operators
      else if (key === "Enter") handleClick("="); // equals
      else if (key === "Backspace") handleClick("C"); // delete last
      else if (key === "Escape") handleClick("AC"); // clear all
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [firstNumber, secondNumber, operator, history, isOperatorPressed]);





  return (
    <div className="App">
      <h1>{title}</h1>
      <Display value={history} />

      {/* Number buttons */}
      {["1","2","3","4","5","6","7","8","9","0"].map(num => (
        <Button key={num} label={num} onClick={() => handleClick(num)} />
      ))}

      {/* Operator buttons */}
      {["+","-","*","/"].map(op => (
        <Button key={op} label={op} onClick={() => handleClick(op)} />
      ))}

      {/* Special buttons */}
      <Button label="=" onClick={() => handleClick("=")} />
      <Button label="C" onClick={() => handleClick("C")} />
      <Button label="AC" onClick={() => handleClick("AC")} />
    </div>
  );
}

export default App;