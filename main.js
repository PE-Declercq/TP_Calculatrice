// main.js
document.addEventListener('DOMContentLoaded', () => {
    // On instancie la calculatrice
    const calc = new Calculator();
  
    // Variables pour gérer l'état de la calculatrice
    let currentValue = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;
  
    // Sélection de l'afficheur
    const display = document.getElementById('display');
  
    // Fonction pour mettre à jour l'afficheur
    function updateDisplay(value) {
      display.textContent = value;
    }
  
    // Fonction pour effectuer un calcul via la classe Calculator
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
          return b; // Par défaut, on retourne le second opérande
      }
    }
  
    // Gestion du clic sur chaque bouton
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
  
        // Cas : c'est un chiffre ?
        if (!isNaN(value)) {
          if (currentValue === '0' || waitingForSecondOperand) {
            currentValue = value;
            waitingForSecondOperand = false;
          } else {
            currentValue += value;
          }
          updateDisplay(currentValue);
        }
        // Cas : c'est un opérateur ou une commande spéciale
        else {
          switch (value) {
            case 'CE':
              // Réinitialise seulement l'affichage courant
              currentValue = '0';
              updateDisplay(currentValue);
              break;
            case 'C':
              // Réinitialise tout
              currentValue = '0';
              firstOperand = null;
              operator = null;
              waitingForSecondOperand = false;
              updateDisplay(currentValue);
              break;
            case 'backspace':
              // Efface le dernier caractère
              currentValue = currentValue.slice(0, -1) || '0';
              updateDisplay(currentValue);
              break;
            case '.':
              // Ajoute une virgule si pas déjà présente
              if (!currentValue.includes('.')) {
                currentValue += '.';
                updateDisplay(currentValue);
              }
              break;
            case '+':
            case '-':
            case '*':
            case '/':
              // S'il y a déjà un opérateur et un premier opérande, on calcule
              if (firstOperand !== null && operator && !waitingForSecondOperand) {
                const result = performCalculation(
                  parseFloat(firstOperand),
                  operator,
                  parseFloat(currentValue)
                );
                currentValue = String(result);
                updateDisplay(currentValue);
                firstOperand = result;
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
                currentValue = String(result);
                updateDisplay(currentValue);
                firstOperand = result;
                operator = null;
                waitingForSecondOperand = true;
              }
              break;
            case 'negate':
              // Change le signe
              currentValue = String(parseFloat(currentValue) * -1);
              updateDisplay(currentValue);
              break;
            case '%':
              // Pourcentage
              currentValue = String(parseFloat(currentValue) / 100);
              updateDisplay(currentValue);
              break;
            case 'sqrt':
              // Racine carrée
              currentValue = String(Math.sqrt(parseFloat(currentValue)));
              updateDisplay(currentValue);
              break;
            case 'square':
              // Au carré
              currentValue = String(Math.pow(parseFloat(currentValue), 2));
              updateDisplay(currentValue);
              break;
            case 'frac':
              // 1/x
              if (parseFloat(currentValue) === 0) {
                currentValue = 'Erreur';
              } else {
                currentValue = String(1 / parseFloat(currentValue));
              }
              updateDisplay(currentValue);
              break;
            default:
              // Boutons mémoire (MC, MR, etc.) ou non implémentés
              console.log('Action non implémentée : ', value);
          }
        }
      });
    });
  });  