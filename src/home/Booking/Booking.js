import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingAction, getMovieShowTimesAction } from "../../redux/actions";
import _ from "lodash";
import { StyledBooking } from "./BookingElements";
import { Form, Input } from "antd";
import { BookingModel } from "../../models/models";
import GridSeat from "./GridSeat";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../styles/Styles";
import { SweetAlertWarning } from "../../models/models";
import Swal from "sweetalert2";
import { LoadingPageV0 } from "../../components/Loading/Loading";

const alertWarning = new SweetAlertWarning();

export default function Booking() {
  const { movieShowtime, seat, seatIsBooking } = useSelector(
    (state) => state.CinemaReducer
  );

   const isLoading = useSelector((state) => state.LoadingReducer.isLoading);
  const { userLogin } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  function handleBooking() {
    const bookingInfo = new BookingModel();
    bookingInfo.maLichChieu = params.id;
    bookingInfo.danhSachVe = seatIsBooking;
    bookingInfo.taiKhoanNguoiDung = userLogin.taiKhoan;

    if (bookingInfo.danhSachVe.length === 0) {
      alertWarning.title = "Please choose at least one seat";
      alertWarning.text = "";
      return Swal.fire({ ...alertWarning });
    }
    return dispatch(BookingAction(bookingInfo, navigate));
  }

  useEffect(() => {
    dispatch(getMovieShowTimesAction(params.id, navigate));
  }, [dispatch, params.id, navigate]);

  const renderSideBar = () => (
    <section className="side-bar">
      <div className="center">
        <img src={movieShowtime.hinhAnh} alt={movieShowtime.tenPhim} />
      </div>
      <h4>{movieShowtime.tenCumRap}</h4>
      <p>
        {movieShowtime.ngayChieu} - {movieShowtime.gioChieu} -{" "}
        {movieShowtime.tenRap}
      </p>
      <div className="user-info">
        <h4>User Information</h4>
        <Form>
          <Form.Item label="Name">
            <Input value={userLogin.hoTen} disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={userLogin.email} disabled />
          </Form.Item>
          <Form.Item label="Phone">
            <Input value={userLogin.soDT} disabled />
          </Form.Item>
        </Form>
      </div>
      <div className="side-bar-money">
        <p className="text-4xl">
          $
          {seatIsBooking
            .reduce((cost, seat) => {
              return (cost += seat.giaVe);
            }, 0)
            .toLocaleString()}{" "}
        </p>
      </div>
      <div className="seats">
        {_.sortBy(seatIsBooking, ["maGhe"]).map((seat, index) => (
          <span className="pending" key={index}>
            {seat.stt}
          </span>
        ))}
      </div>
      <button onClick={handleBooking} className="get-ticket">
        GET TICKET
      </button>
    </section>
  );

  const renderGetTicketFixed = () => (
    <section className="fixed">
      <div className="get-ticket-flex">
        <div className="money center">
          <p>
            $
            {seatIsBooking
              .reduce((cost, seat) => {
                return (cost += seat.giaVe);
              }, 0)
              .toLocaleString()}{" "}
          </p>
        </div>
        <div className="get-ticket center">
          <button
            onClick={handleBooking}
          >
            GET TICKET
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {isLoading ? (
        <LoadingPageV0 />
      ) : (
       <Container>
          <StyledBooking>
            <section className="grid">
              <GridSeat
                movieShowtime={movieShowtime}
                seat={seat}
                seatIsBooking={seatIsBooking}
                userLogin={userLogin}
              />
              {renderSideBar()}
            </section>
            {renderGetTicketFixed()}
          </StyledBooking>
       </Container>
      )}
    </>
  );
}
