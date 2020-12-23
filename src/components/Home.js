import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <section id="homepage">
      <Title>
        <div>
          Kitty
          <br /> Shop
        </div>
      </Title>
    </section>
  );
};

export default Home;

export const Title = styled.h1`
  display: flex;
  height: 90vh;
  padding-left: 20vw;
  justify-content: flex-start;
  align-items: center;
  font-size: 5rem;
  z-index: 99;
  color: tomato;
  div {
      border: 10px tomato solid;
      outline: 10px white solid;
      padding: 10px;
  }
`;
