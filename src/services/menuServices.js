import menus from "../data";

export function getAllMenu() {
  return menus;
}

export function getMenu(id) {
  menus.find((m) => m.id === id);
}
