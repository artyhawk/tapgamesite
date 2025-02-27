import Login from "../pages/Login";
import Dashobard from "../pages/Dashboard";
import Main from "../pages/Main";
import Apply from "../pages/Apply";
import Code from "../pages/Code";
import TournamentInfo from "../pages/TournamentInfo";
import Teams from "../pages/Teams";
import Players from "../pages/Players";
import Media from "../pages/Media";

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
    access: "private"
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
  },
  {
    path: "/tournament",
    exact: true,
    element: <TournamentInfo />,
    access: "public"
  },
  {
    path: "/tournament/:tournamentId/teams",
    exact: true,
    element: <Teams />,
    access: "public"
  },
  {
    path: "/tournament/teams/players",
    exact: true,
    element: <Players />,
    access: "public"
  },
  {
    path: "/tournament/media",
    exact: true,
    element: <Media />,
    access: "public"
  }
];
