import dayjs from 'dayjs';

export function generateRangeDates() {
  const firstYearDay = dayjs().startOf('year');
  const today = new Date();

  const dates = [];
  let compareDate = firstYearDay;

  while(compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day'); 
  };

  return dates;
}
