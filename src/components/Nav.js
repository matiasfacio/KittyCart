import React from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home.js";
import OneItem from "./OneItem.js";
import Products from "./Products.js";
import Cart from "./Cart";
import NavBarComponent from "./NavBarComponent.js";
import Search from "./Search.js";

const Nav = () => {
  return (
    <div>
      <NavBar>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/products">Our Kitties</Link>
          <Link to="/cart">Cart</Link>
          <NavBarComponent />
        </ul>
      </NavBar>
      <Route path="/" exact component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/item/:id" component={OneItem} />
      <Route path="/cart" component={Cart} />
      <Route path="/search/:query" component={Search} />
    </div>
  );
};

export default Nav;

export const NavBar = styled.nav`
  background-color: tomato;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 98;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    height: 100%;
    a {
      text-decoration: none;
      color: white;
      text-transform: uppercase;
      padding: 10px 10px;
      border-radius: 10px;
      font-weight: bold;
      border-bottom: 2px tomato solid;
      &:hover {
        border-bottom: 2px white solid;
      }
      &:nth-of-type(1) {
        background-color:white;
        color: tomato;
        border: none;
      }
    }
  }
`;
