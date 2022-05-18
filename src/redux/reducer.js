import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  MovieModel,
  NewsModel,
  PersonModel,
  UserModel,
} from "../models/models";
import { GROUPID, TOKEN, USER_LOGIN } from "../utils/config";

let user = {};

if (localStorage.hasOwnProperty(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const UserReducer = (
  state = {
    userLogin: user,
    accountInfo: new UserModel(),
    ticket: [],
    usersList: [new UserModel()],
    userInfo: new UserModel(),
    totalTickets: 100,
  },
  action
) => {
  switch (action.type) {
    case "SET_LOGIN": {
      if (action.userLogin) {
        localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));
        localStorage.setItem(TOKEN, action.userLogin.accessToken);
        state.userLogin = action.userLogin;
      }
      return { ...state };
    }

    case "SET_ACCOUNT_INFO": {
      state.accountInfo = action.accountInfo;
      state.ticket = action.ticket;
      return { ...state };
    }

    case "SET_LIST_USERS": {
      state.usersList = action.usersList;
      return { ...state };
    }

    case "SET_TOTAL_TICKETS": {
      state.totalTickets = action.totalTickets;
      return { ...state };
    }

    default:
      return state;
  }
};

const MovieReducer = (
  state = {
    movie: new MovieModel(),
    comingSoon: [],
    nowShowing: [],
    movieList: [
      {
        biDanh: "",
        danhGia: 0,
        hinhAnh:
          "",
        isShowing: false,
        maNhom: "",
        maPhim: 0,
        moTa: "",
        tenPhim: "",
        trailer: "",
      },
    ],
    movieEdit: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: GROUPID,
      ngayKhoiChieu: "",
    },
  },
  action
) => {
  switch (action.type) {
    case "GET_MOVIES_LIST": {
      state.movieList = action.movieList;
      state.comingSoon = state.movieList
        .filter((movie) => !movie.isShowing)
        .reverse();
      state.nowShowing = state.movieList.filter((movie) => movie.isShowing);
      return { ...state };
    }

    case "GET_MOVIE_DETAIL": {
      state.movie = action.movie;
      return { ...state };
    }

    case "GET_MOVIE_EDIT": {
      state.movieEdit = action.movieEdit;
      return { ...state };
    }

    default:
      return state;
  }
};

const NewsReducer = (
  state = {
    newsList: [new NewsModel()],
    news: new NewsModel(),
    popular: [new NewsModel()],
    trending: [new NewsModel()],
  },
  action
) => {
  switch (action.type) {
    case "GET_NEWS_INFO": {
      state.news = action.news;
      return { ...state };
    }
    case "GET_NEWS_LIST": {
      state.newsList = action.newsList;
      return { ...state };
    }
    case "GET_NEWS_POPULAR": {
      state.popular = action.popular;
      return { ...state };
    }
    case "GET_NEWS_TRENDING": {
      state.trending = action.trending;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const CinemaReducer = (
  state = { movieShowtime: {}, seat: [], seatIsBooking: [], cinemaList: [] },
  action
) => {
  switch (action.type) {
    case "GET_CINEMA_SHOWTIME": {
      state.movieShowtime = action.movieShowtime;
      state.seat = action.seat;
      state.seatIsBooking = action.seatIsBooking;
      return { ...state };
    }

    case "SEAT_IS_BOOKING": {
      let seatUpdate = [...state.seatIsBooking];

      let index = seatUpdate.findIndex(
        (seat) => seat.maGhe === action.seatIsSelected.maGhe
      );

      if (index !== -1) {
        seatUpdate.splice(index, 1);
      } else {
        seatUpdate.push(action.seatIsSelected);
      }

      return { ...state, seatIsBooking: seatUpdate };
    }

    case "GET_CINEMA": {
      state.cinemaList = action.cinemaList;
      return { ...state };
    }

    default:
      return state;
  }
};

const LoadingReducer = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case "SHOW_LOADING": {
      state.isLoading = true;
      return { ...state };
    }
    case "HIDE_LOADING": {
      state.isLoading = false;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

const PeopleReducer = (
  state = {
    arrCast: [],
    person: new PersonModel(),
    acting: [],
    actor: [],
    totalPages: 0,
  },
  action
) => {
  switch (action.type) {
    case "GET_PEOPLE": {
      state.arrCast = action.arrCast;
      return { ...state };
    }

    case "GET_PERSON": {
      state.person = action.person;
      return { ...state };
    }

    case "GET_ACTING": {
      state.acting = action.acting;
      return { ...state };
    }

    case "GET_ACTOR": {
      state.actor = action.actor;
      state.totalPages = action.totalPages;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const ModalVideoReducer = (
  state = { status: { isOpen: false, videoId: "" } },
  action
) => {
  switch (action.type) {
    case "SET_STATUS": {
      state.status = action.status;
      return { ...state };
    }

    default:
      return state;
  }
};

const ConnectionReducer = (
  state = { connection: [{ _id: "", tmdbID: "", cybersoftID: "" }] },
  action
) => {
  switch (action.type) {
    case "GET_CONNECTION": {
      state.connection = action.connection;
      return { ...state };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  UserReducer,
  MovieReducer,
  NewsReducer,
  CinemaReducer,
  LoadingReducer,
  PeopleReducer,
  ModalVideoReducer,
  ConnectionReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
