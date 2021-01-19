import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../components/hooks/useOrder";
import { getMenus } from "../services/menuService";

import Input from "./common/Input";
import Select from "./common/Select";

function Menus(props) {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [price, setPrice] = useState(0);
  const order = useOrder();

  let filters = {
    category: "All",
    price: 0,
    special: false,
  };
  console.log("render");

  useEffect(() => {
    const result = getMenus();
    setMenus(result);
    setFilteredMenus(result);
  }, []);

  const minPrice = 0;
  const maxPrice = getMaxPrice();

  function getMaxPrice() {
    return Math.max(...menus.map((menu) => menu.price));
  }

  let categories = getUniqueValues("category");
  categories = ["All", ...categories];

  function getUniqueValues(value) {
    return [...new Set(menus.map((menu) => menu[value]))];
  }

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

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    filters = { ...filters, [name]: value };
    setPrice(filters.price);

    filterMenus();
  };

  function filterMenus() {
    let sortedMenus = [...menus];

    // filter by category
    if (filters.category !== "All") {
      sortedMenus = sortedMenus.filter((m) => m.category === filters.category);
    }

    // filter by price
    sortedMenus = sortedMenus.filter((m) => m.price >= filters.price);

    // filter by special
    if (filters.special) {
      sortedMenus = sortedMenus.filter((m) => m.special === filters.special);
    }

    setFilteredMenus(sortedMenus);
  }

  return (
    <div className="container">
      <section className="filter-container">
        <h4>Search Menu</h4>
        <div>
          <Select
            items={categories}
            name="category"
            title="Category"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">
            Menu Price ${price === 0 ? maxPrice : price}
          </label>
          <Input
            className="form-control"
            id="price"
            name="price"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price === 0 ? maxPrice : price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <Input
            id="special"
            name="special"
            title="Special"
            type="checkbox"
            onChange={handleChange}
          />
          <label htmlFor="special">Special</label>
        </div>
      </section>

      <div className="section-center">
        {filteredMenus.map((menu) => {
          return (
            <article key={menu.id} className="menu-item">
              <img src={menu.image.url} alt={menu.name} className="photo" />
              <div className="item-info">
                <header>
                  <h4>{menu.name}</h4>
                  <h4 className="price">$ {menu.price}</h4>
                </header>
                <p className="item-text">
                  {menu.description.slice(0, 60)}......
                </p>
                <input
                  type="button"
                  value="Add"
                  className="btn btn-outline-dark btn m-1"
                  onClick={() => addToCart(menu)}
                />

                <Link
                  to={`/menuDetails/${menu.id}`}
                  className="btn btn-outline-dark btn m-1"
                >
                  View
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Menus;
