import React, { createContext, useReducer } from "react";

export const ContextCart = createContext();

const reducerCart = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        products: [...state.products, [action.data.id, action.data.quantity]],
        total: state.total + action.data.value,
      };
    case "UPDATE_QUANTITY_CART":
      return {
        total: state.total + action.data.price,
        products: state.products.map((item) => {
          return item[0] === action.data.id
            ? [action.data.id, +item[1] + +action.data.addReduce]
            : item;
        }),
      };

    case "UPDATE_QUANTITY":
      return {
        total: state.total + +action.data.price * +action.data.quantity,
        products: state.products.map((item) => {
          return item[0] === action.data.id
            ? [action.data.id, +item[1] + +action.data.quantity]
            : item;
        }),
      };

    case "DEL":
      return {
        total: state.total - +action.data.totalPrice,
        products: state.products.filter((item) => {
          return item[0] !== action.data.itemId;
        }),
      };

    default:
      return state;
  }
};

const ContextCartProvider = (props) => {
  const [cart, dispatch] = useReducer(reducerCart, {
    products: [],
    total: 0,
  });

  const addToCart = (itemId, itemValue, quantity) => {
    const itemAlreadyInCart = cart.products.filter(
      (product) => product[0] === itemId
    );

    if (itemAlreadyInCart.length === 0) {
      dispatch({
        type: "ADD",
        data: { id: itemId, value: itemValue * quantity, quantity: quantity },
      });
    }
    if (itemAlreadyInCart.length > 0) {
      dispatch({
        type: "UPDATE_QUANTITY",
        data: { id: itemId, price: itemValue, quantity: quantity },
      });
    }
  };

  const updateQuantity = (itemId, price, addReduce) => {
    dispatch({
      type: "UPDATE_QUANTITY_CART",
      data: { id: itemId, price: price, addReduce: addReduce },
    });
  };

  const deleteFromCart = (itemId, totalPrice) => {
    dispatch({
      type: "DEL",
      data: { itemId: itemId, totalPrice: totalPrice },
    });
  };

  return (
    <ContextCart.Provider
      value={{ cart, addToCart, updateQuantity, deleteFromCart }}
    >
      {props.children}
    </ContextCart.Provider>
  );
};

export default ContextCartProvider;
