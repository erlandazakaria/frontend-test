import moment from "moment";

export const getHour = () => {
  let hour = moment().format("HH");
  let minute = parseInt(moment().format("mm"), 10);

  return `${hour}:${minute >= 15 && minute <=45 ? "30" : "00"}`
}
