const holidays = require('./holidays');

const aDayInMilliseconds = 86400000;

class Dejt {
  constructor(date = new Date()) {
    if (typeof date === 'string') {
      const numbers = /^[0-9]*$/gm;
      if (date.match(numbers)) {
        this.date = new Date(parseInt(date, 10) * 1000);
      } else {
        this.date = new Date(date);
        if (date.length === 10) this.resetClock();
      }
    } else if (typeof date === 'number') {
      this.date = new Date(date * 1000);
    } else this.date = date;
    return this;
  }

  addDays(days) {
    this.addHours(24 * days);
    return this;
  }

  removeDays(days) {
    this.removeHours(24 * days);
    return this;
  }

  addHours(hours) {
    this.date.setTime(this.date.getTime() + ((aDayInMilliseconds / 24) * hours));
    return this;
  }

  removeHours(hours) {
    this.date.setTime(this.date.getTime() - ((aDayInMilliseconds / 24) * hours));
    return this;
  }

  resetClock(hour = 0) {
    this.date.setHours(hour);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    return this;
  }

  sameDayAs(x) {
    return (
      Math.abs(this.date - x.date) < aDayInMilliseconds
      && this.date.getDay() === x.date.getDay()
    );
  }

  newerThan(x) {
    return this.date > x.date;
  }

  olderThan(x) {
    return this.date < x.date;
  }

  isPast() {
    return this.date < new Date();
  }

  isWeekend() {
    return !(this.date.getDay() % 6);
  }

  isHoliday() {
    return holidays.includes(this.toDateString());
  }

  existsIn(array) {
    return array.filter((x) => this.sameDayAs(x)).length;
  }

  daysTo(x) {
    return Math.round(Math.abs((this.date - x.date) / aDayInMilliseconds));
  }

  range(x) {
    let days = this.daysTo(x) + 1;
    if (days === 1) return [this, x];
    const current = this.clone();
    const end = x.clone();
    const dates = [];
    do {
      dates.push(current.clone());
      current.addDays(1).resetClock();
      days -= 1;
    } while (days);
    dates[dates.length - 1] = end;
    return dates;
  }

  diff(x) {
    return ((x.date.getTime() - this.date.getTime()) / 60000);
  }

  clone() {
    return new Dejt(this.date.toString());
  }

  toDateString() {
    const Y = new Intl.DateTimeFormat('sv-SE', { year: 'numeric' }).format(this.date);
    const M = new Intl.DateTimeFormat('sv-SE', { month: '2-digit' }).format(this.date);
    const D = new Intl.DateTimeFormat('sv-SE', { day: '2-digit' }).format(this.date);
    return `${Y}-${M}-${D}`;
  }

  toString() {
    const Y = new Intl.DateTimeFormat('sv-SE', { year: 'numeric' }).format(this.date);
    const M = new Intl.DateTimeFormat('sv-SE', { month: '2-digit' }).format(this.date);
    const D = new Intl.DateTimeFormat('sv-SE', { day: '2-digit' }).format(this.date);
    const h = new Intl.DateTimeFormat('sv-SE', { hour: '2-digit', hour12: false }).format(this.date);
    const m = new Intl.DateTimeFormat('sv-SE', { minute: '2-digit' }).format(this.date);
    const s = new Intl.DateTimeFormat('sv-SE', { second: '2-digit' }).format(this.date);
    return `${Y}-${M}-${D} ${h}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
  }
}

module.exports = Dejt;
