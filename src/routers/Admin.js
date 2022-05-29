import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { checkAdmin } from "../redux/actions";

export default function Admin() {
  const user = useSelector((state) => state.UserReducer.userLogin);
  const { taiKhoan } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  document.body.style.background =
    "linear-gradient(to right top,#7e79a8,#736f9e,#686694,#5d5c8b,#525381,#544f7f,#574c7d,#5a487a,#6c487c,#7e487b,#8e4778,#9e4773)";

  useEffect(() => {
    dispatch(checkAdmin(taiKhoan, navigate));
  }, [dispatch, navigate, taiKhoan]);

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
