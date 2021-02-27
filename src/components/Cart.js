import React from "react";
import { useOrder } from "./hooks/useOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const order = useOrder();
  const totalItems = order.items.length;

  if (totalItems === 0) return null;

  return (
    <div>
      <FontAwesomeIcon icon={faShoppingCart} /> {totalItems}
    </div>
  );
}

export default Cart;
