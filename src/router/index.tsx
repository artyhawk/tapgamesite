import Login from "../pages/Login";
import Dashobard from "../pages/Dashboard";
import Main from "../pages/Main";
import Apply from "../pages/Apply";
import Code from "../pages/Code";

export const allRoutes = [
  {
    path: "/auth",
    exact: true,
    element: <Login />,
    access: "public"
  },
  {
    path: "/auth/code",
    exact: true,
    element: <Code />,
    access: "public"
  },
  {
    path: "/dashboard",
    exact: true,
    element: <Dashobard />,
    access: "public"
  },
  {
    path: "/",
    exact: true,
    element: <Main />,
    access: "public"
  },
  {
    path: "/apply",
    exact: true,
    element: <Apply />,
    access: "private"
  }
];
