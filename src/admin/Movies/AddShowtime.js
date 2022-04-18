import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCinemaAction,
  getMovieByID,
  postShowTimeAction,
} from "../../redux/actions";
import { cyberSoftServices } from "../../services/cyberSoftServices";
import { Container, Heading, StyledButton } from "../../styles/Styles";
import { NEMO } from "../../utils/config";
import moment from "moment";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { DatePicker, InputNumber, Select } from "antd";
export default function AddShowtime() {
  document.title = `Add Movie Showtime - ${NEMO}`;

  const cinemaList = useSelector((state) => state.CinemaReducer.cinemaList);
  const movie = useSelector((state) => state.MovieReducer.movieEdit);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(getCinemaAction());
    dispatch(getMovieByID(params.id));
    window.scroll(0, 0);
  }, [dispatch, params.id]);

  const [cinema, setCinema] = useState({
    branches: [],
    number: [],
  });

  const getBranches = async (id) => {
    try {
      const result = await cyberSoftServices.get(
        `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
      );
      setCinema({
        ...cinema,
        branches: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 75000,
    },
    onSubmit: (values) => dispatch(postShowTimeAction(values, navigate)),
  });

  const handleCinemaBranches = (value) =>
    setCinema({ ...cinema, number: cinema.branches[value].danhSachRap });

  const handleCinemaNumber = (value) => formik.setFieldValue("maRap", value);

  const handleDate = (value) =>
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY HH:mm:ss")
    );

  const handlePrice = (value) => formik.setFieldValue("giaVe", value);

  return (
    <Container>
      <Heading admin>Add Showtime</Heading>
      <h3 style={{ fontSize: "2rem", textAlign: "center" }}>{movie.tenPhim}</h3>
      <AntDesignForm
        onFinish={formik.handleSubmit}
        labelCol={{ sm: { span: 6 }, lg: { span: 3 } }}
      >
        <AntDesignFormItem
          admin="true"
          label="Cinema"
          name="cinema"
          rules={[{ required: true, message: "Please choose at least one" }]}
        >
          <Select
            options={cinemaList.map((cinema) => ({
              label: cinema.tenHeThongRap,
              value: cinema.maHeThongRap,
            }))}
            onChange={getBranches}
            placeholder="Cinema Name"
          />
        </AntDesignFormItem>
        <AntDesignFormItem
          admin="true"
          label="Branches"
          name="branch"
          rules={[{ required: true, message: "Please choose at least one" }]}
        >
          <Select
            options={cinema.branches.map((branch, index) => ({
              label: branch.tenCumRap,
              value: index,
            }))}
            onChange={handleCinemaBranches}
            placeholder="Branches"
          />
        </AntDesignFormItem>
        <AntDesignFormItem
          admin="true"
          label="Number"
          name="number"
          rules={[{ required: true, message: "Please choose at least one" }]}
        >
          <Select
            options={cinema.number?.map((cinema) => ({
              label: cinema.tenRap,
              value: cinema.maRap,
            }))}
            onChange={handleCinemaNumber}
            placeholder="Number"
          />
        </AntDesignFormItem>
        <AntDesignFormItem
          admin="true"
          label="Time"
          name="time"
          rules={[{ required: true, message: "Please input a valid date" }]}
        >
          <DatePicker
            format="DD/MM/YYYY hh:mm A"
            showTime
            onChange={handleDate}
          />
        </AntDesignFormItem>
        <AntDesignFormItem
          admin="true"
          label="Price"
          name="price"
          initialValue={formik.values.giaVe}
          rules={[
            {
              required: true,
              message: "Please input available price",
            },
            {
              type: "number",
              min: 75000,
              max: 200000,
              message: "Price must be from 75.000 to 200.000",
            },
          ]}
        >
          <InputNumber onChange={handlePrice} />
        </AntDesignFormItem>
        <AntDesignFormItem>
          <StyledButton type="submit">Add Showtime</StyledButton>
        </AntDesignFormItem>
      </AntDesignForm>
    </Container>
  );
}
