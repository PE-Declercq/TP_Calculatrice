const Calculator = require('../../calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('addition', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('subtraction', () => {
    expect(calc.subtract(5, 3)).toBe(2);
  });

  test('multiplication', () => {
    expect(calc.multiply(4, 3)).toBe(12);
  });

  test('division', () => {
    expect(calc.divide(6, 2)).toBe(3);
  });

  test('division par zéro renvoie une erreur', () => {
    expect(calc.divide(6, 0)).toBe('Erreur : division par zéro');
  });

  test('historique mis à jour après chaque opération', () => {
    calc.add(1, 2);        // 3
    calc.multiply(3, 4);   // 12
    expect(calc.getHistory()).toEqual([3, 12]);
  });
});