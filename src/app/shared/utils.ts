export class Utils {
  static isMobile(): any {
    return window && window.matchMedia('(max-width: 767px)').matches;
  }

  static isLaptop(): any {
    return window && window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1128px)').matches;
  }

  static ngbDateToDate(ngbDate: { month, day, year }): any {
    if (!ngbDate) {
      return null;
    }
    return new Date(`${ngbDate.month}/${ngbDate.day}/${ngbDate.year}`);
  }

  static dateToNgbDate(date: Date): any {
    if (!date) {
      return null;
    }
    date = new Date(date);
    return {month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear()};
  }

  static scrollToTop(selector: string): void {
    if (document) {
      const element = document.querySelector(selector) as HTMLElement;
      element.scrollTop = 0;
    }
  }

  static genId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
