import http from "./httpService";
import { azApiUrl } from "../config.json";

const apiEndPoint = `${azApiUrl}/bookings`;

export async function saveBooking(booking) {
  return await http.post(apiEndPoint, booking);
}
