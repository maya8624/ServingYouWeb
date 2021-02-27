import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds, function (err, hash) {
    if (err) {
      console.log("An error has occurred during hashing the password", err);
    }
    return hash;
  });
};

export const checkPassword = (textPassword, hash) => {
  return bcrypt.compare(textPassword, hash, function (err, res) {
    if (err) {
      console.log("An error has occurred durin checking the password", err);
    }
    return res;
  });
};

export const getDates = () => {
  const days = 10; // initial days
  const dates = [];
  const dt = new Date();

  for (let i = 1; i <= days; i++) {
    dt.setDate(dt.getDate() + 1);

    let dd = dt.getDate();
    let mm = dt.getMonth() + 1;
    let yyyy = dt.getFullYear();

    dates.push(`${dd}/${mm}/${yyyy}`);
  }

  return dates;
};

export const getTimes = (year, month, day) => {
  const times = [];
  const start = new Date();

  start.setFullYear(year);
  start.setMonth(month);
  start.setDate(day);

  // start hour: 12
  let startHour = 12;
  let startMin = "30";

  const startDate = `${year}${month}${day}`;

  // current date
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth() + 1;
  const currentDay = current.getDate();
  const currentHour = current.getHours();
  const currentDate = `${currentYear}${currentMonth}${currentDay}`;

  // endTime 20:30
  const endHour = 20;
  const interval = 30;

  // food preparing time: 30 min
  const preparingTime = 30;

  const isToday = startDate > currentDate ? false : true;

  if (isToday) {
    if (currentHour >= endHour) {
      console.log("closed");
      return null;
    }

    current.setMinutes(current.getMinutes() + preparingTime);
    startMin = current.getMinutes();
    startHour = current.getHours();
  }

  const pickUpTime = startMin > interval ? "00" : "30";

  for (let i = startHour; i <= endHour; i++) {
    times.push(`${i}:${isToday ? pickUpTime : startMin}`);

    for (let j = 1; j < 2; j++) {
      current.setHours(i, interval);
      times.push(`${i}:${j * interval}`);
    }
  }

  if (isToday) {
    if (pickUpTime === "00") return times.slice(2);
    else return times.slice(1);
  } else return times;
};

const funcs = {
  checkPassword,
  hashPassword,
  getDates,
  getTimes,
};

export default funcs;
