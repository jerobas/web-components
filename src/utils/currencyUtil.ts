class CurrencyUtil {
  private locale: string;
  private currency: string;

  constructor() {
    this.locale = process.env.LOCALES || "en-US";
    this.currency = process.env.CURRENCIEs || "USD";
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
    }).format(amount);
  }

  static formatCustomCurrency(
    amount: number,
    options: Intl.NumberFormatOptions
  ): string {
    return new Intl.NumberFormat(this.locale, options).format(amount);
  }
}

export default CurrencyUtil;
