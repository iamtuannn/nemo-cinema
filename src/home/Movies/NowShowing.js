import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEMO } from "../../utils/config";
import { getMoviesListAction } from "../../redux/actions";
import {
  Heading,
  Container,
  GridCardV1,
  GridCardV2,
} from "../../styles/Styles";
import { MovieCardV1 } from "../../components/MovieCard/V1/MovieCardV1";
import { MovieCardV2 } from "../../components/MovieCard/V2/MovieCardV2";
import {
  LoadingPageV1,
  LoadingPageV2,
} from "../../components/Loading/Loading";

export default function NowShowing() {
  const movies = useSelector((state) => state.MovieReducer.nowShowing);
   const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesListAction());
    document.title = `Now Showing Movies - ${NEMO}`;
  }, [dispatch]);

  return (
    <Container>
      <Heading>Now Showing</Heading>
      {isLoading ? (
        <LoadingPageV2 />
      ) : (
        <GridCardV1>
          {movies.map((movie, index) => (
            <MovieCardV1 movie={movie} key={index} />
          ))}
        </GridCardV1>
      )}
      {isLoading ? (
        <LoadingPageV1 />
      ) : (
        <GridCardV2>
          {movies.map((movie, index) => (
            <MovieCardV2 movie={movie} key={index} />
          ))}
        </GridCardV2>
      )}
    </Container>
  );
}
