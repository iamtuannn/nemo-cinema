import axios from "axios";
import Swal from "sweetalert2";
import {
  SweetAlertFailure,
  SweetAlertSuccessful,
  SweetAlertWarning,
} from "../models/models";
import { cyberSoftServices } from "../services/cyberSoftServices";
import { newsService } from "../services/newsServices";
import {
  API_NEWS,
  dbMovie,
  GROUPID,
  NEMO,
  TMDB_KEY,
  USER_LOGIN,
} from "../utils/config";

const alertUserSuccess = new SweetAlertSuccessful();
const alertUserFailure = new SweetAlertFailure();
const alertWarning = new SweetAlertWarning();

export const LoginAction = (userInfo, navigate) => {
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
        didDestroy: () => navigate("/"),
      });
    } catch (errors) {
      alertUserFailure.title = "Login Failed";
      alertUserFailure.text = "User Name or Your Password are not correct!";
      Swal.fire({ ...alertUserFailure });
      console.log("errors", errors.response);
    }
  };
};

export const RegisterAction = (userInfo, navigate) => {
  return async () => {
    try {
      await cyberSoftServices.post(`api/QuanLyNguoiDung/DangKy`, userInfo);

      alertUserSuccess.title = "Successful Registration";
      Swal.fire({
        ...alertUserSuccess,
        didDestroy: () => navigate("/login"),
      });
    } catch (errors) {
      alertUserFailure.title = "Register Fail";

      if (errors.response.data === "Email đã tồn tại!") {
        alertUserFailure.text = "Email already exists!";
      }

      if (errors.response.data === "Tài khoản đã tồn tại!") {
        alertUserFailure.text = "Account already exists!";
      }

      Swal.fire({ ...alertUserFailure });
      console.log("errors", errors.response);
    }
  };
};

export const getAccountInfoAction = (account) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction)

      const result = await cyberSoftServices.post(
        `api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        account
      );

      dispatch({
        type: "SET_ACCOUNT_INFO",
        accountInfo: result.data,
        ticket: result.data.thongTinDatVe.reverse(),
      });

      dispatch(hideLoadingAction)
    } catch (error) {
      dispatch(hideLoadingAction)
      console.log("error", error.response);
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

export const showLoadingAction = {
  type: "SHOW_LOADING",
};

export const hideLoadingAction = {
  type: "HIDE_LOADING",
};

export const getMoviesListAction = (movieName = "") => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);

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
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error: ", error.response?.data);
    }
  };
};

export const getMovieDetailAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);
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
        release_date: cybersoft.data.ngayKhoiChieu,
        cast: cast.data.cast,
      };

      await dispatch({
        type: "GET_MOVIE_DETAIL",
        movie: movie,
      });

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error: ", error);
    }
  };
};

export const getNewsAction = (url, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);
      let news = await axios.get(`${API_NEWS}/${url}`);
      dispatch({
        type: "GET_NEWS_INFO",
        news: news.data,
      });
      if (news.data === "") {
        navigate("/");
      }

      dispatch(getNewsListAction());
      document.title = `${news.data.title} - ${NEMO}/${url}`;
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log(error);
      navigate("/");
    }
  };
};

export const getNewsListAction = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);
      let result = await newsService.get();

      dispatch({
        type: "GET_NEWS_LIST",
        newsList: result.data.news.sort((a, b) => {
          return Date.parse(b.published) - Date.parse(a.published);
        }),
      });

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log(error);
    }
  };
};

export const getActorList = (page, navigate) => async (dispatch) => {
  try {
    dispatch(showLoadingAction);
    let actor = await cyberSoftServices.getTMDB(
      `person/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );
    dispatch({
      type: "GET_ACTOR",
      actor: actor.data.results,
      totalPages: actor.data.total_pages,
    });
    
    dispatch(hideLoadingAction);
  } catch (error) {
    navigate("/people")
    dispatch(hideLoadingAction);
    console.log("error: ", error.response?.data);
  }
};

export const getPersonAction = (id, nameUrl, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);

      let person = await cyberSoftServices.getTMDB(
        `person/${id}?api_key=${TMDB_KEY}&language=en-US`
      );
      dispatch({
        type: "GET_PERSON",
        person: person.data,
      });
      let url = person.data.name.toLowerCase().split(" ").join("-");
      if (url !== nameUrl) {
        navigate("/actor");
      }

      let acting = await cyberSoftServices.getTMDB(
        `person/${id}/movie_credits?api_key=${TMDB_KEY}&language=en-US`
      );
      dispatch({
        type: "GET_ACTING",
        acting: acting.data.cast,
      });

      document.title = `${person.data.name} - ${NEMO}`;

      dispatch(hideLoadingAction)
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error: ", error.response?.data);
    }
  };
};

export const getMovieShowTimesAction = (id, navigate) => {
  return async (dispatch) => {
    try {
      if (!localStorage.getItem(USER_LOGIN)) {
        Swal.fire({ ...alertWarning, didDestroy: () => navigate("/") });
      }

      dispatch(showLoadingAction);

      const result = await cyberSoftServices.get(
        `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      document.title = `${result.data.thongTinPhim.tenPhim} - ${NEMO}`;

      if (result.status === 200) {
        dispatch({
          type: "GET_CINEMA_SHOWTIME",
          movieShowtime: result.data.thongTinPhim,
          seat: result.data.danhSachGhe,
          seatIsBooking: [],
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response?.data);
    }
  };
};

export const BookingAction = (bookingInfo, navigate) => {
  return async () => {
    try {
      await cyberSoftServices.post(`api/QuanLyDatVe/DatVe`, bookingInfo);
      alertUserSuccess.title = "Successfully Booked";
      alertUserSuccess.text = "Enjoy your movie!";
      Swal.fire({
        ...alertUserSuccess,
        didDestroy: () => {
          navigate("/history");
        },
      });
    } catch (error) {
      alertUserFailure.title = "Book Failed";
      alertUserFailure.text = `${error.response?.data}`;
      Swal.fire({
        ...alertUserFailure,
      });
      console.log(error);
    }
  };
};
