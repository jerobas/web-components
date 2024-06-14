class DateUtil {
  private locales: Intl.LocalesArgument

  constructor() {
    this.locales = process.env.LOCALES;
  }
  static formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.locales, options).format(date);
  }

  static formatDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat(this.locales, options).format(date);
  }

  static formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat(this.locales, options).format(date);
  }

  static formatCustom(
    date: Date,
    locales: string,
    options: Intl.DateTimeFormatOptions
  ): string {
    return new Intl.DateTimeFormat(this.locales, options).format(date);
  }

  static daysAgo(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  }
}

export default DateUtil;
