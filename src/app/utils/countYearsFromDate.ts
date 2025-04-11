function countYearFromDate(date: Date): string {
  const currentDate = new Date();
  const monthsOnAYear = 12;

  const diffYears = currentDate.getFullYear() - date.getFullYear();
  const diffMonths = currentDate.getMonth() - date.getMonth();
  const totalMonths = diffYears * 12 + diffMonths;

  const years = Math.floor(totalMonths / 12);
  const monthsOver = totalMonths % 12;

  if (monthsOver >= 2) {
    return `more than ${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years} year${years !== 1 ? 's' : ''}`;
}

export default countYearFromDate;
