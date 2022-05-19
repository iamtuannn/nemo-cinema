import * as S from "./MovieCardV1Element";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import getVideoId from "get-video-id";
import noImage from "../../../images/no-image.svg";
import LazyLoad from "react-lazyload";

export const MovieCardV1 = ({ movie, isRSlick = false }) => {
  const dispatch = useDispatch();
  return (
    <S.Card>
      <LazyLoad height={isRSlick ? 200 : 400}>
        <S.Rounded>
          <S.Content>
            {movie.hinhAnh !== "" ? (
              <S.Poster
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                loading="lazy"
              />
            ) : (
              <S.NoPoster src={noImage} alt="no-image" loading="lazy" />
            )}
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
          </S.Content>
          <S.Info>
            <S.Flex>
              <S.Name>{movie.tenPhim}</S.Name>
            </S.Flex>
            {Date.now() > Date.parse(movie.ngayKhoiChieu) ? (
              <S.StyledLink
                to={`/movie/${movie.biDanh}-${movie.maPhim}/`}
                target="_top"
              >
                GET TICKETS
              </S.StyledLink>
            ) : (
              <S.StyledLink
                to={`/movie/${movie.biDanh}-${movie.maPhim}/`}
                target="_top"
              >
                MORE INFO
              </S.StyledLink>
            )}
          </S.Info>
        </S.Rounded>
      </LazyLoad>
    </S.Card>
  );
};
