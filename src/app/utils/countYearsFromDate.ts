function countYearFromDate(date: Date): string {
  const currentDate = new Date();
  const monthsOnAYear = 12;

  const diffYears = currentDate.getFullYear() - date.getFullYear();
  const diffMonths = currentDate.getMonth() + 1 - (date.getMonth() + 1);
  const totalMonths = diffYears * monthsOnAYear + diffMonths;

  const intYears = Math.floor(totalMonths / monthsOnAYear).toFixed(0);

  const hasYears = totalMonths >= 12;

  let total = '';

  if (hasYears) {
    total = `${intYears} year${diffYears !== 1 ? 's' : ''}`;
  }

  if (totalMonths % 12) {
    if (hasYears) {
      total +=
        ' ' +
        `and ${totalMonths % 12} month${totalMonths % 12 !== 1 ? 's' : ''}`;
    } else {
      total = `${totalMonths % 12} month${totalMonths % 12 !== 1 ? 's' : ''}`;
    }
  }

  if (!total) total = 'Less than one month';

  return total;
}

export default countYearFromDate;
