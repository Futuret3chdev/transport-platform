// lib/currency.js
export function convertToAUD(amount, fromCurrency) {
  const rates = {
    USD: 1.55,
    EUR: 1.65,
    GBP: 1.9,
    AUD: 1,
  };

  return amount * (rates[fromCurrency] || 1);
}
