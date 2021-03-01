import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import AuthoContext from "../context/AuthContext";
import { bucketImgUrl } from "../config.json";
import Input from "./common/Input";
import orderService from "../services/orderService";
import Table from "./common/Table";
import useAuth from "./hooks/useAuth";
import { useOrder } from "./hooks/useOrder";

function Order() {
  const order = useOrder();
  const [items, setItems] = useState([]);
  const { user } = useAuth(AuthoContext);

  useEffect(() => {
    const items = orderService.getOrderItems();
    setItems(items);
  }, []);

  const columns = [
    { label: "#", path: "index" },
    {
      label: "Menu",
      path: "image",
      className: "order-img-thumbnail quantity-img",
      content: (item) => `${bucketImgUrl}/${item.image}`,
    },
    { label: "Name", path: "name" },
    {
      label: "Quantity",
      path: "quantity",
      content: (item) => (
        <div className="quantity-container">
          <div>
            <Input
              className="quantity-btn"
              disabled={item.quantity === 1 ? true : false}
              type="button"
              onClick={() => changeQuantity(item.id, "decrease")}
              value="&#8722;"
            />
          </div>
          <div className="quantity">{item.quantity}</div>
          <div>
            <Input
              className="quantity-btn"
              onClick={() => changeQuantity(item.id, "increase")}
              type="button"
              value="&#43;"
            />
          </div>
        </div>
      ),
    },
    {
      label: "Price",
      path: "price",
      content: (item) => formatPrice(item.price),
    },
    {
      label: "Subtotal",
      path: "subtotal",
      content: (item) => formatPrice(item.quantity * item.price),
    },
    {
      label: "Remove",
      path: "remove",
      content: (item) => (
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="2x"
          style={{ cursor: "pointer" }}
          onClick={() => removeFromCart(item.id)}
        />
      ),
    },
  ];

  const changeQuantity = (id, changeType) => {
    const newItems = order.changeQuantity(id, changeType.toLowerCase());
    setItems(newItems);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const placeAnOrder = async () => {
    const data = {
      orderDate: new Date(),
      orderStatus: 0, // 0:confirmed
      orderMethod: 0, // 0:web
      orderTotal: totalPrice(items),
      email: user,
      orderMenus: items.map((item) => {
        return {
          menuId: parseInt(item.id),
          price: item.price,
          quantity: item.quantity,
        };
      }),
    };

    const result = await orderService.placeAnOrder(data);

    if (result.status === 201) {
      alert("Your order is confirmed.");
      orderService.removeAllItems();
      window.location = "/";
    }
  };

  const removeFromCart = (id) => {
    const updatedItems = order.removeFromCart(id);
    setItems(updatedItems);
  };

  const totalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0);
  };

  if (items.length === 0) return <div className="container"></div>;

  return (
    <div className="container mt-5">
      <Table className="table table-hover" columns={columns} items={items} />
      <div className="order-total">
        <h5>Total: {formatPrice(totalPrice(items))}</h5>
      </div>
      <div className="checkout-container">
        <Input
          className="checkout-btn"
          onClick={() => placeAnOrder()}
          type="button"
          value="Place Your Order"
        />
        {/* <Link className="checkout-btn" to={"/checkout"}>
            Proceed To Checkout
          </Link> */}
      </div>
    </div>
  );
}

export default Order;
