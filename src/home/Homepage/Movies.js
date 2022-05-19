import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReactSlick,
  RSNextArrow,
  RSPrevArrow,
} from "../../components/ReactSlick/ReactSlick";
import { getMoviesListAction } from "../../redux/actions";
import { MovieCardV1 } from "../../components/MovieCard/V1/MovieCardV1";
import { LoadingCardV2 } from "../../components/Loading/Loading";

export default function Movies({ movies }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

  useEffect(() => {
    dispatch(getMoviesListAction());
  }, [dispatch]);


  return (
    <>
      {isLoading ? (
        <ReactSlick {...settings}>
          <LoadingCardV2 />
          <LoadingCardV2 />
          <LoadingCardV2 />
          <LoadingCardV2 />
          <LoadingCardV2 />
          <LoadingCardV2 />
          <LoadingCardV2 />
        </ReactSlick>
      ) : (
        <ReactSlick {...settings}>
          {movies.map((movie, i) => (
            <MovieCardV1 movie={movie} isRSlick={true} key={i} />
          ))}
        </ReactSlick>
      )}
    </>
  );
}

const settings = {
  dots: false,
  infinite: true,
  swipeToSlide: true,
  slidesToShow: 5,
  nextArrow: <RSNextArrow center />,
  prevArrow: <RSPrevArrow center />,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
