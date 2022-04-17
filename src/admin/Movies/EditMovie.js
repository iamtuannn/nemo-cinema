import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import moment from "moment";
import { Container, Heading, StyledButton } from "../../styles/Styles";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { DatePicker, Input } from "antd";
import { getMovieByID, postUpdateMovieAction } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMovie() {
  const movie = useSelector((state) => state.MovieReducer.movieEdit);

  const [imgSrc, setImgSrc] = useState("");
  const dateFormat = "DD/MM/YYYY";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(getMovieByID(params.id, navigate));
  }, [dispatch, params.id, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: movie.tenPhim,
      trailer: movie.trailer,
      hinhAnh: null,
      moTa: movie.moTa,
      ngayKhoiChieu: moment(movie.ngayKhoiChieu).format(dateFormat),
      maPhim: movie.maPhim,
      maNhom: movie.maNhom,
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Please input movie title!"),
      trailer: Yup.string().required("Please input movie trailer - youtube"),
      moTa: Yup.string().required("Please input movie overview"),
      ngayKhoiChieu: Yup.string().required("Please chose a day"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      dispatch(postUpdateMovieAction(formData, navigate));
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

  const handleChangeDatePicker = (value) =>
    formik.setFieldValue("ngayKhoiChieu", moment(value).format(dateFormat));

  return (
    <Container>
      <Heading>Edit Movie</Heading>
      <AntDesignForm
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ sm: { span: 6 }, lg: { span: 3 } }}
      >
        <AntDesignFormItem label="Title">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tenPhim}
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
            value={formik.values.trailer}
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
            value={formik.values.moTa}
            rows={13}
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <div>{formik.errors.moTa}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem label="Release Date">
          <DatePicker format={dateFormat} onChange={handleChangeDatePicker} />
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <div>{formik.errors.ngayKhoiChieu}</div>
          ) : null}
        </AntDesignFormItem>
        <AntDesignFormItem label="Upload Poster">
          <input type="file" onChange={handleUpload} />
          <br />
          <img
            style={{ width: 200, height: 296, borderRadius: "8px" }}
            src={imgSrc === "" ? movie.hinhAnh : imgSrc}
            alt="poster"
          />
        </AntDesignFormItem>
        <AntDesignFormItem>
          <StyledButton type="submit">Update Movie</StyledButton>
        </AntDesignFormItem>
      </AntDesignForm>
    </Container>
  );
}
