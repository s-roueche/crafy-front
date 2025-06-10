export default function formatDate(date: Date): {month: string, year: number} {
  return {
    month: `month${date.getMonth() + 1}`,
    year: date.getFullYear()
  }
}