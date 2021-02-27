import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bucketImgUrl } from "../config.json";

import Image from "./common/Image";
import Input from "./common/Input";
import Loading from "./common/Loading";
import menuService from "../services/menuService";
import { useOrder } from "../components/hooks/useOrder";

function MenuDetails(props) {
  const order = useOrder();
  const [menu, setMenu] = useState({});
  const [imgSrc, setImgeSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const id = props.match.params.id;

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
    async function getMenu() {
      try {
        const result = await menuService.getMenu(parseInt(id));
        setMenu(result);
        setImgeSrc(`${bucketImgUrl}/${result.Image}`);
        setLoading(false);
      } catch (error) {
        console.log("Unable to get menu.", error);
      }
    }
    getMenu();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <div className="menu-details-container">
      <div className="menu-details-image">
        <Image src={imgSrc} alt={menu.MenuName} className="detail-photo" />
      </div>
      <div className="menu-info-container">
        <div className="menu-details-desc">
          <h3>Description</h3>
          <p>{menu.Description}</p>
        </div>
        <div className="menu-details-info">
          <h3>Info</h3>
          <h6>Name: {menu.MenuName}</h6>
          <h6>Price: ${menu.Price}</h6>
          <h6>Category: {menu.Category}</h6>
        </div>
        <div className="menu-details-buttons">
          <Input
            type="button"
            id="add"
            name="add"
            value="Add To Cart"
            className="menu-details-btn-add menu-info mr-2"
            onClick={() => addToCart(menu)}
          />
          <Link to="/menus" className="menu-details-btn-add menu-info">
            Back To List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuDetails;
