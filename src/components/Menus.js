import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { bucketImgUrl } from "../config.json";

import Image from "./common/Image";
import Input from "./common/Input";
import Loading from "./common/Loading";
import MenuFilter from "./MenuFilter";
import menuService from "../services/menuService";
import { useOrder } from "../components/hooks/useOrder";

function Menus(props) {
  const order = useOrder();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMenus, setFilteredMenus] = useState([]);

  const filterRef = useRef({ category: "All", price: 0, special: false });

  useEffect(() => {
    async function getMenus() {
      try {
        const result = await menuService.getMenus();
        setMenus(result);
        setFilteredMenus(result);
        setLoading(false);
      } catch (error) {
        console.log(`An error has occured: ${error}`);
      }
    }
    getMenus();
  }, []);

  const minPrice = 0;
  const maxPrice = getMaxPrice();

  function getMaxPrice() {
    return Math.max(...menus.map((menu) => menu.Price));
  }

  let categories = getUniqueValues("Category");
  categories = ["All", ...categories];

  function getUniqueValues(value) {
    return [...new Set(menus.map((menu) => menu[value]))];
  }

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

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    filterRef.current = { ...filterRef.current, [name]: value };

    filterMenus();
  };

  function filterMenus() {
    let sortedMenus = [...menus];
    const filters = filterRef.current;

    // filter by category
    if (filters.category !== "All") {
      sortedMenus = sortedMenus.filter((m) => m.Category === filters.category);
    }

    // filter by special
    if (filters.special) {
      sortedMenus = sortedMenus.filter((m) => m.Special === filters.special);
    }

    // filter by price
    sortedMenus = sortedMenus.filter((m) => m.Price >= filters.price);

    // set menus filtered
    setFilteredMenus(sortedMenus);
  }

  if (loading) return <Loading />;

  return (
    <div className="container">
      <MenuFilter
        categories={categories}
        price={filterRef.current.price}
        maxPrice={maxPrice}
        minPrice={minPrice}
        handleChange={handleChange}
      />
      <div className="section-center">
        {filteredMenus.map((menu) => {
          return (
            <div key={menu.MenuId} className="menu-item">
              <Image
                src={`${bucketImgUrl}/${menu.Image}`}
                alt={menu.MenuName}
                className="photo"
              />
              <div className="item-info">
                <header>
                  <h4>{menu.MenuName}</h4>
                  <h4 className="price">$ {menu.Price}</h4>
                </header>
                <p className="item-text">
                  {menu.Description.slice(0, 60)}......
                </p>
                <Input
                  id="add"
                  type="button"
                  value="Add"
                  className="menu-btn-primary mr-2"
                  onClick={() => addToCart(menu)}
                />
                <Link
                  to={`/menuDetails/${menu.MenuId}`}
                  className="menu-btn-primary"
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menus;
