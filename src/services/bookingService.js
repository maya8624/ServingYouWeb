const bookingList = [
  {
    id: 1,
    firstname: "Joseph",
    lastname: "Jung",
    mobiel: "1234567890",
    date: "01/12/2020",
    time: "18:30",
    numberInParty: 5,
  },
  {
    id: 2,
    firstname: "Joseph",
    lastname: "Jung",
    mobiel: "1234567890",
    date: "01/12/2020",
    time: "18:30",
    numberInParty: 4,
  },
];

export function getBooking(id) {
  return bookingList.find((b) => b.id === id);
}

export function saveBooking(booking) {
  const lastId = bookingList[bookingList.length - 1].id;
  booking.id = lastId + 1;
  booking.date = "4/12/2020";

  bookingList.push(booking);

  return booking.id;
}
