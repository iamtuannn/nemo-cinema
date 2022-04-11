import * as S from "./MovieCardV2Element";
import { Link } from "react-router-dom";
import moment from "moment";
import noImage from "../../../images/no-image.svg";
import LazyLoad from "react-lazyload";

export const MovieCardV2 = ({ movie }) => (
  <S.Card>
    <LazyLoad height={100}>
      <S.Wrapper>
        <Link to={`/movie/${movie.biDanh}-${movie.maPhim}/`} target="_top">
          <S.Poster
            src={movie.hinhAnh !== "" ? movie.hinhAnh : noImage}
            alt={movie.tenPhim}
            loading="lazy"
          />
        </Link>

        <S.Content>
          <div>
            <Link to={`/movie/${movie.biDanh}-${movie.maPhim}/`} target="_top">
              <S.Name>{movie.tenPhim}</S.Name>
            </Link>
            <S.ReleaseDate>
              {moment(movie.ngayKhoiChieu).format("LL")}
            </S.ReleaseDate>
          </div>
          <S.Overview>{movie.moTa}</S.Overview>
        </S.Content>
      </S.Wrapper>
    </LazyLoad>
  </S.Card>
);
