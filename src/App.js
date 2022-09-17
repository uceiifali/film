import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Movies from "./Components/Movies/Movies";
import Profile from "./Components/Profile/Profile";
import Actors from "./Components/Actors/Actors";
import NavBar from "./Components/NavBar/NavBar.jsx";
import useStyles from "./styles";
import MovieInformation from "./Components/MovieInfo/MovieInformation";
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {["/", "approved"].map((path) => (
            <Route path={path} key={path} element={<Movies />} />
          ))}
          <Route path="/profile/:id" element={<Profile />} exact />
          <Route path="/movie/:id" exact element={<MovieInformation />} />
          <Route path="/actors/:id" exact element={<Actors />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
