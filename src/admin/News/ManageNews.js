import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SweetAlertWarning } from "../../models/models";
import { deleteNewsAction, getNewsListAction } from "../../redux/actions";
import { NEMO } from "../../utils/config";
import moment from "moment";
import { Tag } from "antd";
import Swal from "sweetalert2";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Container, Heading } from "../../styles/Styles";
import { AntDesignTable } from "../../styles/AntDesign";

export default function ManageNews() {
  document.title = `Manage News - ${NEMO}`;

  const news = useSelector((state) => state.NewsReducer.newsList);

  const alertWarning = new SweetAlertWarning();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsListAction());
    window.scroll(0, 0);
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      fixed: "left",
      width: "5%",
      render: (record) => news.indexOf(record) + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "20%",
    },
    {
      title: "Photo",
      dataIndex: "imageUrl",
      width: "20%",
      render: (text, news) => {
        return (
          <Link to={`/news/${news.titleUrl}/`} target="_blank">
            <img
              src={news.imageUrl}
              alt={news.title}
              width={188}
              height={95}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "https://picsum.photos/id/1021/188/95";
              }}
            />
          </Link>
        );
      },
    },
    {
      title: "Date",
      width: "10%",
      dataIndex: "published",
      render: (text, news) => moment(news.published, "DD/MM/YYYY").format("ll"),
    },
    {
      title: "Overview",
      dataIndex: "body",
      render: (text, news) => {
        return (
          <>
            {news.body.length > 100
              ? news.body.substr(0, 150) + " ..."
              : news.body}
          </>
        );
      },
      width: "25%",
    },
    {
      title: "Status",
      width: "10%",
      render: (news) => (
        <>
          {news.trending === true && news.popular === true ? (
            <>
              <Tag color="magenta">TRENDING</Tag>
              <Tag color="cyan">POPULAR</Tag>
            </>
          ) : news.trending ? (
            <Tag color="magenta">TRENDING</Tag>
          ) : news.popular ? (
            <Tag color="cyan">POPULAR</Tag>
          ) : (
            <Tag color="gray">NONE</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      width: "10%",
      render: (news) => {
        return (
          <>
            <Link key={1} to={`/admin/news/edit/${news._id}`}>
              <AiOutlineEdit
                style={{ color: "#3b586f", marginRight: "0.25rem" }}
              />
            </Link>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              onClick={() => {
                alertWarning.title = `Do you want to delete this news`;
                alertWarning.showConfirmButton = true;
                alertWarning.showCancelButton = true;
                alertWarning.timer = "3000";
                alertWarning.timerProgressBar = true;
                Swal.fire({
                  ...alertWarning,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteNewsAction(news._id))
                  }
                });
              }}
            >
              <AiOutlineDelete style={{ color: "#ff5757" }} />
            </span>
          </>
        );
      },
    },
  ];

  function onChange() {
    window.scroll(0, 0);
  }

  return (
    <Container>
      <Heading admin>Manage News</Heading>

      <AntDesignTable
        columns={columns}
        dataSource={news}
        onChange={onChange}
        rowKey="_id"
        scroll={{ x: 1300 }}
      />
    </Container>
  );
}
