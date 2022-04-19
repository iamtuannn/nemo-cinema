import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SweetAlertWarning, UserModel } from "../../models/models";
import { deleteUserAction, getUserListAction } from "../../redux/actions";
import { NEMO } from "../../utils/config";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { Tag } from "antd";
import { Container, Heading } from "../../styles/Styles";
import {
  AntDesignModal,
  AntDesignSearch,
  AntDesignTable,
} from "../../styles/AntDesign";
import EditUser from "./EditUser";


export default function ManageUser() {
  document.title = `Manage User - ${NEMO}`;

  const dispatch = useDispatch();
  const alertWarning = new SweetAlertWarning();

  const [modal, setModal] = useState({
    visible: false,
    user: new UserModel(),
  });

  const usersList = useSelector((state) => state.UserReducer.usersList);

  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);

  const setUserInfo = (user) => {
    const userInfo = new UserModel();

    userInfo.taiKhoan = user.taiKhoan;
    userInfo.email = user.email;
    userInfo.hoTen = user.hoTen;
    userInfo.soDt = user.soDt;
    userInfo.matKhau = user.matKhau;
    userInfo.maLoaiNguoiDung = user.maLoaiNguoiDung;

    return setModal({
      visible: true,
      user: userInfo,
    });
  };

  const columns = [
    {
      title: "ID",
      fixed: "left",
      render: (record) => usersList.indexOf(record) + 1,
      width: "5%",
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let AccountA = a.taiKhoan.toLowerCase().trim();
        let AccountB = b.taiKhoan.toLowerCase().trim();
        return AccountA.localeCompare(AccountB);
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Full Name",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let FullNameA = a.hoTen.toLowerCase().trim();
        let FullNameB = b.hoTen.toLowerCase().trim();
        return FullNameA.localeCompare(FullNameB);
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        let EmailA = a.email.toLowerCase().trim();
        let EmailB = b.email.toLowerCase().trim();
        return EmailA.localeCompare(EmailB);
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (type) => (
        <>
          {type === "KhachHang" ? (
            <Tag color="geekblue">Customer</Tag>
          ) : (
            <Tag color="magenta">Admin</Tag>
          )}
        </>
      ),
      filters: [
        { text: "Admin", value: "QuanTri" },
        { text: "Customer", value: "KhachHang" },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.includes(value),
      width: "15%",
    },
    {
      title: "Action",
      width: "10%",
      render: (user) => {
        return (
          <>
            <span style={{ cursor: "pointer" }} key={1}>
              <AiOutlineEdit
                style={{
                  color: "#3b586f",
                  marginRight: "0.25rem",
                  fontSize: "1.5rem",
                }}
                onClick={() => {
                  setUserInfo(user);
                }}
              />
            </span>
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
                    dispatch(deleteUserAction(user.taiKhoan));
                  }
                });
              }}
            >
              <AiOutlineDelete
                style={{ color: "#ff5757", fontSize: "1.5rem" }}
              />
            </span>
          </>
        );
      },
    },
  ];

  function onChange() {
    window.scroll(0, 0);
  }

  const onSearch = (keyword) => dispatch(getUserListAction(keyword));

  return (
    <Container>
      <Heading admin>Manage User</Heading>

      <AntDesignSearch
        placeholder="Search user..."
        enterButton={<AiOutlineSearch />}
        size="large"
        onSearch={onSearch}
      />

      <AntDesignTable
        columns={columns}
        dataSource={usersList}
        onChange={onChange}
        rowKey="taiKhoan"
        scroll={{ x: 1300 }}
        pagination={{ pageSize: 25 }}
      />

      <AntDesignModal
        title={`Edit User`}
        centered
        visible={modal.visible}
        onOk={() => {
          setModal({
            ...modal,
            visible: false,
          });
        }}
        closable
        cancelButtonProps={{ hidden: true }}
      >
        <EditUser
          userInfo={modal.user}
          hideModal={() => {
            setModal({
              ...modal,
              visible: false,
            });
          }}
        />
      </AntDesignModal>
    </Container>
  );
}
