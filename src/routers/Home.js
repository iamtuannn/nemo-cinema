import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavbarHome from "../components/Navbar/NavbarHome";
import Booking from "../home/Booking/Booking";
import NowShowing from "../home/Movies/NowShowing";
import ComingSoon from "../home/Movies/ComingSoon";
import Detail from "../home/Detail/MovieDetail";
import LatestNews from "../home/News/LatestNews";
import News from "../home/News/News";
import Person from "../home/People/Person";
import People from "../home/People/People";
import Login from "../home/User/Login";
import SignUp from "../home/User/SignUp";
import Homepage from "../home/Homepage/Homepage";
import BookingHistory from "../home/User/BookingHistory";
import UserInfo from "../home/User/UserInfo";

export default function Home() {
  document.body.style.background = "#191820"
  return (
    <>
      <NavbarHome />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:url-:id/" element={<Detail />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/person/:nameUrl-:id/" element={<Person />} />
        <Route path="/people/" element={<People />} />
        <Route path="/people/:id" element={<People />} />
        <Route path="/news/" element={<LatestNews />} />
        <Route path="/news/:url/" element={<News />} />
        <Route path="/profile/" element={<UserInfo />} />
        <Route path="/history/" element={<BookingHistory />} />
        <Route path="/now-showing" element={<NowShowing />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/signup/" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
