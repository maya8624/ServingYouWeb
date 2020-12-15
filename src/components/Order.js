import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";
import { useOrder } from "./hooks/useOrder";

function Order() {
  const order = useOrder();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = orderService.getOrderItems();
    setItems(items);
  }, []);

  const changeQuantity = (id, changeType) => {
    const newItems = order.changeQuantity(id, changeType.toLowerCase());
    setItems(newItems);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const removeFromCart = (id) => {
    const updatedItems = order.removeFromCart(id);
    setItems(updatedItems);
  };

  function totalPrice(items) {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0);
  }

  if (items.length === 0) return <span>Some Shopping</span>;
  // if (!user) window.location = "/";

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Menu</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.imageUrl}
                    alt=""
                    style={{ height: "75px" }}
                    className="img-thumbnail"
                  />
                </td>
                <td>{item.name}</td>
                <td>{formatPrice(item.price)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => changeQuantity(item.id, "increase")}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    disabled={item.quantity === 1 ? true : false}
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => changeQuantity(item.id, "decrease")}
                  >
                    -
                  </button>
                </td>
                <td>{formatPrice(item.quantity * item.price)}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="2x"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFromCart(item.id)}
                  />
                </td>
              </tr>
            );
          })}

          <tr>
            <th scope="row" colSpan="2">
              Cart Totals
            </th>
            <td>Qty: </td>
            <td>Total: {formatPrice(totalPrice(items))}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button>Checkout</button>
    </div>
  );
}

export default Order;
