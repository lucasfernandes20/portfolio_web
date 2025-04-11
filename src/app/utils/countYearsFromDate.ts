function countYearFromDate(date: Date): string {
  const currentDate = new Date();
  const monthsOnAYear = 12;

  const diffYears = currentDate.getFullYear() - date.getFullYear();
  const diffMonths = currentDate.getMonth() - date.getMonth();
  const totalMonths = diffYears * monthsOnAYear + diffMonths;

  const years = Math.floor(totalMonths / monthsOnAYear);
  const monthsOver = totalMonths % monthsOnAYear;

  if (monthsOver >= 2) {
    return `more than ${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years} year${years !== 1 ? 's' : ''}`;
}

export default countYearFromDate;
