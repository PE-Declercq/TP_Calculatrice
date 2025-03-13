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