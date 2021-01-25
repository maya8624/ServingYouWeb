import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext2";

export const useOrder = () => {
  return useContext(OrderContext);
};
