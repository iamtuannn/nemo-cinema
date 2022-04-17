import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NEMO, GROUPID } from "../../utils/config";
import * as Yup from "yup";
import moment from "moment";
import { Container, Heading, StyledButton } from "../../styles/Styles";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { DatePicker, Input } from "antd";
import { postNewMovieAction } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {
  document.title = `Add Movie - ${NEMO}`;

  const [imgSrc, setImgSrc] = useState("");
  const dateFormat = "DD/MM/YYYY";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: GROUPID,
      ngayKhoiChieu: "",
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Please input movie title!"),
      trailer: Yup.string().required("Please input movie trailer - youtube"),
      moTa: Yup.string().required("Please input movie overview"),
      hinhAnh: Yup.mixed().required("Please upload movie poster"),
      ngayKhoiChieu: Yup.string().required("Please chose a day"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      dispatch(postNewMovieAction(formData, navigate));
    },
  });

  const handleUpload = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format(dateFormat);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  }; 

  return (
    <Container>
      <Heading admin>Add Movie</Heading>
      <AntDesignForm
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ sm: { span: 6 }, lg: { span: 3 } }}
      >
        <AntDesignFormItem label="Title">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <div>{formik.errors.tenPhim}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.trailer && formik.errors.trailer ? (
            <div>{formik.errors.trailer}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem label="Overview">
          <Input.TextArea
            name="moTa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={13}
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <div>{formik.errors.moTa}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem label="Release Date">
          <DatePicker onChange={handleChangeDatePicker} format={dateFormat}/>
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <div>{formik.errors.ngayKhoiChieu}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem label="Upload Poster">
          <input type="file" onChange={handleUpload} />
          <br />
          <img style={{ width: 200, height: 296 }} src={imgSrc} alt="poster" />
          {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
            <div>{formik.errors.hinhAnh}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem>
          <StyledButton type="submit">Add Movie</StyledButton>
        </AntDesignFormItem>
      </AntDesignForm>
    </Container>
  );
}
