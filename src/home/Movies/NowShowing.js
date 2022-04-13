import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEMO } from "../../utils/config";
import { getMoviesListAction } from "../../redux/actions";
import { Heading, Container } from "../../styles/Styles";
import { MovieGridV1, MovieGridV2 } from "../../components/MovieGrid/MovieGrid";
import { MovieCardV1 } from "../../components/MovieCard/V1/MovieCardV1";
import { MovieCardV2 } from "../../components/MovieCard/V2/MovieCardV2";
import Loading from "../../components/Loading/Loading";
export default function NowShowing() {
  const movies = useSelector((state) => state.MovieReducer.nowShowing);
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesListAction());
    document.title = `Now Showing Movies - ${NEMO}`;
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Heading>Now Showing</Heading>
          <MovieGridV1>
            {movies.map((movie, index) => (
              <MovieCardV1 movie={movie} key={index} />
            ))}
          </MovieGridV1>
          <MovieGridV2>
            {movies.map((movie, index) => (
              <MovieCardV2 movie={movie} key={index} />
            ))}
          </MovieGridV2>
        </>
      )}
    </Container>
  );
}
