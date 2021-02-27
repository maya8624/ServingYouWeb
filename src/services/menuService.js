import http from "./httpService";
import { awsApiUrl } from "../config.json";

const awsApiEndPoint = `${awsApiUrl}/menus`;

export async function getMenus() {
  try {
    const { data } = await http.get(awsApiEndPoint);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMenu(id) {
  try {
    const { data } = await http.get(`${awsApiUrl}/menu/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSpecials() {
  try {
    const { data } = await http.get(`${awsApiEndPoint}/specials`);
    return data;
  } catch (error) {
    console.log("An error has occurred while fetching specials.", error);
  }
}

const menuService = {
  getMenu,
  getMenus,
  getSpecials,
};

export default menuService;
