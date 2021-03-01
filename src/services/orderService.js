import http from "./httpService";
import { azApiUrl } from "../config.json";

const orderToken = "order";
const apiEndPoint = `${azApiUrl}/orders`;

const getOrderItems = () => {
  const items = JSON.parse(localStorage.getItem(orderToken)) || [];
  return items;
};

const placeAnOrder = async (order) => {
  try {
    const response = await http.post(apiEndPoint, order);
    return response;
  } catch (error) {
    console.log("Unable to post order.", error);
  }
};

const removeAllItems = () => {
  try {
    localStorage.removeItem(orderToken);
  } catch (error) {
    console.log(
      "An error has occurred while removing items from local stroage.",
      error
    );
  }
};

const saveOrderItems = (items) => {
  try {
    localStorage.setItem(orderToken, JSON.stringify(items));
  } catch (error) {
    console.log(
      "An error has occurred while saving items in local stroage.",
      error
    );
    return null;
  }
};

const orderService = {
  getOrderItems,
  placeAnOrder,
  removeAllItems,
  saveOrderItems,
};

export default orderService;
