import type {TFunction} from "i18next";

export function formatDateMonthYear(date: Date, t: TFunction): string {
  return `${t(`month${date.getMonth() + 1}`)} ${date.getFullYear()}`
}

export function formatDateDayMonthYear(date: Date, t: TFunction): string {
  return `${date.getDate()} ${t(`month${date.getMonth() + 1}`)} ${date.getFullYear()}`
}