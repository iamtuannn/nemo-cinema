import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    formik.setFieldValue("ngayKhoiChieu", value.format(dateFormat));

  const initialValues = [
    {
      name: ["tenPhim"],
      value: formik.values.tenPhim,
    },
    {
      name: ["trailer"],
      value: formik.values.trailer,
    },
    {
      name: ["moTa"],
      value: formik.values.moTa,
    },
    {
      name: ["ngayKhoiChieu"],
      value: moment(formik.values.ngayKhoiChieu, dateFormat),
    },
  ];

  return (
    <Container>
      <Heading admin>Edit Movie</Heading>
      <AntDesignForm
        onFinish={formik.handleSubmit}
        labelCol={{ sm: { span: 6 }, lg: { span: 3 } }}
        fields={initialValues}
      >
        <AntDesignFormItem
          label="Movie name"
          name="tenPhim"
          admin="true"
          rules={[{ required: true, message: "Please input movie name." }]}
        >
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </AntDesignFormItem>
        <AntDesignFormItem
          label="Trailer"
          name="trailer"
          rules={[{ required: true, message: "Please input youtube trailer." }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>
        <AntDesignFormItem
          label="Overview"
          name="moTa"
          rules={[{ required: true, message: "Please input movie overview." }]}
        >
          <Input.TextArea onChange={formik.handleChange} rows={8} />
        </AntDesignFormItem>
        <AntDesignFormItem
          label="Release Date"
          name="ngayKhoiChieu"
          rules={[{ required: true, message: "Please chose a day." }]}
        >
          <DatePicker format={dateFormat} onChange={handleChangeDatePicker} />
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
