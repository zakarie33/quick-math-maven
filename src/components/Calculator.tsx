
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

type Operation = '+' | '-' | '*' | '/' | null;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback((nextOperation: Operation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result: number;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = useCallback(() => {
    performOperation(null);
    setOperation(null);
    setPreviousValue(null);
    setWaitingForOperand(true);
  }, [performOperation]);

  const CalculatorButton = ({ 
    onClick, 
    className = "", 
    children, 
    variant = "secondary" 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    variant?: "secondary" | "destructive" | "default";
  }) => (
    <Button
      onClick={onClick}
      variant={variant}
      className={`h-16 text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </Button>
  );

  return (
    <div className="max-w-xs mx-auto bg-gray-900 rounded-2xl p-6 shadow-2xl">
      {/* Display */}
      <div className="bg-black rounded-xl p-6 mb-4">
        <div className="text-right text-white text-4xl font-light overflow-hidden">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton 
          onClick={clear} 
          variant="destructive"
          className="bg-gray-500 hover:bg-gray-400 text-black"
        >
          AC
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => {
            if (display !== '0') {
              const newDisplay = display.slice(0, -1);
              setDisplay(newDisplay || '0');
            }
          }}
          className="bg-gray-500 hover:bg-gray-400 text-black"
        >
          ⌫
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('/')}
          className="bg-orange-500 hover:bg-orange-400 text-white"
        >
          ÷
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('*')}
          className="bg-orange-500 hover:bg-orange-400 text-white"
        >
          ×
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('-')}
          className="bg-orange-500 hover:bg-orange-400 text-white"
        >
          −
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('+')}
          className="bg-orange-500 hover:bg-orange-400 text-white"
        >
          +
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton 
          onClick={calculate}
          className="bg-orange-500 hover:bg-orange-400 text-white row-span-2 h-auto"
        >
          =
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton 
          onClick={() => inputNumber('0')}
          className="col-span-2"
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
