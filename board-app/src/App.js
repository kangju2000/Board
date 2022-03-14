import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
    const callApi = async () => {
        axios
            .get("/api")
            .then((res) => {
                console.log(res.data.test);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        callApi();
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <Login />
            </div>
        </>
    );
}

export default App;
