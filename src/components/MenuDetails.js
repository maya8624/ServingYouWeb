import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMenu } from "../services/menuService";
import { useOrder } from "../components/hooks/useOrder";

function MenuDetails(props) {
  //const [menu, setMenu] = useState([]);
  const order = useOrder();

  const id = props.match.params.id;
  const menu = getMenu(parseInt(id));

  const addToCart = (menu) => {
    const item = {
      id: menu.id,
      name: menu.name,
      price: menu.price,
      quantity: 1,
      imageUrl: menu.image.url,
    };

    order.addToCart(item);
  };

  // useEffect(() => {
  //   setMenu(getMenu(parseInt(id)));
  // }, [id]);

  return (
    <section className="menu-details-container">
      <div className="menu-details-image">
        <img src={menu.image.url} alt={menu.id} />
      </div>
      <div className="menu-info-container">
        <div className="menu-details-desc">
          <h3>Description</h3>
          <p>{menu.description}</p>
        </div>
        <div className="menu-details-info">
          <h3>Info</h3>
          <h6>Name: {menu.name}</h6>
          <h6>Price: ${menu.price}</h6>
          <h6>Category:Italian</h6>
        </div>
        <div className="menu-details-buttons">
          <input
            type="button"
            value="Add To Cart"
            onClick={() => addToCart(menu)}
          />
          <Link to="/menuList" className="button-style btn btn-succes">
            Back To List
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MenuDetails;
