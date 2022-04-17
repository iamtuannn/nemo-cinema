import { Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEMO } from "../../utils/config";
import { getMoviesListAction, deleteMovieAction } from "../../redux/actions";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Heading } from "../../styles/Styles";
import { AntDesignSearch, AntDesignTable } from "../../styles/AntDesign";
import { SweetAlertWarning } from "../../models/models";

export default function ManageMovies() {
  document.title = `Manage Movies - ${NEMO}`;
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.MovieReducer.movieList);
  const alertWarning = new SweetAlertWarning();

  useEffect(() => {
    dispatch(getMoviesListAction());
    window.scroll(0, 0);
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "maPhim",
      width: "8%",
      fixed: "left",
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      render: (text, movie) => {
        return (
          <Link to={`/movie/${movie.biDanh}-${movie.maPhim}`} target="_blank">
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              width={100}
              height={150}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "https://picsum.photos/id/1021/100/150";
              }}
            />
          </Link>
        );
      },
      width: "12%",
    },
    {
      title: "Title",
      dataIndex: "tenPhim",
      width: "20%",
    },
    {
      title: "Overview",
      dataIndex: "moTa",
      render: (text, movie) => {
        return (
          <>
            {movie.moTa.length > 200
              ? movie.moTa.substr(0, 200) + " ..."
              : movie.moTa}
          </>
        );
      },
      width: "40%",
    },
    {
      title: "Status",
      width: "10%",
      render: (movie) => (
        <>
          {Date.parse(movie.ngayKhoiChieu) > Date.now() ? (
            <Tag color="magenta">COMING SOON</Tag>
          ) : (
            <Tag color="cyan">NOW PLAYING</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "maPhim",
      render: (text, movie) => {
        return (
          <>
            <Link
              key={1}
              to={`/admin/movie/edit/${movie.maPhim}`}
              onClick={() => {
                localStorage.setItem("movieParams", JSON.stringify(movie));
              }}
            >
              <AiOutlineEdit
                style={{
                  color: "#3b586f",
                  fontSize: "1.5rem",
                  marginRight: "0.25rem",
                }}
              />{" "}
            </Link>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                alertWarning.title = `Do you want to delete ${movie.tenPhim}`;
                alertWarning.showConfirmButton = true;
                alertWarning.showCancelButton = true;
                alertWarning.timer = "3000";
                alertWarning.timerProgressBar = true;
                Swal.fire({
                  ...alertWarning,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteMovieAction(movie.maPhim));
                  }
                });
              }}
            >
              <AiOutlineDelete
                style={{
                  color: "#ff5757",
                  fontSize: "1.5rem",
                  marginRight: "0.25rem",
                }}
              />
            </span>

            <Link
              key={3}
              to={`/movie/showtime/${movie.maPhim}`}
              onClick={() => {
                localStorage.setItem("movieParams", JSON.stringify(movie));
              }}
            >
              <AiOutlineCalendar
                style={{ color: "#6d4d6e", fontSize: "1.5rem" }}
              />
            </Link>
          </>
        );
      },
      width: "10%",
    },
  ];

  const data = movies;

  const onSearch = (value) => {
    dispatch(getMoviesListAction(value));
  };

  function onChange() {
    window.scroll(0, 0);
  }

  return (
    <Container>
      <Heading admin>Manage Movies</Heading>

      <AntDesignSearch
        placeholder="Search movie..."
        enterButton={<AiOutlineSearch />}
        size="large"
        onSearch={onSearch}
      />

      <AntDesignTable
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
        scroll={{ x: 1300 }}
      />
    </Container>
  );
}
