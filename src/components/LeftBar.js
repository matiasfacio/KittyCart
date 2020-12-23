import React from "react";
import styled from 'styled-components'

const LeftBar = () => {
  return (
    <section id="leftbar">
      <LeftBarContainer>
      </LeftBarContainer>
    </section>
  );
};

export default LeftBar;

export const LeftBarContainer = styled.div`
    padding-top: 20vh;
    width: 18vw;
    height: 100vh;
    background-color: rgba(255, 99, 71, 0.274);
    position: fixed;
    left:0;
    top:0;
    h2 {
        text-align: center;
    }
`