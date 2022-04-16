import React, { useEffect, useRef, useState } from "react";
import { MdPerson, MdClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import { SweetAlertQuestion } from "../../models/models";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function GridSeat({
  movieShowtime,
  seat,
  seatIsBooking,
  userLogin,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(300);

  let intervalRef = useRef(0);
  useEffect(() => {
    intervalRef.current = setInterval((prev) => {
      if (count > 0) {
        setCount((prev) => prev - 1);
      }

      if (count === 0) {
        const alert = new SweetAlertQuestion();
        alert.title = "Time's Up";
        alert.text = "Do you want to book again?";
        alert.showConfirmButton = true;
        alert.showCancelButton = true;
        alert.text = "Do You want to book again?";
        alert.timer = "";
        Swal.fire({ ...alert }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            navigate("/");
          }
        });
        clearInterval(intervalRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  const renderHeader = () => (
    <div className="flex">
      <h2 className="title">{movieShowtime.tenPhim}</h2>
      <div className="count-down">
        <span>HOLD TIME</span>
        <div className="flex-count">
          <span className="pending">0{Math.floor(count / 60)}</span>
          <span className="pending">{String(count % 60).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );

  const renderSeat = () =>
    seat.map((seat, index) => {
      let isVip = seat.loaiGhe === "Vip" ? "vip" : "";
      let isBooked =
        seat.daDat && seat.taiKhoanNguoiDat !== userLogin.taiKhoan
          ? "booked other"
          : seat.daDat && seat.taiKhoanNguoiDat === userLogin.taiKhoan
          ? "booked user"
          : "";
      let indexSeat = seatIsBooking.findIndex(
        (seatIsBooking) => seatIsBooking.maGhe === seat.maGhe
      );
      let isBooking = indexSeat !== -1 ? "booking" : "";

      return (
        <button
          className={`seat ${isVip} ${isBooked} ${isBooking}`}
          disabled={seat.daDat}
          key={index}
          onClick={() => {
            dispatch({
              type: "SEAT_IS_BOOKING",
              seatIsSelected: seat,
            });
          }}
        >
          {seat.daDat ? (
            seat.taiKhoanNguoiDat === userLogin.taiKhoan ? (
              <MdPerson />
            ) : (
              <MdClear />
            )
          ) : (
            seat.tenGhe
          )}
        </button>
      );
    });

  const renderSeatType = () => (
    <section className="seat-type">
      <div className="item">
        <button className="seat"></button>
        <span>Regular</span>
      </div>
      <div className="item">
        <button className="seat vip"></button>
        <span>VIP</span>
      </div>
      <div className="item">
        <button className="seat booking"></button>
        <span>Your Select</span>
      </div>
      <div className="item">
        <button className="seat booked other">
          <MdClear />
        </button>
        <span>Booked by Other</span>
      </div>
      <div className="item">
        <button className="seat booked user">
          <MdPerson />
        </button>
        <span>Booked by You</span>
      </div>
    </section>
  );

  return (
    <div style={{ overflowX: "hidden" }}>
      {renderHeader()}
      <section className="screen">
        <div className="borderScreen"></div>
        <div className="backgroundScreen">
          <p>SCREEN</p>
        </div>
      </section>
      <section className="grid-seat">{renderSeat()}</section>
      {renderSeatType()}
    </div>
  );
}
