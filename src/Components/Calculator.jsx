import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [problem, setProblem] = useState('');

  // Handle button press
  const handleButtonClick = (value) => {
    // Reset for 'AC'
    if (value === 'AC') {
      setDisplay('');
      setProblem('');
    }
    // Handle '=' to evaluate the expression
    else if (value === '=') {
      try {
        const result = eval(problem); // Evaluate the expression
        setDisplay(result);
        setProblem(result.toString());
      } catch (error) {
        setDisplay('Error');
        setProblem('');
      }
    }
    // Prevent multiple leading zeros
    else if (value === '0' && (problem === '' || problem === '0')) {
      setProblem('0');
      setDisplay('0');
    }
    // Prevent multiple decimals in the current number
    else if (value === '.' && alreadyHasDecimal(problem)) {
      // Do nothing if there's already a decimal in the current number
    }
    // Handle consecutive operators, keeping the last one except for '-'
    else if (isOperator(value)) {
      handleOperators(value);
    }
    // Handle all other input
    else {
      // If the current input is '0' and a new non-zero number is entered, replace the '0'
      if (problem === '0' && value !== '0' && value !== '.') {
        setProblem(value);
        setDisplay(value);
      } else {
        setProblem((prev) => prev + value);
        setDisplay((prev) => prev + value);
      }
    }
  };

  // Function to handle operators, replacing consecutive ones except for '-'
  const handleOperators = (value) => {
    const lastChar = problem.slice(-1);
    const last2ndChar = problem[problem.length - 2];
    
    
    if (isOperator(lastChar)) {
      // If the last operator is not '-', replace it with the new operator
      if (lastChar !== '-' && value !== '-') {
        setProblem((prev) => prev.slice(0, -1) + value);
      }
      else if(lastChar !== '-' && value === '-'){
        setProblem((prev) => prev + value)
      }
      else if (lastChar === "-" && isOperator(value)) {
        if(isOperator(last2ndChar)){
          setProblem((prev) => prev.slice(0, -2) + value) //remove last 2 characters and replace with latest character
        }else{
        setProblem((prev) => prev.slice(0, -1) + value);
        }
      }
    } else {
      setProblem((prev) => prev + value);
    }
    setDisplay((prev) => prev + value);
  };

  // Check if a character is an operator
  const isOperator = (char) => {
    return ['+', '-', '*', '/'].includes(char);
  };

  // Check if the current number already contains a decimal point
  const alreadyHasDecimal = (problem) => {
    const parts = problem.split(/[\+\-\*\/]/); // Split the problem by operators
    const currentNumber = parts[parts.length - 1]; // Get the current number segment
    return currentNumber.includes('.'); // Return true if the current number has a decimal
  };

  return (
    <div>
      <div className="screen-max-width h-screen flex-center">
        <div id="wrapper" className="w-[20.5vw] h-[64vh] bg-black border-[5px] border-gray">
          <div id="display-problem" className="display-board text-right font-serif text-[10px]">
            {problem}
          </div>
          <div id="display" className="display-board text-right font-serif text-2xl">
            {display || '0'}
          </div>
          <div id="number-wrapper" className="grid grid-rows-[repeat(5,1fr)] grid-cols-4">
            <button id="clear" className="btn-lg col-span-2" onClick={() => handleButtonClick('AC')}>
              AC
            </button>
            <button id="divide" className="btn col-span-1" onClick={() => handleButtonClick('/')}>
              /
            </button>
            <button id="multiply" className="btn col-span-1" onClick={() => handleButtonClick('*')}>
              *
            </button>
            <button id="seven" className="btn col-span-1" onClick={() => handleButtonClick('7')}>
              7
            </button>
            <button id="eight" className="btn col-span-1" onClick={() => handleButtonClick('8')}>
              8
            </button>
            <button id="nine" className="btn col-span-1" onClick={() => handleButtonClick('9')}>
              9
            </button>
            <button id="subtract" className="btn col-span-1" onClick={() => handleButtonClick('-')}>
              -
            </button>
            <button id="four" className="btn col-span-1" onClick={() => handleButtonClick('4')}>
              4
            </button>
            <button id="five" className="btn col-span-1" onClick={() => handleButtonClick('5')}>
              5
            </button>
            <button id="six" className="btn col-span-1" onClick={() => handleButtonClick('6')}>
              6
            </button>
            <button id="add" className="btn col-span-1" onClick={() => handleButtonClick('+')}>
              +
            </button>
            <button id="one" className="btn col-span-1" onClick={() => handleButtonClick('1')}>
              1
            </button>
            <button id="two" className="btn col-span-1" onClick={() => handleButtonClick('2')}>
              2
            </button>
            <button id="three" className="btn col-span-1" onClick={() => handleButtonClick('3')}>
              3
            </button>
            <button id="equals" className="btn-long col-span-1 row-span-2" onClick={() => handleButtonClick('=')}>
              =
            </button>
            <button id="zero" className="btn-lg col-span-2" onClick={() => handleButtonClick('0')}>
              0
            </button>
            <button id="decimal" className="btn col-span-1" onClick={() => handleButtonClick('.')}>
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
