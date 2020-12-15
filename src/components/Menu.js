import React from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../components/hooks/useOrder";

function Menu({ menus }) {
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

  return (
    <>
      <div className="container">
        <div className="row my-5">
          {menus.map((menu) => {
            return (
              <div key={menu.id} className="col-md-3 my-3 text-center">
                <img src={menu.image.url} alt={menu.name} className="w-100" />
                <h4 className="my-4">{menu.name}</h4>
                <p className="m-description">
                  {menu.description.slice(0, 60)}......
                </p>
                <input
                  type="button"
                  value="Add"
                  className="btn btn-outline-dark btn m-1"
                  onClick={() => addToCart(menu)}
                />
                <Link
                  to="/MenuDetails"
                  className="btn btn-outline-dark btn m-1"
                >
                  View
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Modal menu={menu} qty={0} open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
}

export default Menu;
