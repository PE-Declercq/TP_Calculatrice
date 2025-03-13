document.addEventListener('DOMContentLoaded', () => {
    const calc = new Calculator();
  
    let currentValue = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;
  
    const display = document.getElementById('display');
    const toggleHistoryButton = document.getElementById('toggle-history');
    const historyPanel = document.getElementById('history-panel');
    const historyList = document.getElementById('history-list');
  
    function updateDisplay(value) {
      display.textContent = value;
    }
  
    function updateHistoryDisplay() {
      historyList.innerHTML = '';
      const history = calc.getHistory();
      history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
      });
    }
  
    toggleHistoryButton.addEventListener('click', () => {
      historyPanel.classList.toggle('hidden');
    });
  
    function performCalculation(a, op, b) {
      switch (op) {
        case '+':
          return calc.add(a, b);
        case '-':
          return calc.subtract(a, b);
        case '*':
          return calc.multiply(a, b);
        case '/':
          return calc.divide(a, b);
        default:
          return b;
      }
    }
  
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
  
        if (!isNaN(value)) {
          if (currentValue === '0' || waitingForSecondOperand) {
            currentValue = value;
            waitingForSecondOperand = false;
          } else {
            currentValue += value;
          }
          updateDisplay(currentValue);
        }
        else {
          switch (value) {
            case 'CE':
              currentValue = '0';
              updateDisplay(currentValue);
              break;
            case 'C':
              currentValue = '0';
              firstOperand = null;
              operator = null;
              waitingForSecondOperand = false;
              updateDisplay(currentValue);
              break;
            case 'backspace':
              currentValue = currentValue.slice(0, -1) || '0';
              updateDisplay(currentValue);
              break;
            case '.':
              if (!currentValue.includes('.')) {
                currentValue += '.';
                updateDisplay(currentValue);
              }
              break;
            case '+':
            case '-':
            case '*':
            case '/':
              if (firstOperand !== null && operator && !waitingForSecondOperand) {
                const result = performCalculation(
                  parseFloat(firstOperand),
                  operator,
                  parseFloat(currentValue)
                );
                calc.history[calc.history.length - 1] = `${firstOperand} ${operator} ${currentValue} = ${result}`;
                currentValue = String(result);
                updateDisplay(currentValue);
                firstOperand = result;
                updateHistoryDisplay();
              } else {
                firstOperand = currentValue;
              }
              operator = value;
              waitingForSecondOperand = true;
              break;
            case '=':
              if (operator && firstOperand !== null) {
                const result = performCalculation(
                  parseFloat(firstOperand),
                  operator,
                  parseFloat(currentValue)
                );
                calc.history[calc.history.length - 1] = `${firstOperand} ${operator} ${currentValue} = ${result}`;
                currentValue = String(result);
                updateDisplay(currentValue);
                firstOperand = result;
                operator = null;
                waitingForSecondOperand = true;
                updateHistoryDisplay();
              }
              break;
            case 'negate':
              currentValue = String(parseFloat(currentValue) * -1);
              updateDisplay(currentValue);
              break;
            case '%':
              currentValue = String(parseFloat(currentValue) / 100);
              updateDisplay(currentValue);
              break;
            case 'sqrt':
              currentValue = String(Math.sqrt(parseFloat(currentValue)));
              updateDisplay(currentValue);
              break;
            case 'square':
              currentValue = String(Math.pow(parseFloat(currentValue), 2));
              updateDisplay(currentValue);
              break;
            case 'frac':
              if (parseFloat(currentValue) === 0) {
                currentValue = 'Erreur';
              } else {
                currentValue = String(1 / parseFloat(currentValue));
              }
              updateDisplay(currentValue);
              break;
            default:
              console.log('Action non implémentée : ', value);
          }
        }
      });
    });
  });
  