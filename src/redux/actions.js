import Swal from "sweetalert2";
import {
  SweetAlertFailure,
  SweetAlertSuccessful,
  SweetAlertWarning,
} from "../models/models";
import { cyberSoftServices } from "../services/cybersoftServices";
import { dbMovie, TMDB_KEY } from "../utils/config";

const alertUserSuccess = new SweetAlertSuccessful();
const alertUserFailure = new SweetAlertFailure();
const alertWarning = new SweetAlertWarning();

function push(path) {
  history.push(path || "/");
  window.location.reload();
}

export const LoginAction = (userInfo) => {
  return async (dispatch) => {
    try {
      const result = await cyberSoftServices.post(
        `api/QuanLyNguoiDung/DangNhap`,
        userInfo
      );

      dispatch({
        type: "SET_LOGIN",
        userLogin: result.data,
      });

      Swal.fire({
        ...alertUserSuccess,
        didDestroy: () => push(),
      });
    } catch (error) {
      alertUserFailure.title = "Login Failed";
      alertUserFailure.text = "User Name or Your Password are not correct!";
      Swal.fire({ ...alertUserFailure });
      console.log("errors", error.response?.data);
    }
  };
};

export const RegisterAction = (userInfo) => {
  return async () => {
    try {
      await cyberSoftServices.post(`api/QuanLyNguoiDung/DangKy`, userInfo);
      Swal.fire({
        ...alertUserSuccess,
        didDestroy: () => push(),
      });
    } catch (errors) {
      alertUserFailure.title = "Register Fail";
      alertUserFailure.text = errors.response?.data;
      Swal.fire({ ...alertUserFailure });
    }
  };
};

export const getAccountInfoAction = (account) => {
  return async (dispatch) => {
    try {
      if (!localStorage.getItem(USER_LOGIN)) {
        Swal.fire({
          ...alertWarning,
          didDestroy: () => {
            push("/login");
          },
        });
      }

      const result = await cyberSoftServices.post(
        `api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        account
      );

      dispatch({
        type: "SET_ACCOUNT_INFO",
        accountInfo: result.data,
        ticket: result.data.thongTinDatVe.reverse(),
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const putUpdateUserAction = (userUpdate) => {
  return async (dispatch) => {
    try {
      await cyberSoftServices
        .put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userUpdate)
        .then(() => {
          Swal.fire({
            ...alertUserSuccess,
            didDestroy: () => {
              dispatch(getAccountInfoAction());
              localStorage.setItem(USER_LOGIN, JSON.stringify(userUpdate));
              window.location.reload();
            },
          });
        })
        .catch((errors) => {
          throw errors;
        });
    } catch (errors) {
      alertUserFailure.title = "Update Failed";
      alertUserFailure.text = `${errors.response?.data}`;
      Swal.fire({ ...alertUserFailure });
      console.log(errors);
    }
  };
};

export const displayLoadingAction = {
  type: "DISPLAY_LOADING",
};

export const hideLoadingAction = {
  type: "HIDE_LOADING",
};

export const getMoviesListAction = (movieName = "") => {
  return async (dispatch) => {
    try {
      await dispatch(displayLoadingAction);

      let result = "";

      if (movieName.trim() !== "") {
        result = await cyberSoftServices.get(
          `api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${movieName}`
        );
      } else {
        result = await cyberSoftServices.get(
          `api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`
        );
      }

      dispatch({
        type: "GET_MOVIES_LIST",
        movieList: result.data
          .filter((movie) => movie.maPhim > 10000)
          .sort((a, b) =>
            Date.parse(a.ngayKhoiChieu) < Date.parse(b.ngayKhoiChieu) ? 1 : -1
          ),
      });
      await dispatch(hideLoadingAction);
    } catch (error) {
      await dispatch(hideLoadingAction);
      console.log("error: ", error.response?.data);
    }
  };
};

export const getMovieDetailAction = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(displayLoadingAction);
      let obj = dbMovie.find((movie) => movie.maPhim === id);

      let tmdb = await cyberSoftServices.getTMDB(
        `movie/${obj.tmdb}?api_key=${TMDB_KEY}&language=en-US`
      );

      let cybersoft = await cyberSoftServices.get(
        `api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${obj.maPhim}`
      );

      let cast = await cyberSoftServices.getTMDB(
        `movie/${obj.tmdb}/credits?api_key=${TMDB_KEY}&language=en-US`
      );

      let movie = {
        id: tmdb.data.id,
        runtime: tmdb.data.runtime,
        genres: tmdb.data.genres,
        poster_path: tmdb.data.poster_path,
        backdrop_path: tmdb.data.backdrop_path,
        title: tmdb.data.title,
        tagline: tmdb.data.tagline,
        overview: tmdb.data.overview,
        showtime: cybersoft.data.heThongRapChieu,
        trailer: cybersoft.data.trailer,
        titleUrl: cybersoft.data.biDanh,
        idMovie: cybersoft.data.maPhim,
        release_date: tmdb.data.release_date,
        cast: cast.data.cast,
      };

      await dispatch({
        type: "GET_MOVIE_DETAIL",
        movie: movie,
      });

      await dispatch(hideLoadingAction);
    } catch (error) {
      await dispatch(hideLoadingAction);
      console.log("error: ", error);
    }
  };
};
