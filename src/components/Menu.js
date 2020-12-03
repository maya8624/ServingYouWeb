import React, { useState, useEffect } from "react";
import Modal from "./Modal";

function Menu({ menus }) {
  const [open, setOpen] = useState(false);

  const [menu, setMenu] = useState(() => {
    console.log("value set");
  });

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <div className="row my-5">
          {menus.map((menu) => {
            return (
              <div
                key={menu.id}
                onClick={() => setMenu(menu)}
                className="col-md-3 my-3 text-center"
              >
                <img src={menu.image.url} alt={menu.name} className="w-100" />
                <h4 className="my-4">{menu.name}</h4>
                <p className="m-description">
                  {menu.description.slice(0, 60)}......
                </p>
                <a href="#" className="btn btn-outline-dark btn-md">
                  View
                </a>
                <a
                  href="#"
                  className="btn btn-outline-dark btn m-1"
                  onClick={() => setOpen(true)}
                >
                  Order
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <Modal menu={menu} qty={0} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Menu;
