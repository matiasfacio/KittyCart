import React from 'react';
import styled from 'styled-components'

const Footer = () => {
    return ( <FooterStyle>
            <div>React.js / React-Router-Dom / Styled Components / useContext / useReducer / useState / <a href = "https://www.matiasfacio-dev.de">www.matiasfacio-dev.de</a></div>
    </FooterStyle> );
}
 
export default Footer;

export const FooterStyle = styled.footer`
    height: 50px;
    width: 100vw;
    background-color: tomato;
    position: fixed;
    bottom: 0;
    left :0;
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    a {
        text-decoration: none;
        color: white;
    }
`