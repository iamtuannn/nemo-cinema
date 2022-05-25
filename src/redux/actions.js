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
  BREAK_DAY,
  GROUPID,
  NEMO,
  TMDB_KEY,
  USER_LOGIN,
} from "../utils/config";
import moment from "moment";
import { connectionService } from "../services/connectionServices";

const alertSuccess = new SweetAlertSuccessful();
const alertFailure = new SweetAlertFailure();
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
        ...alertSuccess,
        didDestroy: () => navigate("/"),
      });
    } catch (errors) {
      alertFailure.title = "Login Failed";
      alertFailure.text = "User Name or Your Password are not correct!";
      Swal.fire({ ...alertFailure });
      console.log("errors", errors.response);
    }
  };
};

export const RegisterAction = (userInfo, navigate) => {
  return async () => {
    try {
      await cyberSoftServices.post(`api/QuanLyNguoiDung/DangKy`, userInfo);

      alertSuccess.title = "Successful Registration";
      Swal.fire({
        ...alertSuccess,
        didDestroy: () => navigate("/login"),
      });
    } catch (errors) {
      alertFailure.title = "Register Fail";

      if (errors.response.data === "Email đã tồn tại!") {
        alertFailure.text = "Email already exists!";
      }

      if (errors.response.data === "Tài khoản đã tồn tại!") {
        alertFailure.text = "Account already exists!";
      }

      Swal.fire({ ...alertFailure });
      console.log("errors", errors.response);
    }
  };
};

export const getAccountInfoAction = (account) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);

      const result = await cyberSoftServices.post(
        `api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        account
      );

      dispatch({
        type: "SET_ACCOUNT_INFO",
        accountInfo: result.data,
        ticket: result.data.thongTinDatVe.reverse(),
      });

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error.response);
    }
  };
};

export const putUpdateUserAction = (userUpdate) => {
  return async (dispatch) => {
    try {
      alertSuccess.title = "Update Success";
      alertSuccess.text = "";
      await cyberSoftServices
        .put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userUpdate)
        .then(() => {
          Swal.fire({
            ...alertSuccess,
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
      alertFailure.title = "Update Failed";
      alertFailure.text = `${errors.response?.data}`;
      Swal.fire({ ...alertFailure });
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
        result = await cyberSoftServices
          .get(
            `api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${movieName}`
          )
          .then((res) => res.data);
      } else {
        result = await cyberSoftServices
          .get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
          .then((res) => res.data);
      }

      let movies = [];

      result
        .filter((movie) => movie.maPhim > 10617 && movie.maPhim < 10645)
        .sort((a, b) =>
          Date.parse(a.ngayKhoiChieu) < Date.parse(b.ngayKhoiChieu) ? 1 : -1
        )
        .forEach((movie) => {
          const isShowing = BREAK_DAY > Date.parse(movie.ngayKhoiChieu);

          const { ...rest } = movie;

          const movieUpdate = {
            ...rest,
            isShowing: isShowing,
          };

          movies.push(movieUpdate);
        });

      dispatch({
        type: "GET_MOVIES_LIST",
        movieList: movies,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error: ", error.response?.data);
    }
  };
};

export const getMovieDetailAction = (id, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);
      let connectionData = await connectionService
        .get()
        .then((res) => res.data.movies);

      let connection = connectionData.find(
        (movie) => movie.cybersoftID === id.toString()
      );

      const { cybersoftID, tmdbID } = connection;

      let tmdb = await cyberSoftServices
        .getTMDB(`movie/${tmdbID}?api_key=${TMDB_KEY}&language=en-US`)
        .then((res) => res.data);

      const {
        runtime,
        backdrop_path,
        poster_path,
        title,
        tagline,
        genres,
        overview,
      } = tmdb;

      document.title = `${title} - ${NEMO}`;

      let cybersoft = await cyberSoftServices
        .get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${cybersoftID}`)
        .then((res) => res.data);

      const {
        heThongRapChieu: showtime,
        trailer,
        biDanh: url,
        ngayKhoiChieu: release_date,
      } = cybersoft;

      let cast = await cyberSoftServices
        .getTMDB(`movie/${tmdbID}/credits?api_key=${TMDB_KEY}&language=en-US`)
        .then((res) => res.data.cast);

      const isShowing = BREAK_DAY > Date.parse(release_date);

      const movie = {
        runtime,
        backdrop_path,
        poster_path,
        title,
        tagline,
        genres,
        overview,
        tmdbID,
        showtime,
        trailer,
        url,
        release_date,
        cybersoftID,
        cast,
        isShowing,
      };

      await dispatch({
        type: "GET_MOVIE_DETAIL",
        movie: movie,
      });

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      navigate("/");
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
          return (
            Date.parse(moment(b.published, "DD/MM/YYYY HH:mm").format()) -
            Date.parse(moment(a.published, "DD/MM/YYYY HH:mm").format())
          );
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
    navigate("/people");
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

      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error: ", error.response?.data);
    }
  };
};

export const getMovieShowTimesAction = (id, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);

      if (!localStorage.getItem(USER_LOGIN)) {
        alertWarning.showConfirmButton = true;
        alertWarning.confirmButtonText = "Login";
        alertWarning.showCancelButton = true;
        alertWarning.timer = "3000";
        alertWarning.timerProgressBar = "true";
        return Swal.fire({ ...alertWarning }).then((result) => {
          window.scroll(0, 0);
          if (result.isConfirmed) {
            navigate("/login");
          }

          navigate("/");
        });
      }

      const result = await cyberSoftServices.get(
        `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      document.title = `Booking Ticket -${result.data.thongTinPhim.tenPhim} - ${NEMO}`;

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
      alertSuccess.title = "Successfully Booked";
      alertSuccess.text = "Enjoy your movie!";
      Swal.fire({
        ...alertSuccess,
        didDestroy: () => {
          navigate("/history");
        },
      });
    } catch (error) {
      alertFailure.title = "Book Failed";
      alertFailure.text = `${error.response?.data}`;
      Swal.fire({
        ...alertFailure,
      });
      console.log(error);
    }
  };
};

//ADMIN

export const deleteMovieAction = (id) => {
  return async (dispatch) => {
    try {
      await cyberSoftServices.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${id}`);

      Swal.fire({
        ...alertSuccess,
        didDestroy: () => {
          dispatch(getMoviesListAction());
        },
      });
    } catch (errors) {
      alertFailure.title = "Delete Failed";
      alertFailure.text = `${errors.response?.data}`;
      Swal.fire({
        ...alertFailure,
        didDestroy: () => {
          dispatch(getMoviesListAction());
        },
      });
    }
  };
};

export const postNewMovieAction = (formData, navigate) => async (dispatch) => {
  try {
    await cyberSoftServices.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getMoviesListAction());
        navigate("/admin/movie");
      },
    });
  } catch (error) {
    alertFailure.title = "Add Failed";
    alertFailure.text = `${error.response?.data}`;
    Swal.fire({
      ...alertFailure,
    });
    console.log(error);
  }
};

export const postUpdateMovieAction =
  (formData, navigate) => async (dispatch) => {
    try {
      await cyberSoftServices.post(
        `api/QuanLyPhim/CapNhatPhimUpload`,
        formData
      );

      Swal.fire({
        ...alertSuccess,
        didDestroy: () => {
          dispatch(getMoviesListAction());
          navigate("/admin/movie");
        },
      });
    } catch (error) {
      alertFailure.title = "Edit Failed";
      alertFailure.text = `${error.response?.data}`;
      Swal.fire({
        ...alertFailure,
      });
      console.log(error);
    }
  };

export const getMovieByID = (id, navigate) => async (dispatch) => {
  try {
    const result = await cyberSoftServices.get(
      `api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    );

    document.title = `Edit Movie - ${result.data.tenPhim} - ${NEMO}`;

    dispatch({
      type: "GET_MOVIE_EDIT",
      movieEdit: result.data,
    });
  } catch (error) {
    navigate("/admin/movie");
    console.error(error);
  }
};

export const getCinemaAction = () => async (dispatch) => {
  try {
    const result = await cyberSoftServices.get(
      `api/QuanLyRap/LayThongTinHeThongRap`
    );

    dispatch({
      type: "GET_CINEMA",
      cinemaList: result.data,
    });
  } catch (error) {
    console.log("error", error.response?.data);
  }
};

export const postShowTimeAction = (showtime, navigate) => async () => {
  try {
    await cyberSoftServices.post(`api/QuanLyDatVe/TaoLichChieu`, showtime);

    alertSuccess.title = "Successfully Added";
    alertSuccess.text = "";
    Swal.fire({ ...alertSuccess, didDestroy: () => navigate("/admin/movie") });
  } catch (error) {
    alertFailure.title = "Add Failed";
    if (error.response.status === 400) {
      alertFailure.text = `400 - ${error.response.statusText}`;
    } else {
      alertFailure.text = error.response.data;
      console.log(error.response);
    }
    Swal.fire({
      ...alertFailure,
    });
  }
};

export const deleteNewsAction = (id) => async (dispatch) => {
  try {
    await newsService.delete(id);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getNewsListAction());
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const postNewsAction = (formData, navigate) => async (dispatch) => {
  try {
    await newsService.post(formData);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getNewsListAction());
        navigate("/admin/news");
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const putNewsAction = (formData, id, navigate) => async (dispatch) => {
  try {
    await newsService.put(formData, id);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getNewsListAction());
        navigate("/admin/news");
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserListAction =
  (keyword = "") =>
  async (dispatch) => {
    try {
      if (keyword.trim() !== "") {
        const result = await cyberSoftServices.get(
          `/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=${GROUPID}&tuKhoa=${keyword}`
        );

        return dispatch({
          type: "SET_LIST_USERS",
          usersList: result.data,
        });
      }

      const result = await cyberSoftServices.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=${GROUPID}`
      );

      return dispatch({
        type: "SET_LIST_USERS",
        usersList: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUserAction = (userName) => async (dispatch) => {
  try {
    await cyberSoftServices.delete(
      `api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`
    );

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => dispatch(getUserListAction()),
    });
  } catch (error) {
    alertFailure.title = "Delete Failed";
    alertFailure.text = `${error.response.data}`;
    Swal.fire({ ...alertFailure });
  }
};

export const updateUserAction = (formData) => async (dispatch) => {
  try {
    await cyberSoftServices.put(
      `api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      formData
    );

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => dispatch(getUserListAction()),
    });
  } catch (error) {
    alertFailure.title = "Delete Failed";
    alertFailure.text = `${error.response.data}`;
    Swal.fire({ ...alertFailure });
  }
};

export const getTotalTickets = () => async (dispatch) => {
  try {
    const userList = await cyberSoftServices
      .get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=${GROUPID}`)
      .then((res) => res.data.map((user) => ({ taiKhoan: user.taiKhoan })));

    const getUserTickets = (user) =>
      cyberSoftServices
        .post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`, user)
        .then((res) => res.data.thongTinDatVe.length);

    const getTicketsList = () => {
      const requests = userList.map((user) =>
        getUserTickets(user).then((res) => res)
      );

      return Promise.all(requests).then((res) => res.reduce((a, b) => a + b));
    };

    getTicketsList().then((res) =>
      dispatch({
        type: "SET_TOTAL_TICKETS",
        totalTickets: res,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getConnectionAction = () => {
  return async (dispatch) => {
    try {
      let result = await connectionService.get();

      dispatch({
        type: "GET_CONNECTION",
        connection: result.data.movies.reverse(),
      });
    } catch (error) {
      alertFailure.title = "Get Connection Failed";
      Swal.fire({ ...alertFailure });
      console.log(error);
    }
  };
};

export const deleteConnectionAction = (id) => async (dispatch) => {
  try {
    await connectionService.delete(id);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getConnectionAction());
      },
    });
  } catch (error) {
    alertFailure.title = "Delete Connection Failed";
    Swal.fire({ ...alertFailure });
  }
};

export const postConnectionAction = (formData) => async (dispatch) => {
  try {
    await connectionService.post(formData);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getConnectionAction());
      },
    });
  } catch (error) {
    alertFailure.title = "Create Connection Failed";
    Swal.fire({ ...alertFailure });
    console.log(error);
  }
};

export const putConnectionAction = (formData, id) => async (dispatch) => {
  try {
    await connectionService.put(formData, id);

    Swal.fire({
      ...alertSuccess,
      didDestroy: () => {
        dispatch(getConnectionAction());
      },
    });
  } catch (error) {
    alertFailure.title = "Update Connection Failed";
    Swal.fire({ ...alertFailure });
    console.log(error);
  }
};
