import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Main from "./pages/main/Main";
import Active from "./pages/active/Active";
import Topics from "./pages/topics/Topics";
import DetailedPost from "./pages/posts/DetailedPost";
import { useAuthContext } from "./context/AuthContext";
import MainLayout from "./layout/Layout";
import { AuthUserData } from "./lib/types/auth";
type Props = {
  user: AuthUserData;
  accessToken: string;
};
import "./App.scss";
import TopicPosts from "./pages/posts/TopicPosts";
import UserProfile from "./pages/userProfile/UserProfile";

function AppRoutes({ user, accessToken }: Props) {
  return (
    <>
      <Navbar user={user} accessToken={accessToken!} />

      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Main />
            </MainLayout>
          }
        />
        <Route
          path="/topics"
          element={
            <MainLayout>
              <Topics />
            </MainLayout>
          }
        />
        <Route
          path="/topic/:topicId"
          element={
            <MainLayout>
              <TopicPosts />
            </MainLayout>
          }
        />
        <Route
          path="/profile/:userId/:userName"
          element={
            <MainLayout>
              <UserProfile />
            </MainLayout>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <MainLayout>
              <DetailedPost />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/active/:token" element={<Active />} />
      </Routes>
    </>
  );
}

function App() {
  const { user, accessToken } = useAuthContext();

  return (
    <BrowserRouter>
      <AppRoutes user={user!} accessToken={accessToken!} />
    </BrowserRouter>
  );
}

export default App;
