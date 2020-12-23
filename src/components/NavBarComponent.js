import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const NavBarComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  return (
    <SearchContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/search/${searchResults}`);
        }}
      >
        <input
          type="search"
          placeholder = "Search"
          onChange={(e) => {
            setSearchResults(e.target.value);
          }}
        />
      </form>
    </SearchContainer>
  );
};

export default NavBarComponent;

export const SearchContainer = styled.div`
  input[type="search"] {
    outline: none;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    width: 30vw;
  }
  }
`;
