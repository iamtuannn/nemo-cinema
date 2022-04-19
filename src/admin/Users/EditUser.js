import { Input, Select } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../redux/actions";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { StyledButton } from "../../styles/Styles";

export default function EditUser({ userInfo, hideModal }) {
  const dispatch = useDispatch();
  const { Option } = Select;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      email: userInfo.email,
      hoTen: userInfo.hoTen,
      soDt: userInfo.soDt,
      matKhau: userInfo.matKhau,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      maNhom: userInfo.maNhom,
    },
    onSubmit: (values) => {
      dispatch(updateUserAction(values));
      hideModal();
    },
  });

  const initialValues = [
    { name: ["taiKhoan"], value: formik.values.taiKhoan },
    { name: ["email"], value: formik.values.email },
    { name: ["soDt"], value: formik.values.soDt },
    { name: ["hoTen"], value: formik.values.hoTen },
    { name: ["matKhau"], value: formik.values.matKhau },
    {
      name: ["maLoaiNguoiDung"],
      value: formik.values.maLoaiNguoiDung,
    },
  ];

  const handleUserType = (value) =>
    formik.setFieldValue("maLoaiNguoiDung", value);

  return (
    <AntDesignForm
      labelCol={{ span: 6 }}
      onFinish={formik.handleSubmit}
      fields={initialValues}
    >
      <AntDesignFormItem name="taiKhoan" label="Username">
        <Input disabled />
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

      <AntDesignFormItem name="email" label="Email">
        <Input disabled />
      </AntDesignFormItem>

      <AntDesignFormItem
        label="Phone"
        name="soDt"
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

      <AntDesignFormItem
        label="User Type"
        name="maLoaiNguoiDung"
        rules={[{ required: true, message: "Please input chose user type" }]}
      >
        <Select onChange={handleUserType}>
          <Option value="KhachHang">Customer</Option>
          <Option value="QuanTri">Admin</Option>
        </Select>
      </AntDesignFormItem>

      <AntDesignFormItem>
        <StyledButton type="submit">Update</StyledButton>
      </AntDesignFormItem>
    </AntDesignForm>
  );
}
