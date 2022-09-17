import React, { useState, useEffect } from "react";
import { Modal, Typography, Button, ButtonGroup, Grid, CircularProgress, useMediaQuery, Rating, Box } from "@mui/material";
import { Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from "@mui/icons-material";
import MovieIcon from "@mui/icons-material/Movie";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useStyles from "./styles";
import genreIcons from "../../assets/Genres/index";
import { selectGenreOrCategory } from "../Features/CurrentGenreOrCategoy";
import { useGetRecommendationsQuery, useGetMovieQuery, useGetListQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { userSelector } from "../Features/auth";
const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  // const { data: favoriteMovies } = useGetListQuery({
  //   listName: "favorite/movies",
  //   accountId: user.id,
  //   sessionId: localStorage.getItem("session_id"),
  //   page: 1,
  // });
  // const { data: watchlistMovies } = useGetListQuery({
  //   listName: "watchlist/movies",
  //   accountId: user.id,
  //   sessionId: localStorage.getItem("session_id"),
  //   page: 1,
  // });
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: "/recommendations", movie_id: id });
  const dispatch = useDispatch();
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  // useEffect(() => {
  //   setIsMovieFavorite(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  // }, [favoriteMovies, data]);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  // useEffect(() => {
  //   setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  // }, [watchlistMovies, data]);

  if (isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link to="/">Something has gone Wrong - Go back</Link>
      </Box>
    );
  }

  // const addToFavorites = async () => {
  //   await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem("session_id")}`, {
  //     media_type: "movie",
  //     media_id: id,
  //     favorite: !isMovieFavorite,
  //   });
  //   setIsMovieFavorite((prev) => !prev);
  // };
  // const addToWatchList = async () => {
  //   await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem("session_id")}`, {
  //     media_type: "movie",
  //     media_id: id,
  //     watchlist: !isMovieWatchlisted,
  //   });
  //   setIsMovieWatchlisted((prev) => !prev);
  // };
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ display: "flex", marginBottom: "30px", justifyContent: "center", height: "fit-content" }}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: "10px" }}>
              {data?.vote_average} /10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
              className={classes.links}
              key={genre.name}
            >
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography variant="subtitle1" color="textPrimary">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          OverView
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (char, i) =>
                  char.profile_path && (
                    <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${char.id}`} style={{ textDecoration: "none" }}>
                      <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${char.profile_path}`} alt={char.name} />
                      <Typography color="textPrimary">{char.name}</Typography>
                      <Typography color="textSecondary">{char.character.split("/")[0]}</Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener norefrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener norefrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button endIcon={isMovieFavorite ? <FavoriteBorderOutlined /> : <Favorite />}>{isMovieFavorite ? "Unfavorite" : "Favorite"}</Button>
                <Button endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>Watchlist</Button>
                <Button href="/" endIcon={<ArrowBack />} sx={{ borderColor: "primary.main" }}>
                  <Typography component={Link} style={{ textDecoration: "none" }} to="/" color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You Might Also Like
        </Typography>
        {/* Loop Through Recommended Movies */}
        {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : <Box>Sorry Nothing Was Found</Box>}
      </Box>
      <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
        {data?.videos?.results?.length > 0 && <iframe autoPlay className={classes.videos} framerBorder="0" title="Trailer" src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} allow="autoplay" />}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
