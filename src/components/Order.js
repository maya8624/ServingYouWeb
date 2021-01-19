import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faMinus } from "@fortawesome/free-solid-svg-icons";
import orderService from "../services/orderService";
import { useOrder } from "./hooks/useOrder";
import Icon from "./common/Icon";
import { Link } from "react-router-dom";

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

  const totalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0);
  };

  const getDates = () => {
    const days = 10; // initial days
    const dates = [];
    const dt = new Date();

    for (let i = 1; i <= days; i++) {
      dt.setDate(dt.getDate() + 1);

      let dd = dt.getDate();
      let mm = dt.getMonth() + 1;
      let yyyy = dt.getFullYear();

      dates.push(`${dd}/${mm}/${yyyy}`);
    }

    return dates;
  };

  const getTimes = (year, month, day) => {
    const times = [];
    const start = new Date();

    start.setFullYear(year);
    start.setMonth(month);
    start.setDate(day);

    // start hour: 12
    let startHour = 12;
    let startMin = "30";

    const startDate = `${year}${month}${day}`;

    // current date
    const current = new Date();
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1;
    const currentDay = current.getDate();
    const currentHour = current.getHours();
    const currentDate = `${currentYear}${currentMonth}${currentDay}`;

    // endTime 20:30
    const endHour = 20;
    const interval = 30;

    // food preparing time: 30 min
    const preparingTime = 30;

    const isToday = startDate > currentDate ? false : true;

    if (isToday) {
      if (currentHour >= endHour) {
        console.log("closed");
        return null;
      }

      current.setMinutes(current.getMinutes() + preparingTime);
      startMin = current.getMinutes();
      startHour = current.getHours();
    }

    for (let i = startHour; i <= endHour; i++) {
      times.push(`${i}:${isToday ? pickUpTime : startMin}`);

      for (let j = 1; j < 2; j++) {
        current.setHours(i, interval);
        times.push(`${i}:${j * interval}`);
      }
    }

    const pickUpTime = startMin > interval ? "00" : "30";

    if (isToday) {
      if (pickUpTime === "00") return times.slice(2);
      else return times.slice(1);
    } else return times;
  };

  if (items.length === 0) return <span>Some Shopping</span>;
  // if (!user) window.location = "/";

  return (
    <div className="container">
      <div className="order-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Menu</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <img
                        alt=""
                        className="img-thumbnail quantity-img"
                        src={item.imageUrl}
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <div className="quantity-container">
                      <div>
                        <input
                          disabled={item.quantity === 1 ? true : false}
                          type="button"
                          className="quantity-btn"
                          onClick={() => changeQuantity(item.id, "decrease")}
                          value="&#8722;"
                        />
                      </div>
                      <div className="quantity">{item.quantity}</div>
                      <div>
                        <input
                          type="button"
                          className="quantity-btn"
                          onClick={() => changeQuantity(item.id, "increase")}
                          value="&#43;"
                        />{" "}
                      </div>
                    </div>
                  </td>
                  <td>{formatPrice(item.price)}</td>
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
          </tbody>
        </table>

        {/* <div>
        <select>
          {getDates().map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
      <div>
        <select>
          {getTimes().map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div> */}
        <div className="order-total">
          <h5>Total: {formatPrice(totalPrice(items))}</h5>
        </div>
        <div className="checkout-container">
          <Link className="checkout-btn" to={"/checkout"}>
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Order;
