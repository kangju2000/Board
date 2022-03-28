import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import BoardPage from "./components/views/BoardPage/BoardPage";
import AddPage from "./components/views/BoardPage/AddPage";
import PrivateRoute from "./hoc/PrivateRoute";
import PostPage from "./components/views/BoardPage/PostPage";
import ProfilePage from "./components/views/ProfilePage/ProfilePage";
import EditPage from "./components/views/BoardPage/EditPage";

export default function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<LandingPage option={null} />} />
                <Route
                    path="/login"
                    element={
                        <PrivateRoute>
                            <LoginPage option={false} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PrivateRoute>
                            <RegisterPage option={false} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/board"
                    element={
                        <PrivateRoute>
                            <BoardPage option={true} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage option={true} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <PrivateRoute>
                            <AddPage option={true} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditPage option={true} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/posts/:id"
                    element={
                        <PrivateRoute>
                            <PostPage option={true} />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}
