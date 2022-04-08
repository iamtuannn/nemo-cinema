import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavbarHome from "../components/Navbar/NavbarHome";
import Booking from "../pages/HomeMovie/Booking";
import Homepage from "../pages/Homepage";
import Person from "../pages/Person/Person";
import Actor from "../pages/Person/Actor";
import MovieDetail from "../pages/HomeMovie/MovieDetail";
import NowShowing from "../pages/HomeMovie/NowShowing";
import ComingSoon from "../pages/HomeMovie/ComingSoon";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import LatestNews from "../pages/HomeNews/LatestNews";
import News from "../pages/HomeNews/News";
import Profile from "../pages/User/UserProfile";
import BookingHistory from "../pages/User/BookingHistory";

export default function Home() {
  return (
    <>
      <NavbarHome />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:url-:id/" element={<MovieDetail />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/person/:nameUrl-:id/" element={<Person />} />
        <Route path="/actor/" element={<Actor />} />
        <Route path="/news/" element={<LatestNews />} />
        <Route path="/news/:url/" element={<News />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/history/" element={<BookingHistory />} />
        <Route path="/now-showing" element={<NowShowing />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/register/" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
