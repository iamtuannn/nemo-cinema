export const USER_LOGIN = "USER_LOGIN";
export const TOKEN = "accessToken";
export const CYBER_SOFT = process.env.REACT_APP_CYBER_SOFT;
export const TMDB = "https://api.themoviedb.org/3/";
export const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
export const GROUPID = process.env.REACT_APP_GROUPID;
export const API_NEWS = process.env.REACT_APP_API_NEWS;
export const API_CONNECTION = process.env.REACT_APP_API_CONNECTION 
export const AUTHOR = "Hoang A. Tuan";
export const AUTHOR_URL = "https://www.anhtuan.info";
export const NEMO = "Nemo Cinema";
export const BASE_API_BACKDROP_URL =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";
export const BASE_API_POSTER_URL =
  "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
export const BASE_API_PERSON_URL =
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";

export const NavBarLink = [
  {
    navLink: true,
    path: "/coming-soon",
    name: "Coming Soon",
  },
  {
    navLink: true,
    path: "/now-showing",
    name: "Now Showing",
  },
  {
    navLink: true,
    path: "/news",
    name: "News",
  },
  {
    navLink: true,
    path: "/people",
    name: "People",
  },
];

export const NavAdminLink = [
  {
    type: "movie",
    link: [
      {
        path: "/admin/movie",
        name: "manage movies",
      },
      {
        path: "/admin/movie/add",
        name: "add movie",
      },
    ],
  },
  {
    type: "news",
    link: [
      {
        path: "/admin/news",
        name: "manage news",
      },
      {
        path: "/admin/news/add",
        name: "add news",
      },
    ],
  },
  {
    type: "user",
    link: [
      {
        path: "/admin/user",
        name: "manage users",
      },
    ],
  },
];

export const dbMovie = [
  {
    tmdb: 740996,
    maPhim: 10190,
  },
  {
    tmdb: 843388,
    maPhim: 10192,
  },
  {
    tmdb: 785554,
    maPhim: 10191,
  },
  {
    tmdb: 497698,
    maPhim: 10193,
  },
  {
    tmdb: 337404,
    maPhim: 10194,
  },
  {
    tmdb: 634649,
    maPhim: 10196,
  },
  {
    tmdb: 453395,
    maPhim: 10197,
  },
  {
    tmdb: 524434,
    maPhim: 10198,
  },
  {
    tmdb: 624860,
    maPhim: 10199,
  },
  {
    tmdb: 646380,
    maPhim: 10200,
  },
  {
    tmdb: 338953,
    maPhim: 10201,
  },
  {
    tmdb: 505026,
    maPhim: 10202,
  },
  {
    tmdb: 414906,
    maPhim: 10205,
  },
  {
    tmdb: 758769,
    maPhim: 10206,
  },
  {
    tmdb: 718789,
    maPhim: 10256,
    id: 18,
  },
  {
    tmdb: 512195,
    maPhim: 10257,
  },
  {
    tmdb: 438148,
    maPhim: 10289,
  },
  {
    tmdb: 762504,
    maPhim: 10290,
  },
  {
    tmdb: 539681,
    maPhim: 10291,
  },
  {
    tmdb: 756999,
    maPhim: 10292,
  },
  {
    tmdb: 436270,
    maPhim: 10350,
  },
  {
    tmdb: 569094,
    maPhim: 10351,
  },
  {
    tmdb: 705861,
    maPhim: 10352,
  },
  {
    tmdb: 361743,
    maPhim: 10353,
  },
];
