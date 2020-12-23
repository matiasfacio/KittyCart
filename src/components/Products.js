import React, { useContext } from "react";
import { ContextProducts } from "../context/ContextProducts";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

const Products = () => {
  const { List } = useContext(ContextProducts);
  const history = useHistory()

  return (
    <section id="products">
      <ContainerProducts>
      <Title>
          <h2>Our Kitties</h2>
        </Title>
      {List.map((t, index) => {
        return (
          <Item key={index}>
            <Img src={t.imgUrl} alt={`img${index}`} />
            <RightColumn>
              
              <Name>{t.name} / {t.description}</Name>
              <Price>{t.price.toFixed(2)}€</Price>
              <div>ID: {t.id}</div>
              <div style = {t.stock === 0 ? {color: 'red', textDecoration: 'line-through'}: {color: 'black', textDecoration:'none'}}>STOCK: {t.stock}</div>
            </RightColumn>
            <button onClick = {()=> history.push(`/item/${t.id}`)}>More</button>
          </Item>
        );
      })}
      </ContainerProducts>
    </section>
  );
};

export default Products;

export const Img = styled.img`
    max-height: 100px;
    width: 100px;
    border-radius: 10px;
    filter: grayscale(100%);
`

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px auto;
  button {
    background-color: tomato;
    color: white;
    height: 50px;
    font-size: 1rem;
    padding: 5px 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    &:hover{
        background-color: white;
        color: tomato;
        border: 1px tomato solid;
    }
`;

export const RightColumn = styled.div`
  margin-left: 30px;
  width: 400px;
`

export const ContainerProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  margin: 140px auto;
  background-color: white;
  h2 {
    text-align: center;
    padding: 20px;
  }
`

export const Name = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
`

export const Price = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    padding: 10px;
`

export const Title = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 80px;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  text-align: center;
  color: tomato;
  font-size: 1.4rem;
  text-transform: uppercase;
`