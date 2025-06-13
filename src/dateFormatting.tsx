import type {TFunction} from "i18next";

export default function formatDate(date: Date, t: TFunction): string {
  return ` ${t(`month${date.getMonth() + 1}`)} ${date.getFullYear()}`
}