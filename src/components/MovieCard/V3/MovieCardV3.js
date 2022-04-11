import * as S from "../V2/MovieCardV2Element";
import moment from "moment";
import noImage from "../../../images/no-image.svg";
import LazyLoad from "react-lazyload";
import { BASE_API_POSTER_URL } from "../../../utils/config";

export const MovieCardV3 = ({ movie, display }) => (
  <S.Card display={display}>
    <LazyLoad height={100}>
      <S.Wrapper>
        <S.Poster
          src={
            movie.poster_path !== null
              ? BASE_API_POSTER_URL + movie.poster_path
              : noImage
          }
          alt={movie.title}
          loading="lazy"
        />
        <S.Content>
          <div>
            <S.Name>{movie.title}</S.Name>
            <S.ReleaseDate>
              {moment(movie.release_date).format("LL")}
            </S.ReleaseDate>
          </div>
          <S.Overview>{movie.overview}</S.Overview>
        </S.Content>
      </S.Wrapper>
    </LazyLoad>
  </S.Card>
);
