export type MonthDayYear = {
  month: number;
  day: number;
  year: number;
};

export type HourMinute = {
  hour: number;
  minute: number;
};

export type HourMinuteSecond = {
  hour: number;
  minute: number;
  second: number;
};

export enum TimeFormats {
  HoursMinutesAMPM = 0, // 10:57 am
  HoursMinutesSecondsAMPM, // 10:57:20 am
  HoursMinutes, // 10:57
  HoursMinutesSeconds, // 10:57:20
}

export enum DateFormats {
  WWW_MMM_dd_yyyy = 0, // Tue Sep 24, 2024
  Week_Month_Date_Year, // Tuesday, September 24, 2024
  Hyphen_ddmmyy, // 24-Sep-24
  Hyphen_ddMMMyyyy, // 24-Sep-2024
  Slash_mddyy, //9/24/24
  Slash_mmddyy, //09/24/24
  Hyphen_mmddyy, //09-24-24
  Hyphen_mmddyyyy, //09-24-2024
  MMMddyyyy, //Sep 24, 2024
  Hyphen_MMMdd, //Sep-24
  yymmdd, // 240924
  yyyymmdd, // 20240924
  Hyphen_yyyymmdd, // 2024-05-07
  Slash_mmddyyyy, // 07/22/2024
}

function addZeroToMonthOrDay(monthOrDay: number) {
  return monthOrDay < 10 ? '0' + monthOrDay : monthOrDay.toString();
}
export class DateTimeUtils {
  /**
   * Get the current date and time in UTC format.
   * @param format The format in which the date and time should be returned (default is "YYYY-MM-DD HH:mm:ss").
   * @returns The current date and time in UTC formatted as per the specified format.
   */
  static getCurrentUTCDateTime(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    const currentDate = new Date();
    const utcDateTime = new Date(currentDate.toUTCString());
    const formattedDateTime = format
      .replace('YYYY', utcDateTime.getUTCFullYear().toString())
      .replace('MM', (utcDateTime.getUTCMonth() + 1).toString().padStart(2, '0'))
      .replace('DD', utcDateTime.getUTCDate().toString().padStart(2, '0'))
      .replace('HH', utcDateTime.getUTCHours().toString().padStart(2, '0'))
      .replace('mm', utcDateTime.getUTCMinutes().toString().padStart(2, '0'))
      .replace('ss', utcDateTime.getUTCSeconds().toString().padStart(2, '0'));
    return formattedDateTime;
  }

  /**
   * Get the current date in UTC format.
   * @param format The format in which the date should be returned (default is "YYYY-MM-DD").
   * @returns The current date in UTC formatted as per the specified format.
   */
  static getCurrentUTCDate(format: string = 'YYYY-MM-DD'): string {
    return this.getCurrentUTCDateTime(format.replace('HH:mm:ss', ''));
  }

  /**
   * Get the current time in UTC format.
   * @param format The format in which the time should be returned (default is "HH:mm:ss").
   * @returns The current time in UTC formatted as per the specified format.
   */
  static getCurrentUTCTime(format: string = 'HH:mm:ss'): string {
    return this.getCurrentUTCDateTime(format.replace('YYYY-MM-DD ', ''));
  }

  /**
   * Get the difference between two dates in milliseconds.
   * @param date1 The first date.
   * @param date2 The second date.
   * @returns The difference between the two dates in milliseconds.
   */
  static getDateDiffInMilliseconds(date1: Date, date2: Date): number {
    return Math.abs(date1.getTime() - date2.getTime());
  }

  /**
   * Get the difference between two dates in seconds.
   * @param date1 The first date.
   * @param date2 The second date.
   * @returns The difference between the two dates in seconds.
   */
  static getDateDiffInSeconds(date1: Date, date2: Date): number {
    return Math.abs((date1.getTime() - date2.getTime()) / 1000);
  }

  /**
   * Get the difference between two dates in minutes.
   * @param date1 The first date.
   * @param date2 The second date.
   * @returns The difference between the two dates in minutes.
   */
  static getDateDiffInMinutes(date1: Date, date2: Date): number {
    return Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60));
  }

  /**
   * Convert date or string to MonthDayYear to get month, day, year
   * @param date
   */
  static getMonthDayYear(date: string | Date): MonthDayYear {
    const dateValue = typeof date === 'object' ? date : new Date(date);
    const month = dateValue.getMonth() + 1;
    const day = dateValue.getDate();
    const year = dateValue.getFullYear();
    return { month, day, year };
  }

  /**
   * Converts date  or string to HourMinute to get hour and minutes of a date
   * @param date
   */
  static getHourMinute(date: string | Date): HourMinute {
    const dateValue = typeof date === 'object' ? date : new Date(date);
    const hour = dateValue.getHours();
    const minute = dateValue.getMinutes();
    return { hour, minute };
  }

  /**
   * Converts date  or string to HourMinute to get hour, minutes and seconds of a date
   * @param date
   */
  static getHourMinuteSecond(date: string | Date): HourMinuteSecond {
    const dateValue = typeof date === 'object' ? date : new Date(date);
    const hour = dateValue.getHours();
    const minute = dateValue.getMinutes();
    const second = dateValue.getSeconds();
    return { hour, minute, second };
  }

  /**
   * Compares provided date with the current date and
   * returns true if the day, month, and year are the same
   * @param date
   */
  static isDateCurrent(date: string | Date) {
    const dateValue = typeof date === 'object' ? date : new Date(date);
    const givenDate = this.getMonthDayYear(dateValue);
    const currentDate = this.getMonthDayYear(new Date());
    return JSON.stringify(givenDate) === JSON.stringify(currentDate);
  }

  /**
   * Takes a date and formats it to the provided rapidresponse date format
   * @param date
   * @param format
   */
  static formatDate(date: string | Date, format: DateFormats = DateFormats.Hyphen_mmddyy) {
    const monthDayYear = this.getMonthDayYear(date);
    if (format === DateFormats.Hyphen_ddmmyy) {
      return [
        addZeroToMonthOrDay(monthDayYear.day),
        addZeroToMonthOrDay(monthDayYear.month),
        monthDayYear.year.toString().substr(2),
      ].join('-');
    } else if (format === DateFormats.Hyphen_mmddyyyy) {
      return [
        addZeroToMonthOrDay(monthDayYear.month),
        addZeroToMonthOrDay(monthDayYear.day),
        monthDayYear.year.toString(),
      ].join('-');
    } else if (format === DateFormats.Hyphen_mmddyy) {
      return [
        addZeroToMonthOrDay(monthDayYear.month),
        addZeroToMonthOrDay(monthDayYear.day),
        monthDayYear.year.toString().substr(2),
      ].join('-');
    } else if (format === DateFormats.Hyphen_yyyymmdd) {
      return [
        monthDayYear.year.toString(),
        addZeroToMonthOrDay(monthDayYear.month),
        addZeroToMonthOrDay(monthDayYear.day),
      ].join('-');
    } else if (format === DateFormats.yyyymmdd) {
      return [
        monthDayYear.year.toString(),
        addZeroToMonthOrDay(monthDayYear.month),
        addZeroToMonthOrDay(monthDayYear.day),
      ].join('');
    } else if (format === DateFormats.Slash_mmddyyyy) {
      return [
        addZeroToMonthOrDay(monthDayYear.month),
        addZeroToMonthOrDay(monthDayYear.day),
        monthDayYear.year.toString(),
      ].join('/');
    } else {
      throw new Error(`Unsupported format type '${format}'.`);
    }
  }

  /**
   * Takes a MonthDayYear and formats it to the provided rapidresponse date format
   * @param date
   * @param format
   */
  static formatMonthDayYearToString(date: MonthDayYear, format: DateFormats = DateFormats.Hyphen_mmddyy): string {
    const newDate = new Date(date.year, date.month - 1, date.day);
    return this.formatDate(newDate, format);
  }

  /**
   * Takes a date and formats to a representation of hour and minutes
   * @param date
   * @param format
   */
  static formatTime(date: Date, format: TimeFormats) {
    const hourTime = this.getHourMinuteSecond(date);
    if (format === TimeFormats.HoursMinutesAMPM) {
      const daySection = hourTime.hour > 11 ? 'PM' : 'AM';
      const adjustedHour =
        hourTime.hour === 0
          ? 12 // Edge-case; "0" hour of 24 hr format is "12" hour of AM/PM Format
          : hourTime.hour > 12
            ? hourTime.hour - 12
            : hourTime.hour; // Hour of AM/PM format is always in range of [0,12]
      const adjustedMinuteRepresentation =
        hourTime.minute < 10 ? '0' + hourTime.minute.toString() : hourTime.minute.toString();
      return [adjustedHour.toString(), ':', adjustedMinuteRepresentation + ' ' + daySection].join('');
    } else if (format === TimeFormats.HoursMinutesSecondsAMPM) {
      const daySection = hourTime.hour > 11 ? 'PM' : 'AM';
      const adjustedHour =
        hourTime.hour === 0
          ? 12 // Edge-case; "0" hour of 24 hr format is "12" hour of AM/PM Format
          : hourTime.hour > 12
            ? hourTime.hour - 12
            : hourTime.hour; // Hour of AM/PM format is always in range of [0,12]
      const adjustedMinuteRepresentation =
        hourTime.minute < 10 ? '0' + hourTime.minute.toString() : hourTime.minute.toString();
      const adjustedSecondRepresentation =
        hourTime.second < 10 ? '0' + hourTime.second.toString() : hourTime.second.toString();
      return [
        adjustedHour.toString(),
        ':',
        adjustedMinuteRepresentation,
        ':',
        +adjustedSecondRepresentation + ' ' + daySection,
      ].join('');
    } else if (format === TimeFormats.HoursMinutesSeconds) {
      const adjustedHour =
        hourTime.hour === 0
          ? 12 // Edge-case; "0" hour of 24 hr format is "12" hour of AM/PM Format
          : hourTime.hour > 12
            ? hourTime.hour - 12
            : hourTime.hour; // Hour of AM/PM format is always in range of [0,12]
      const adjustedMinuteRepresentation =
        hourTime.minute < 10 ? '0' + hourTime.minute.toString() : hourTime.minute.toString();
      const adjustedSecondRepresentation =
        hourTime.second < 10 ? '0' + hourTime.second.toString() : hourTime.second.toString();
      return [adjustedHour.toString(), ':', adjustedMinuteRepresentation, ':', +adjustedSecondRepresentation].join('');
    } else {
      throw new Error(`Unsupported time formats ${format}.`);
    }
  }

  /**
   * Finds the name of the month used by the given date
   *
   * @param date
   * @returns
   */
  static getMonthNameFromDate(date: Date) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[date.getMonth()];
  }
}
