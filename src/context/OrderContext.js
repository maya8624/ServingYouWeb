import React, { useState } from "react";
import orderService from "../services/orderService";
export const OrderContext = React.createContext();

const orderToken = "order";

export default function OrderProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (item) => {
    const items = JSON.parse(localStorage.getItem(orderToken)) || [];
    items.push(item);

    const newItems = items.reduce((accumulator, currentItem) => {
      const item = accumulator.find((a) => a.id === currentItem.id);

      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        accumulator.push({
          quantity: 1,
          ...currentItem,
        });
      }
      return accumulator;
    }, []);

    orderService.saveOrderItems(newItems);
    setItems(newItems);
  };

  const changeQuantity = (id, changeType) => {
    const items = JSON.parse(localStorage.getItem("order")) || [];
    const index = items.findIndex((item) => item.id === id);
    changeType === "increase"
      ? items[index].quantity++
      : items[index].quantity--;

    orderService.saveOrderItems(items);
    return orderService.getOrderItems();
  };

  const removeFromCart = (id) => {
    const items = orderService.getOrderItems();
    const updatedItems = items.filter((item) => item.id !== id);

    orderService.saveOrderItems(updatedItems);
    setItems(updatedItems);

    return updatedItems;
  };

  return (
    <OrderContext.Provider
      value={{
        items: orderService.getOrderItems(),
        addToCart,
        changeQuantity,
        removeFromCart,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
