import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesListAction,
  getNewsListAction,
  getTotalTickets,
  getUserListAction,
} from "../../redux/actions";
import { NEMO } from "../../utils/config";
import { FaUserFriends } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { Container, Heading } from "../../styles/Styles";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";
import { AntDesignProgress } from "../../styles/AntDesign";

export default function Dashboard() {
  document.title = `Dashboard - ${NEMO}`;
  const dispatch = useDispatch();

  const users = useSelector((state) => state.UserReducer.usersList);
  const movies = useSelector((state) => state.MovieReducer.movieList);
  const news = useSelector((state) => state.NewsReducer.newsList);
  const tickets = useSelector((state) => state.UserReducer.totalTickets);

  const getPercent = (arr, filter) =>
    ((arr.filter(filter).length / arr.length) * 100).toFixed();

  const info = [
    {
      name: "User",
      total: users.length,
      icon: <FaUserFriends />,
      content: [
        {
          name: "Admin",
          percent: getPercent(
            users,
            (user) => user.maLoaiNguoiDung === "QuanTri"
          ),
        },
        {
          name: "Customer",
          percent: getPercent(
            users,
            (user) => user.maLoaiNguoiDung === "KhachHang"
          ),
        },
      ],
    },
    {
      name: "Movie",
      total: movies.length,
      icon: <MdMovie />,
      content: [
        {
          name: "Coming Soon",
          percent: getPercent(
            movies,
            (movie) => Date.parse(movie.ngayKhoiChieu) > Date.now()
          ),
        },
        {
          name: "Now Playing",
          percent: getPercent(
            movies,
            (movie) => Date.parse(movie.ngayKhoiChieu) < Date.now()
          ),
        },
      ],
    },
    {
      name: "News",
      total: news.length,
      icon: <BsNewspaper />,
      content: [
        {
          name: "Popular",
          percent: getPercent(news, (news) => news.popular),
        },
        {
          name: "Trending",
          percent: getPercent(news, (news) => news.trending),
        },
      ],
    },
    {
      name: "Ticket",
      total: tickets,
      icon: <IoTicket />,
      content: [],
    },
  ];

  useEffect(() => {
    dispatch(getUserListAction());
    dispatch(getMoviesListAction());
    dispatch(getNewsListAction());
    dispatch(getTotalTickets());
  }, [dispatch]);

  return (
    <Container>
      <Heading admin>Dashboard</Heading>
      <Card.Grid>
        {info.map((info, i) => (
          <Card.Box key={i}>
            <Card.Icon>{info.icon}</Card.Icon>
            <Card.Title>{info.name}</Card.Title>
            <Card.Title>Total: {info.total}</Card.Title>
            <Card.GridContent>
              {info.content.map((content, i) => (
                <Fragment key={i}>
                  <Card.Content>{content.name}</Card.Content>
                  <AntDesignProgress percent={content.percent} />
                </Fragment>
              ))}
            </Card.GridContent>
          </Card.Box>
        ))}
      </Card.Grid>
    </Container>
  );
}

const Card = {
  Grid: styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 2rem;
    row-gap: 3rem;

    ${Breakpoints.md} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
  Box: styled.div`
    position: relative;
    background: transparent;
    box-shadow: var(--shadow-dark);
    border: var(--border);
    width: 100%;
    border-radius: 5px;
    text-align: right;
    padding: 0.5rem 1rem;
    font-family: "Khand", sans-serif;
  `,
  Icon: styled.div`
    position: absolute;
    top: -24px;
    left: 20px;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(142, 71, 120);

    svg {
      font-size: 2rem;
    }
  `,
  Title: styled.p`
    font-size: 2rem;
    text-align: right;
    font-family: inherit;

    ${Breakpoints.md} {
      font-size: 1.5rem;
    }
  `,
  Content: styled.p`
    font-size: 1.5rem;
    font-family: inherit;
    text-align: left;
  `,
  GridContent: styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: max-content 1fr;
    gap: 1rem;
  `,
};
