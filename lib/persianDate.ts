import moment from "jalali-moment";

export const toPersian = (date: string | Date) => {
  return moment(date).locale("fa").format("YYYY/MM/DD");
};

export const getPersianToday = () => {
  return moment().locale("fa");
};

export const parsePersian = (date: string) => {
  return moment(date, "YYYY-MM-DD");
};