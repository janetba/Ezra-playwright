export class CreditCardUtils {
  static ezraTestCardNumbers = "4242424242424242";
  static ezraTestCardNumberWrong = "0042424242424242";

  static generateCardNumber(prefix: string = "4", length: number = 16): string {
    if (length < prefix.length + 1) throw new Error("Invalid length for card number");

    let number = prefix;
    while (number.length < length - 1) {
      number += Math.floor(Math.random() * 10).toString();
    }

    const checkDigit = this.luhnCheckDigit(number);
    return number + checkDigit;
  }

  static isValidCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, "").split("").map(Number);
    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  /**
   * Generate a random expiry date in MM/YY format
   */
  static randomExpiry(): string {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const year = String(new Date().getFullYear() % 100 + Math.floor(Math.random() * 5) + 1).padStart(2, "0");
    return `${month}/${year}`;
  }

  /**
   * Generate a random 3-digit CVV
   */
  static randomCVV(): string {
    return String(Math.floor(100 + Math.random() * 900));
  }

  // Private helper to calculate Luhn check digit
  private static luhnCheckDigit(number: string): number {
    const digits = number.split("").map(Number);
    let sum = 0;
    let shouldDouble = true;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (10 - (sum % 10)) % 10;
  }
}
