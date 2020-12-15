const orderToken = "order";

const saveOrderItems = (items) => {
  try {
    localStorage.setItem(orderToken, JSON.stringify(items));
  } catch (error) {
    console.log("Error while saving items in the localstroage.", error);
    return null;
  }
};

const getOrderItems = () => {
  const items = JSON.parse(localStorage.getItem("order")) || [];
  return items;
};

export default { getOrderItems, saveOrderItems };
