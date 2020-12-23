import React, { useContext, useEffect, useState } from "react";
import { ContextCart } from "../context/ContextCart";
import { ContextProducts } from "../context/ContextProducts";
import styled from "styled-components";

const Cart = () => {
  const { cart, updateQuantity, deleteFromCart } = useContext(ContextCart);
  const { List } = useContext(ContextProducts);
  const [stockAvailable, setStockAvailable] = useState(true)

  useEffect(() => {}, [cart]);
  const validateQuantity = (id, price, value) => {
    const itemFilteredList = List.filter((t) => t.id === id);
    const itemFilteredCart = cart.products.filter((a) => a[0] === id);

    if (
      (value === -1 && +itemFilteredCart[0][1] > 0) ||
      (value === 1 && +itemFilteredCart[0][1] < itemFilteredList[0].stock)
    ) {
      return updateQuantity(id, price, value);
    }

    setStockAvailable(false)

    setTimeout ( ()=> {
      setStockAvailable(true)
    }, 2000)

  };

  return (
    <section id="cart">
      <CartContainer>
        <h2>Your Cart</h2>
        <ListCart>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          {cart.products.length > 0
            ? cart.products.map((t, index) => {
                return (
                  <thead key={index}>
                    <ListItem
                      style={
                        t[1] === 0
                          ? { color: "gray", textDecoration: "line-through" }
                          : { color: "black" }
                      }
                    >
                      <td>{List[t[0]].name}</td>
                      <td id="alignRight">
                        <div
                          style={{
                            display: "inline",
                            border: "1px black solid",
                            padding: "2px 3px",
                            marginRight: " 10px",
                          }}
                        >
                          {t[1]}
                        </div>
                        <button
                          onClick={
                            () =>
                              validateQuantity(
                                List[t[0]].id,
                                List[t[0]].price,
                                1
                              )
                          }
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            validateQuantity(
                              List[t[0]].id,
                              List[t[0]].price * -1,
                              -1
                            )
                          }
                        >
                          -
                        </button>
                        <button onClick= {()=> deleteFromCart(t[0], List[t[0]].price * t[1])}>Del</button>
                      </td>
                      <td id="alignRight">{List[t[0]].price.toFixed(2)} €</td>
                      <td id="alignRight">
                        {(List[t[0]].price * t[1]).toFixed(2)} €
                      </td>
                    </ListItem>
                  </thead>
                );
              })
            : null}
        </ListCart>
        <Total>Total: {cart.total.toFixed(2)} €</Total>
      </CartContainer>
      {!stockAvailable ?
      <StockMaximun>You reach the maximun stock available</StockMaximun>
    : ''}
    </section>
  );
};

export default Cart;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20vh 2em;
  background-color: white;
  min-height: 100vh;
  h2 {
    color: tomato;
    text-transform: uppercase;
    font-size: 2rem;
  }
`;

export const ListCart = styled.table`
  margin: 0 auto;
  width: calc(70% - 4em);
  padding: 20px;
  border: 1px solid black;
  th {
    background-color: whitesmoke;
    padding: 8px;
  }
`;

export const ListItem = styled.tr`
  text-align: left;
  width: calc(100% - 4em);
  border: 1px solid black;
  td#alignRight {
    text-align: right;
    padding: 8px;
  }
  td input {
    width: 30px;
  }
  button {
    padding: 5px;
    margin-right: 5px;
  }
`;
export const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const StockMaximun = styled.div`
 background-color: white;
 color: tomato;
 border-radius: 10px;
 padding: 10px 20px;
 position: fixed;
 bottom: 0;
 z-index: 99;
`
