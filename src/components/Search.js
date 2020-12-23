import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ContextProducts } from "../context/ContextProducts";

const Search = () => {
  const { query } = useParams();
  const history = useHistory();
  const { List } = useContext(ContextProducts);
  const includesText = List.filter((t) => {
    return t.name.includes(query);
  });

  return (
    <section id="search">
      <SearchContainer>
        <Title>
          <h2>Searching for: {query} </h2>
        </Title>
        {includesText.length > 0 ? (
          includesText.map((t, index) => {
            return (
              <ResultsContainer key={index}>
                <img src={t.imgUrl} alt={index} width="150px" height="150px" />
                <div>
                  <div>{t.name}</div>
                  <div style = {{width: 300}}>{t.description}</div>
                  <div>{t.price.toFixed(2)} €</div>
                </div>
                <button onClick={() => history.push(`/item/${t.id}`)}>
                  More
                </button>
              </ResultsContainer>
            );
          })
        ) : (
          <NoMatches>- No matches found -</NoMatches>
        )}
      </SearchContainer>
    </section>
  );
};

export default Search;

export const SearchContainer = styled.div`
  margin-top: 80px;
  min-height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ResultsContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  justify-content: center;
  button {
    background-color: tomato;
    color: white;
    height: 50px;
    padding: 5px 10px;
    margin-left: 20px;
    font-size: 1rem;
    border-radius: 10px;
    border: none;
    outline: none;
    &:hover {
      background-color: black;
      color: tomato;
    }
  }
  img {
    margin-right: 20px;
    filter: grayscale(100%);
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  height: 80px;
`

export const NoMatches = styled.div`
  margin: 25vh auto;
  font-family: sans-serif;
  font-size: 1.3rem;
  text-transform: uppercase;
`;
