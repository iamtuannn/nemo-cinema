import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Dashboard/Dashboard";
import ManageMovie from "../admin/Movies/ManageMovies";
import AddMovie from "../admin/Movies/AddMovie";
import EditMovie from "../admin/Movies/EditMovie";
import AddShowtime from "../admin/Movies/AddShowtime";
import ManageNews from "../admin/News/ManageNews";
import AddNews from "../admin/News/AddNews";
import EditNews from "../admin/News/EditNews";
import ManageUser from "../admin/Users/ManageUser";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
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
