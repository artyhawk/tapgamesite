import { Route, Routes } from "react-router-dom";
import { allRoutes } from "./router";
import PrivateRoute from "./utils/PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      {allRoutes.map(route => {
        if (route.access === "public") {
          return <Route key={route.path} path={route.path} element={route.element} />;
        } else {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            />
          );
        }
      })}
    </Routes>
  );
};

export default AppRouter;
