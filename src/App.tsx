import { Route, Routes } from "react-router-dom";
import RequiredAuth from "./component/RequiredAuth/RequireAuth";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
  const privateRoutes = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/profile/:username",
      component: <Profile />,
    },
  ];

  return (
    <Routes>
      {privateRoutes.map(({ path, component }, idx) => {
        return (
          <Route
            key={idx}
            path={path}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            element={<RequiredAuth children={component} />}
          />
        );
      })}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
