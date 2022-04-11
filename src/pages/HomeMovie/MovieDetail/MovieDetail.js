import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMovieDetailAction } from "../../../redux/actions";
import {
  BASE_API_BACKDROP_URL,
  BASE_API_POSTER_URL,
  BASE_API_PERSON_URL,
} from "../../../utils/config";
import * as S from "./MovieDetailElements";
import { FaPlay } from "react-icons/fa";
import getVideoId from "get-video-id";
import moment from "moment";
import female from "../../../images/people-female.svg";
import male from "../../../images/people-male.svg";
import { Tabs } from "antd";
import Loading from "../../../components/Loading/Loading";
import { Container } from "../../../styles/Container";
import { SectionTitle } from "../../../styles/SectionTitle";
import { AntDesignTab } from "../../../styles/AntDesign";

const { TabPane } = Tabs;

export default function MovieDetail() {
  const { movie } = useSelector((state) => state.MovieReducer);
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const dispatch = useDispatch();

  let params = useParams();
  const id = params.id * 1;

  useEffect(() => {
    dispatch(getMovieDetailAction(id));
  }, [dispatch, id]);

  const renderRuntime = () => {
    let hrs = Math.floor(movie.runtime / 60);
    let min = movie.runtime % 60;
    if (movie.runtime > 0 && movie.runtime < 60) {
      return <S.Runtime>{min} min</S.Runtime>;
    } else if (hrs === 1 && min === 0) {
      return <S.Runtime>{hrs} hour</S.Runtime>;
    } else if (hrs > 1 && min === 0) {
      return <S.Runtime>{hrs} hours</S.Runtime>;
    } else if (movie.runtime > 0) {
      return (
        <S.Runtime>
          {hrs}h {min}min
        </S.Runtime>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <S.BackDrop
            bg={
              movie.backdrop_path == null
                ? `linear-gradient(to right, rgba(38, 38, 38, 1) 20%, rgba(7.84%, 1.18%, 1.96%, 0.7) 50%)`
                : `url(${BASE_API_BACKDROP_URL}${movie.backdrop_path})`
            }
          >
            <S.CustomBackground>
              <S.Wrapper>
                <S.Content>
                  <S.PosterWrapper>
                    <S.PosterWrapperContent>
                      <S.PosterContent
                        bg={
                          movie.backdrop_path == null
                            ? `linear-gradient(to right, rgba(38, 38, 38, 1) 20%, rgba(7.84%, 1.18%, 1.96%, 0.7) 50%)`
                            : `url(${BASE_API_BACKDROP_URL}${movie.backdrop_path})`
                        }
                      >
                        <S.BackgroundGradient />
                        <S.Play>
                          <S.Button
                            onClick={() => {
                              const action = {
                                type: "SET_STATUS",
                                status: {
                                  isOpen: true,
                                  videoId: getVideoId(movie.trailer).id,
                                },
                              };

                              dispatch(action);
                            }}
                          >
                            <FaPlay />
                          </S.Button>
                        </S.Play>
                        <S.Poster
                          src={BASE_API_POSTER_URL + movie.poster_path}
                          alt={movie.title}
                        />
                      </S.PosterContent>
                    </S.PosterWrapperContent>
                  </S.PosterWrapper>
                  <S.InfoWrapper>
                    <S.InfoContent>
                      <S.Name>
                        {movie.title} (
                        {moment(movie.release_date).format("YYYY")})
                      </S.Name>
                      <S.Fact>
                        <S.Flex>
                          <S.Release>
                            {moment(movie.release_date).format("ll")}
                          </S.Release>
                          {renderRuntime()}
                        </S.Flex>
                        <S.Genres>
                          {movie.genres.map((movie) => movie.name).join(", ")}
                        </S.Genres>
                      </S.Fact>
                      <S.Trailer>
                        <S.ButtonTrailer
                          bg="var(--color-red)"
                          onClick={() => {
                            const action = {
                              type: "SET_STATUS",
                              status: {
                                isOpen: true,
                                videoId: getVideoId(movie.trailer).id,
                              },
                            };

                            dispatch(action);
                          }}
                        >
                          <S.PlayTrailer>WATCH TRAILER</S.PlayTrailer>
                        </S.ButtonTrailer>
                      </S.Trailer>
                      <S.OverviewContent>
                        {movie.tagline !== "" ? (
                          <>
                            <S.Tagline>{movie.tagline}</S.Tagline>
                            <S.Overview>{movie.overview}</S.Overview>
                          </>
                        ) : (
                          <S.Overview>{movie.overview}</S.Overview>
                        )}
                      </S.OverviewContent>
                    </S.InfoContent>
                  </S.InfoWrapper>
                </S.Content>
              </S.Wrapper>
            </S.CustomBackground>
          </S.BackDrop>
          <Container auto>
            <SectionTitle mbZero w="106px">
              Top Cast
            </SectionTitle>
            <S.Cast>
              {movie.cast.slice(0, 13).map((cast, index) => (
                <S.FlexInitial key={index}>
                  <S.Card>
                    <Link
                      to={`/person/${cast.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}-${cast.id}`}
                      target="_top"
                    >
                      <S.Profile
                        src={
                          cast.profile_path === null && cast.gender === 1
                            ? female
                            : cast.profile_path === null
                            ? male
                            : BASE_API_PERSON_URL + cast.profile_path
                        }
                        alt={cast.name}
                      />
                    </Link>
                    <S.BgWhite>
                      <Link
                        to={`/person/${cast.name
                          .toLowerCase()
                          .split(" ")
                          .join("-")}-${cast.id}`}
                        target="_top"
                      >
                        <S.CharacterName bold>{cast.name} </S.CharacterName>
                      </Link>
                      <S.CharacterName small>{cast.character}</S.CharacterName>
                    </S.BgWhite>
                  </S.Card>
                </S.FlexInitial>
              ))}
            </S.Cast>
            <SectionTitle w="120px">Showtime</SectionTitle>
            <S.Showtime>
              {Date.now() < Date.parse(movie.release_date) ? (
                <>
                  <S.NoShowtime>
                    We don't have any showtime for {movie.title}
                  </S.NoShowtime>
                  <S.NoShowtime>
                    {movie.title} expected on{" "}
                    {moment(movie.release_date).format("ll")}
                  </S.NoShowtime>
                </>
              ) : movie.showtime.length === 0 ? (
                <S.NoShowtime>
                  We don't have any showtime for {movie.title}
                </S.NoShowtime>
              ) : (
                <AntDesignTab tabPosition={"left"}>
                  {movie.showtime.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <S.CinemaLogo
                            src={htr.logo}
                            alt={htr.tenHeThongRap}
                          />
                        }
                        key={index}
                      >
                        {htr.cumRapChieu.map((cumRap, index) => {
                          return (
                            <S.Cinema key={index}>
                              <S.CinemaName>{cumRap.tenCumRap}</S.CinemaName>
                              <S.CinemaShowtime>
                                {cumRap.lichChieuPhim
                                  .slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <S.Checkout
                                        to={`/booking/${lichChieu.maLichChieu}`}
                                        key={index}
                                        target="_top"
                                      >
                                        <S.ShowtimeLink>
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </S.ShowtimeLink>
                                      </S.Checkout>
                                    );
                                  })}
                              </S.CinemaShowtime>
                            </S.Cinema>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </AntDesignTab>
              )}
            </S.Showtime>
          </Container>
        </div>
      )}
    </>
  );
}