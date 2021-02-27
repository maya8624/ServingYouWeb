import React from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import Title from "./common/Title";

function MenuFilter({
  categories,
  maxPrice,
  minPrice,
  price,
  special,
  handleChange,
}) {
  return (
    <div className="filter-container">
      <Title title="Search Menu" />
      <div className="filter-form">
        <Select
          items={categories}
          name="category"
          title="Category"
          onChange={handleChange}
        />
        <div className="filter-group">
          <label htmlFor="price">
            Menu Price ${price === 0 ? maxPrice : price}
          </label>
          <Input
            className="filter-control"
            id="price"
            name="price"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price === 0 ? maxPrice : price}
            onChange={handleChange}
          />
        </div>
        <div className="filter-group">
          <div className="single-extra">
            <Input
              id="special"
              name="special"
              title="Special"
              type="checkbox"
              checked={special}
              onChange={handleChange}
            />
            <label htmlFor="special">Special</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuFilter;
