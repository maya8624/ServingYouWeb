import React, { useState } from "react";
import Menu from "./Menu";
import { getAllMenu } from "../services/menuServices";

function MenuList(props) {
  const [menus, setMenus] = useState(() => getAllMenu());
  // if (menus.length === 0) {
  //   return (
  //     <div>
  //       <h3>unfortunately no menus matched your search parameters</h3>
  //     </div>
  //   );
  // }
  return <Menu menus={menus}></Menu>;
}

export default MenuList;
