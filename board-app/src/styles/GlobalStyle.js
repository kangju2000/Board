import { createGlobalStyle } from "styled-components";
import { BodyColor } from "./styles";
import "../fonts/font.css";

const GlobalStyle = createGlobalStyle`
    body {
        width:100vw;
        height:100vh;
        margin: 0;
        box-sizing: border-box;
        overflow-x: hidden;
        background-color: ${BodyColor};
        font-family: "Suit-medium";
    }
    p {
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
