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
export const BREAK_DAY = Date.parse("2022-02-10T00:00:00")
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
