import { createGlobalStyle } from "styled-components";
import { BodyColor } from "./theme";
const GlobalStyle = createGlobalStyle`
    
    body {
        width:100vw;
        height:100vh;
        margin: 0;
        box-sizing: border-box;
        overflow-y: hidden;
        background-color: ${BodyColor};
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
