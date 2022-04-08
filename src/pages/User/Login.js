import { Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import bg from "../../images/bg.jpg";
import { LoginAction } from "../../redux/actions";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { StyledButton } from "../../styles/StyledButton";
import { USER_LOGIN } from "../../utils/config";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(LoginAction(values, navigate));
    },
  });

  if (localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/" />;
  }
  return (
    <S.Box>
      <S.Form
        onFinish={formik.handleSubmit}
        labelCol={{ span: 6 }}
      >
        <S.Center>
         <Link to="/"> <S.Logo className="logo">nemo cinema</S.Logo></Link>
        </S.Center>
        <AntDesignFormItem
          label="Username"
          name="taiKhoan"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>
        <AntDesignFormItem
          label="Password"
          name="matKhau"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password onChange={formik.handleChange} />
        </AntDesignFormItem>
        <S.Center>
          <StyledButton type="submit">Log In</StyledButton>
        </S.Center>
      </S.Form>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    background-image: url(${bg});
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade-in 1s ease-in-out;
  `,

  Form: styled(AntDesignForm)`
    margin: 1rem;
    padding: 2rem;
    box-shadow: var(--shadow-light);
    border-radius: 1rem;
    background-color: var(--rgba-blue-magenta);
    width: 600px;
  `,

  Logo: styled.span`
    font-size: 2.5rem;
    font-family: "Khand", sans-serif;
    text-transform: uppercase;
    color: var(--color-red);
    font-weight: 700;
  `,

  Center: styled.div`
    display: flex;
    justify-content: center;
  `,
};
