import { useContext } from "react";
import OrderContext from "../../context/orderContext";

const useOrder = () => {
  const { items, setItems } = useContext(OrderContext);

  const addToCart = (item) => {
    const items = JSON.parse(localStorage.getItem("order")) || [];
    items.push(item);

    const newItemList = items.reduce((accumulator, currentItem) => {
      const item = accumulator.find((a) => a.id === currentItem.id);

      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        accumulator.push({
          quantity: 1,
          ...currentItem,
        });
      }
      return accumulator;
    }, []);

    localStorage.setItem("order", JSON.stringify(newItemList));
    setItems(newItemList);
  };

  const removeFromCart = (id) => {
    const items = getCartItems();
    const updatedItems = items.filter((item) => item.id !== id);

    localStorage.setItem("order", JSON.stringify(updatedItems));
    setItems(updatedItems);

    return getCartItems();
  };

  const getCartItems = () => {
    const items = JSON.parse(localStorage.getItem("order"));
    setItems(items);
    return items;
  };

  const changeQuantity = (id, changeType) => {
    const items = getCartItems();

    // const newitems = items.map((item) =>
    //   item.id === id
    //     ? {
    //         ...item,
    //         quantity:
    //           changeType === "increase" ? item.quantity + 1 : item.quantity - 1,
    //       }
    //     : item
    // );

    const index = items.findIndex((item) => item.id === id);
    changeType === "increase"
      ? items[index].quantity++
      : items[index].quantity--;

    localStorage.setItem("order", JSON.stringify(items));
    setItems(items);

    return getCartItems();
  };

  return { items, addToCart, getCartItems, changeQuantity, removeFromCart };
};

export default useOrder;
