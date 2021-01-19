import menus from "../data";

export function getMenus() {
  return menus;
}

export function getMenu(id) {
  return menus.find((m) => m.id === id);
}

export function getSpecials() {
  return menus.filter((m) => m.special === true);
}
