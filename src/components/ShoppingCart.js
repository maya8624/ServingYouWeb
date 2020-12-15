import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "./hooks/useOrder";
import orderService from "../services/orderService";

function ShoppingCart() {
  // const context = useContext(OrderContext);  ;
  const order = useOrder();
  const totalItems = order.items.length;

  if (totalItems === 0) return null;

  return (
    <div>
      <FontAwesomeIcon icon={faShoppingCart} /> {totalItems}
    </div>
  );
}

export default ShoppingCart;
