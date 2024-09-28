import React, { useEffect } from "react";
import { PageTitle } from "../components/PageTitle";
import PokeList from "../components/PokeList";
import { SearchBox } from "../components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../features/pokemons/pokemonSlice";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    padding: "0!important",
    marginBottom: "2rem",
  },
  search: {
    position: "relative",
    backgroundColor: "gray",
    paddingY: "2rem",
  },
  pokeBox: {
    backgroundColor: "white",
    backgroundImage: "url('/images/container_bg.png')",
    paddingBottom: "1rem",
  },
  textSearch: {
    position: "absolute",
    zIndex: 10,
    color: "white",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "-1rem",
    backgroundColor: "gray",
    width: "40%",
    textAlign: "center",
    paddingBottom: "0.5rem",
    fontSize: 20,
    ":hover": {
      cursor: "pointer",
    },
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "-1px",
      right: 0,
      width: 0,
      borderTop: "17px solid transparent",
      borderRight: "60px solid white",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: "-1px",
      left: 0,
      width: 0,
      borderTop: "17px solid transparent",
      borderLeft: "60px solid white",
    },
  },
  pokeContainer: {
    margin: "auto!important",
    paddingTop: "2rem",
    backgroundColor: "white",
    position: "relative",
  },
  foot: {
    position: "absolute",
    content: "''",
    width: "calc(100% - 1rem)",
    margin: "auto",
    height: "2.5rem",
    backgroundColor: "white",
    left: 0,
    bottom: "-2.5rem",
    right: 0,
    "&:after": {
      position: "absolute",
      content: "''",
      width: 0,
      borderBottom: "0.5rem solid transparent",
      borderRight: "0.5rem solid white",
      bottom: 0,
      top: 0,
      left: "-0.5rem",
    },
    "&:before": {
      position: "absolute",
      content: "''",
      borderBottom: "0.5rem solid transparent",
      borderLeft: "0.5rem solid white",
      top: 0,
      bottom: 0,
      right: "-0.5rem",
    },
  },
  loadmore: {
    height: "2rem",
    margin: "1rem auto",
    backgroundColor: "#30a7d7",
    color: "#fff",
    ":hover": {
      backgroundColor: "#1b82b1",
    },
  },
  loading: {
    backgroundColor: "white",
    textAlign: "center",
    height: "6rem",
    transform: "translateY(1rem)",
  },
};

export const HomePage = () => {
  const { search, page, type, errorMessage } = useSelector(
    (state) => state.pokemons
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons({ page, search, type, limit: 20 }));
  }, [page, search, type, dispatch]);

  return (
    <>
      <PageTitle title="Pokedex" />
      <SearchBox />
      <Container maxWidth="lg" sx={styles.container}>
        {!errorMessage ? (
          <PokeList />
        ) : (
          <Typography color="error" variant="body1" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Container>
    </>
  );
};
