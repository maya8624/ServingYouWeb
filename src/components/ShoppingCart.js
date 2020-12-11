import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import OrderContext from "../context/orderContext";

function ShoppingCart() {
  const useOrder = useContext(OrderContext);
  const totalItems = useOrder.items.length;

  // console.log("shopping cart:", totalItems);

  //if (totalItems === 0) return null;

  return (
    <div>
      <FontAwesomeIcon icon={faShoppingCart} /> {totalItems}
    </div>
  );
}

export default ShoppingCart;
