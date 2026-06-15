import moment from "jalali-moment";

export const toJalali = (date: string | Date) => {
  return moment(date).locale("fa").format("YYYY/MM/DD");
};export const roomNames: Record<string, string> = {
  green: "گرین",
  velash: "ولاش",
  zz: "زز",
  chinar: "چنار",
};export const getDaysBetween = (start: Date, end: Date) => {
  const days = [];
  const current = new Date(start);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};