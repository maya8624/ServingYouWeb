import React, { useState, useEffect } from "react";

import { useOrder } from "../components/hooks/useOrder";
import { getSpecials } from "../services/menuService";

const SpecialMenu = () => {
  const [specials, setSpecials] = useState([]);
  const order = useOrder();

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

  useEffect(() => {
    setSpecials(getSpecials);
  }, []);

  return (
    <div className="special-menu">
      <div className="special-menu-center">
        {specials.map((menu) => {
          return (
            <div className="menu" key={menu.id}>
              <div className="img-container">
                <div className="menu-btn-primary menu-link">Add</div>
                <img src={menu.image.url} />
              </div>
              <div className="menu-info">
                {menu.name}: ${menu.price}
              </div>
              <div
                className="menu-btn-add menu-info"
                onClick={() => addToCart(menu)}
              >
                Add To Cart
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialMenu;
