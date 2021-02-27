import React, { useState, useEffect } from "react";
import { bucketImgUrl } from "../config.json";

import { useOrder } from "../components/hooks/useOrder";
import menuService from "../services/menuService";
import Loading from "./common/Loading";

function SpecialMenu() {
  const order = useOrder();
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (menu) => {
    const item = {
      id: menu.MenuId,
      name: menu.MenuName,
      price: menu.Price,
      quantity: 1,
      image: menu.Image,
    };

    order.addToCart(item);
  };

  useEffect(() => {
    async function getSpecials() {
      try {
        setLoading(true);
        setSpecials(await menuService.getSpecials());
        setLoading(false);
      } catch (error) {
        console.log("Unable to get specials.", error);
      }
    }
    getSpecials();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="special-menu">
      <div className="special-menu-center">
        {specials.map((menu) => {
          return (
            <div className="menu" key={menu.MenuId}>
              <div className="img-container">
                <div className="menu-btn-primary menu-link">Add</div>
                <img src={`${bucketImgUrl}/${menu.Image}`} alt={menu.Image} />
              </div>
              <div className="menu-info">
                {menu.MenuName}: ${menu.Price}
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
}

export default SpecialMenu;
