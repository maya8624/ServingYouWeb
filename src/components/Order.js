import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import useOrder from "./hooks/useOrder";

function Order() {
  const order = useOrder();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = order.getCartItems();
    console.log(items);
    setItems(items);
  }, []);

  const changeQuantity = (id, changeType) => {
    const newItems = order.changeQuantity(id, changeType.toLowerCase());
    setItems(newItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = order.removeFromCart(id);
    setItems(updatedItems);
  };

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
                <td>{item.price}</td>
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
                <td></td>
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
            <td>Total</td>
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
