import { Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import bg from "../../images/bg.jpg";
import * as Yup from "yup";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { StyledButton } from "../../styles/Styles";
import { GROUPID, NEMO, USER_LOGIN } from "../../utils/config";
import { RegisterAction } from "../../redux/actions";

export default function SignUp() {
  document.title = `Sign Up Now - ${NEMO}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Please input your username"),
      matKhau: Yup.string()
        .required("Please input your password")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must be at least one number, one uppercase letter, one lowercase letter, one special character and at least 8 characters"
        ),
      email: Yup.string()
        .email("Please input a valid email")
        .required("Please input your email"),
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
    }),
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      dispatch(RegisterAction(values, navigate));
    },
  });

  if (localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/" />;
  }
  return (
    <S.Box>
      <S.Form onFinish={formik.handleSubmit}>
        <S.Center>
          <Link to="/">
            <S.Logo className="logo">nemo cinema</S.Logo>
          </Link>
        </S.Center>
        <AntDesignFormItem
          name="taiKhoan"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          name="hoTen"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
            {
              pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
              message: "Name must be letters only",
            },
          ]}
          hasFeedback
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          name="matKhau"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                "Password must be at least one number, one uppercase letter, one lowercase letter, one special character and at least 8 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          name="confirm"
          label="Confirm Password"
          dependencies={["matKhau"]}
          rules={[
            { required: true, message: "Please input your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Please input a valid email",
            },
            {
              required: true,
              message: "Please input your email",
            },
          ]}
          hasFeedback
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          name="soDt"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Phone numbers can only be numbers with 10 digits",
            },
          ]}
          hasFeedback
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>
        <StyledButton type="submit">Sign Up</StyledButton>
      </S.Form>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${bg});
    min-height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade-in 1s ease-in-out;
  `,

  Form: styled(AntDesignForm)`
    width: 800px;
    margin: 1rem;
    padding: 2rem;
    box-shadow: var(--shadow-light);
    border-radius: 1rem;
    background-color: var(--rgba-blue-magenta);

    label {
      width: 200px;

      svg {
        color: var(--color-red);
      }
    }
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
