function countYearFromDate(date: Date): string {
  const currentDate = new Date();
  const monthsOnAYear = 12;

  const diffYears = currentDate.getFullYear() - date.getFullYear();
  const diffMonths = currentDate.getMonth() - date.getMonth();
  const totalMonths = diffYears * monthsOnAYear + diffMonths;

  // Se for menos de um ano, mostrar em meses
  if (totalMonths < monthsOnAYear) {
    // Para meses, arredonda para pelo menos 1 mês se for positivo
    const months = Math.max(totalMonths, 1);

    return `${months} month${months !== 1 ? 's' : ''}`;
  }

  // Se for um ano ou mais, mantém o comportamento anterior
  const years = Math.floor(totalMonths / monthsOnAYear);
  const monthsOver = totalMonths % monthsOnAYear;

  if (monthsOver >= 2) {
    return `more than ${years} year${years !== 1 ? 's' : ''}`;
  }
  return `${years} year${years !== 1 ? 's' : ''}`;
}

export default countYearFromDate;
