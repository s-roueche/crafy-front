import type {TFunction} from "i18next";

export function formatDateMonthYear(date: Date, t: TFunction): string {
  return `${t(`month${date.getMonth() + 1}`)} ${date.getFullYear()}`
}

export function formatDateDayMonthYear(date: Date, t: TFunction): string {
  return `${date.getDate()} ${t(`month${date.getMonth() + 1}`)} ${date.getFullYear()}`
}

export function formatDateDayOfTheWeek(date: Date, t: TFunction): string {
  return `${t(`day${date.getDay()}`)} ${date.getDate()} ${t(`month${date.getMonth() + 1}`)}`
}

export function getNumberOfDaysInMonth(date: Date): number {
  switch (date.getMonth()) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    case 1:
      if (date.getFullYear()%100 === 0) return 28;
      if (date.getFullYear()%4 === 0) return 29;
      return 28;
    default: throw new Error("Invalid month");
  }
}