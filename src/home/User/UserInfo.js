import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAccountInfoAction, putUpdateUserAction } from "../../redux/actions";
import { NEMO, USER_LOGIN } from "../../utils/config";
import * as Yup from "yup";
import { UserModel } from "../../models/models";
import { useFormik } from "formik";
import styled from "styled-components";
import { Form, Input } from "antd";
import { Breakpoints } from "../../styles/Breakpoints";
import bg from "../../images/bg.jpg";
import avatar from "../../images/user.jpg";
import { StyledButton } from "../../styles/Styles";

export default function UserInfo() {
  document.title = `User Information - ${NEMO}`;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.UserReducer.accountInfo);

  let userLogin = localStorage.getItem(USER_LOGIN)
    ? JSON.parse(localStorage.getItem(USER_LOGIN))
    : {};

  useEffect(() => {
    dispatch(getAccountInfoAction({ taiKhoan: userLogin.taiKhoan }));
  }, [dispatch, userLogin.taiKhoan]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      email: user.email,
      soDt: user.soDT,
      maNhom: user.maNhom,
      hoTen: user.hoTen,
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string()
        .required("Please input your password")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must be at least one number, one uppercase letter, one lowercase letter, one special character and at least 8 characters"
        ),
      soDt: Yup.string()
        .matches(/^[0-9]+$/, "Phone numbers can only be numbers")
        .required("Please input your phone number")
        .min(10, "Phone number must be at least 10 numbers")
        .max(10, "Phone number must be at most 10 numbers"),
      hoTen: Yup.string()
        .required("Please input your name")
        .matches(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
          "Name must be letters only"
        ),
      email: Yup.string()
        .email("Please input a valid email")
        .required("Please input your email"),
    }),
    onSubmit: (values) => {
      const userUpdate = new UserModel();
      userUpdate.taiKhoan = values.taiKhoan;
      userUpdate.matKhau = values.matKhau;
      userUpdate.email = values.email;
      userUpdate.soDt = values.soDt;
      userUpdate.hoTen = values.hoTen;
      userUpdate.maLoaiNguoiDung = userLogin.maLoaiNguoiDung;

      dispatch(putUpdateUserAction(userUpdate));
    },
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/" />;
  }

  const renderForm = () => (
    <StyledForm.Antd onFinish={formik.handleSubmit} className="form-custom">
      <StyledForm.Heading> User Information</StyledForm.Heading>
      <StyledForm.Antd.Item label="Username">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
          onBlur={formik.handleBlur}
          disabled
        />
        {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
          <div className="error">{formik.errors.taiKhoan}</div>
        ) : null}
      </StyledForm.Antd.Item>
      <StyledForm.Antd.Item label="Name">
        <Input
          name="hoTen"
          onChange={formik.handleChange}
          value={formik.values.hoTen}
          onBlur={formik.handleBlur}
        />
        {formik.errors.hoTen && formik.touched.hoTen ? (
          <div className="error">{formik.errors.hoTen}</div>
        ) : null}
      </StyledForm.Antd.Item>
      <StyledForm.Antd.Item label="Password">
        <Input.Password
          name="matKhau"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
          onBlur={formik.handleBlur}
        />
        {formik.errors.matKhau && formik.touched.matKhau ? (
          <div className="error">{formik.errors.matKhau}</div>
        ) : null}
      </StyledForm.Antd.Item>
      <StyledForm.Antd.Item label="Phone">
        <Input
          name="soDt"
          onChange={formik.handleChange}
          value={formik.values.soDt}
          onBlur={formik.handleBlur}
        />
        {formik.errors.soDt && formik.touched.soDt ? (
          <div className="error">{formik.errors.soDt}</div>
        ) : null}
      </StyledForm.Antd.Item>
      <StyledForm.Antd.Item label="Email">
        <Input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          disabled
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </StyledForm.Antd.Item>
      <S.Center>
        <StyledButton type="submit" textTransform="uppercase">
          Update
        </StyledButton>
      </S.Center>
    </StyledForm.Antd>
  );

  return (
    <S.Background>
      <S.Box>
        <User.Box>
          <S.Col>
            <User.Avatar src={avatar} alt="avatar" />
            <User.Name>{user.hoTen}</User.Name>
          </S.Col>
        </User.Box>
        <S.Center half>{renderForm()}</S.Center>
      </S.Box>
    </S.Background>
  );
}

const S = {
  Background: styled.div`
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${bg});
    min-height: 100vh;
    width: 100%;
    animation: fade-in 1s ease-in-out;
  `,
  Box: styled.div`
    max-width: 1024px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row-reverse;
    z-index: 5;
    padding-top: 0;
    height: 100%;
    width: 100%;
    ${Breakpoints.lg} {
      position: unset;
      top: 0;
      left: 0;
      transform: none;
      flex-direction: column;
      padding-top: 2rem;
    }
  `,
  Center: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.half ? "50%" : "")};

    ${Breakpoints.lg} {
      width: 100%;
    }
  `,
  Col: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
};

const StyledForm = {
  Antd: styled(Form)`
    color: white;
    padding: 2rem;
    width: 100%;

    label {
      color: white;
      width: 120px;
      display: flex;
      justify-content: start;
      align-items: center;
      height: 100%;
    }
    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      display: none;
    }
    .error {
      color: white;
    }
    .ant-input,
    .ant-input-affix-wrapper {
      color: white;
      background: transparent !important;
      background-color: rgba(0, 0, 0, 0.5) !important;
    }
    .ant-input[disabled] {
      border-color: var(--color-red);
      color: var(--color-red);
    }
    svg {
      color: white;
    }

    label,
    input {
      font-size: 1.3rem;
    }

    ${Breakpoints.lg} {
      label,
      input {
        font-size: 1rem;
      }
    }
  `,
  Heading: styled.h2`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--text-light);

    ${Breakpoints.lg} {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  `,
};

const User = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    user-select: none;
    ${Breakpoints.lg} {
      width: 100%;
    }
  `,
  Avatar: styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    ${Breakpoints.lg} {
      width: 150px;
      height: 150px;
    }
  `,
  Name: styled.h2`
    font-size: 2.2rem;
    text-align: center;
    font-weight: 600;
    padding-top: 1.5rem;
    color: var(--text-light);

    ${Breakpoints.lg} {
      font-size: 2rem;
    }
  `,
};
