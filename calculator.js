class Calculator {
    constructor() {
      this.history = [];
    }
    
    add(a, b) {
      const result = a + b;
      this.history.push(result);
      return result;
    }
    
    subtract(a, b) {
      const result = a - b;
      this.history.push(result);
      return result;
    }
    
    multiply(a, b) {
      const result = a * b;
      this.history.push(result);
      return result;
    }
  
    divide(a, b) {
      if (b === 0) {
        const error = 'Erreur : division par zéro';
        this.history.push(error);
        return error;
      }
      const result = a / b;
      this.history.push(result);
      return result;
    }
    
    getHistory() {
      return this.history;
    }
    
    clearHistory() {
      this.history = [];
    }
}

if (typeof module !== 'undefined') {
    module.exports = Calculator;
}  