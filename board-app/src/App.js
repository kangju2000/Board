import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import BoardPage from "./components/views/BoardPage/BoardPage";


export default function App(props) {
    const callApi = async () => {
        axios
            .get("/api/hello")
            .then((res) => {
                console.log(res.data);
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
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/board" element={<BoardPage />} />
            </Routes>
        </>
    );
}
