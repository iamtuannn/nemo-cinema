import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import Dashboard from "../pages/Dashboard";
import ManageMovie from "../pages/AdminMovie/ManageMovies";
import AddMovie from "../pages/AdminMovie/AddMovie";
import EditMovie from "../pages/AdminMovie/EditMovie";
import AddShowtime from "../pages/AdminMovie/AddShowtime";
import ManageNews from "../pages/AdminNews/ManageNews";
import AddNews from "../pages/AdminNews/AddNews";
import EditNews from "../pages/AdminNews/EditNews";
import ManageUser from "../pages/User/ManageUser";
import { USER_LOGIN } from "../utils/config";

export default function Admin() {
  const user = JSON.parse(localStorage.getItem("USER_LOGIN")) || "";

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/" />;
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="movie" element={<ManageMovie />} />
        <Route path="movie/add" element={<AddMovie />} />
        <Route path="movie/edit/:id" element={<EditMovie />} />
        <Route path="movie/showtime/:id" element={<AddShowtime />} />

        <Route path="news" element={<ManageNews />} />
        <Route path="news/add" element={<AddNews />} />
        <Route path="news/edit/:id" element={<EditNews />} />

        <Route path="user" element={<ManageUser />} />

        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </>
  );
}
