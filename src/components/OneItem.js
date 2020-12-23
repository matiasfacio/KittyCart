import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { ContextProducts } from "../context/ContextProducts";
import { ContextCart } from "../context/ContextCart";

const OneItem = () => {
  const { List } = useContext(ContextProducts);
  const { addToCart, cart } = useContext(ContextCart);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [stockAvailable, setStockAvailable] = useState(true);
  const [tooMuch, setTooMuch] = useState(false);

  useEffect(()=> {
    return function cleanup() {
      setQuantity(0);
      setSubmitted(false);
      setStockAvailable(true);
      setTooMuch(false)
    }
  },[cart])


  const validateQuantity = (id, price, amount) => {
    if (cart.products.length === 0) {
      addToCart(id, price, amount);
      setSubmitted(true);
      setStockAvailable(false)
      setTimeout(() => {
        setSubmitted(false);
        setStockAvailable(true);
      }, 2000);
      return;
    }

    const itemFilteredList = List.filter((t) => t.id === id);
    const itemFilteredCart = cart.products.filter((a) => a[0] === id);

    if (itemFilteredList.length === 0 || itemFilteredCart.length === 0) {
      addToCart(id, price, amount);
      setSubmitted(true);
      setStockAvailable(false);
      setTimeout(() => {
        setSubmitted(false);
        setStockAvailable(true);
      }, 2000);
      return;
    }

    if (
      +itemFilteredCart[0][1] > 0 &&
      +itemFilteredCart[0][1] < itemFilteredList[0].stock &&
      +itemFilteredList[0].stock - +itemFilteredList[0][1] - amount >= 0
    ) {
      addToCart(id, price, amount);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
      return;
    }

    if (+itemFilteredList[0].stock - +itemFilteredList[0][1] - amount < 0){
      setTooMuch(true);
      setTimeout(()=>{
        setTooMuch(false)
      }, 2000)
      return
    }
  };



  return (
    <section id="oneItem">
      <ContainerOneItem>
        <Img
          src={List[id].imgUrl}
          alt={`cat-${List[id].id}`}
          width="300"
          height="300"
        />
        <InfoContainer>
          <h2>{List[id].name}</h2>
          <div>ID: {List[id].id}</div>
          <div>PRICE: {List[id].price}</div>
          <div>DESCRIPTION: {List[id].description}</div>
          <div>STOCK: {List[id].stock}</div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (quantity !== 0) {
                validateQuantity(List[id].id, List[id].price, quantity);
              }
              setQuantity(0);
            }}
          >
            <label>Qty: </label>
            <input
              type="number"
              max={List[id].stock}
              required
              placeholder={quantity}
              min="0"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button type="submit">ADD TO MY CART</Button>
          </Form>
        </InfoContainer>
      </ContainerOneItem>
      {submitted ? <FootDisplay>Added to your cart!</FootDisplay> : ""}
      {!stockAvailable ? <p>not Available</p> : ""}
      {tooMuch ? <p>There are not so many Items available, please try again</p>: ''}
    </section>
  );
};

export default OneItem;

export const ContainerOneItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  margin-top: 80px;
  padding-top: 80px;
  background-color: white;
  min-height: 100vh;
`;

export const InfoContainer = styled.div`
  margin: 30px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    text-transform: uppercase;
  }
`;

export const Img = styled.img`
  border-radius: 10px;
  border: 2px black solid;
  transition: all 0.5s ease-in-out;
  filter: grayscale(100%);
  &:hover {
    transform: scale(1.1);
    filter: none;
  }
`;

export const Button = styled.button`
  height: 50px;
  margin-top: 20px;
  max-width: 100px;
  padding: 0px 10px;
  background-color: tomato;
  color: white;
  border: none;
  border-radius: 10px;
  outline: none;
  &:hover {
    color: tomato;
    background-color: white;
    border: 1px tomato solid;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  input {
    width: 35px;
    height: 30px;
    padding-left: 5px;
    border: 1px black solid;
  }
`;

export const FootDisplay = styled.div`
  position: fixed;
  bottom:0;
  background-color: white;
  color: tomato;
  padding: 10px; 20px;
  border-radius: 10px;
  z-index: 99;
`;
