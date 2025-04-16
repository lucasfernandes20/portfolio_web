/**
 * Calcula a duração entre duas datas em anos e meses
 * @param startDateStr Data de início no formato 'mm/yyyy' (ex: '01/2020')
 * @param endDateStr Data de término no formato 'mm/yyyy' ou 'current'
 * @returns Objeto contendo anos, meses e a duração formatada
 */
export function calculateDuration(
  startDateStr: string,
  endDateStr?: string
): {
  years: number;
  months: number;
  formattedDuration: string;
  totalMonths: number;
} {
  const parseDate = (dateStr: string): Date => {
    if (dateStr === 'current') {
      return new Date();
    }

    const parts = dateStr.split('/');
    if (parts.length === 2) {
      const month = parseInt(parts[0]) - 1;
      const year = parseInt(parts[1]);
      return new Date(year, month);
    }

    console.warn(
      `Formato de data inválido: ${dateStr}. Usando data atual como fallback.`
    );
    return new Date();
  };

  const startDate = parseDate(startDateStr);
  const endDate = endDateStr ? parseDate(endDateStr) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  let formattedDuration = '';

  if (years > 0) {
    formattedDuration = `${years} year${years !== 1 ? 's' : ''}`;
    if (months > 0) {
      formattedDuration += ` and ${months} month${months === 1 ? '' : 's'}`;
    }
  } else {
    formattedDuration = `${months} month${months === 1 ? '' : 's'}`;
  }

  return {
    years,
    months,
    formattedDuration,
    totalMonths
  };
}
