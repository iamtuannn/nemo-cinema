import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAccountInfoAction } from "../../redux/actions";
import { NEMO, USER_LOGIN } from "../../utils/config";
import styled from "styled-components";
import { Container, Heading } from "../../styles/Styles";
import bg from "../../images/bg.jpg";
import moment from "moment";

export default function BookingHistory() {
  document.title = `Booking History - ${NEMO}`;
  const dispatch = useDispatch();

  const ticket = useSelector((state) => state.UserReducer.ticket);

  let userLogin = localStorage.getItem(USER_LOGIN)
    ? JSON.parse(localStorage.getItem(USER_LOGIN))
    : {};

  useEffect(() => {
    dispatch(getAccountInfoAction({ taiKhoan: userLogin.taiKhoan }));
  }, [dispatch, userLogin.taiKhoan]);

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/" />;
  }

  return (
    <S.Background>
      <S.Box>
        <Container>
          <Heading>Booking History</Heading>
          <S.Grid>
            {ticket.map((ticket) => (
              <S.Card key={ticket.maVe}>
                <div>
                  <S.MovieName>{ticket.tenPhim}</S.MovieName>
                  <S.Text>
                    {ticket.danhSachGhe[0].tenHeThongRap} |{" "}
                    {moment(ticket.ngayDat).format("lll")}
                  </S.Text>
                </div>
                <S.Flex>
                  {ticket.danhSachGhe.map((seat, index) => (
                    <S.Text key={index}>[{seat.tenGhe}]</S.Text>
                  ))}
                </S.Flex>
              </S.Card>
            ))}
          </S.Grid>
        </Container>
      </S.Box>
    </S.Background>
  );
}

const S = {
  Background: styled.div`
    background-position: center;

    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${bg});
    min-height: 100vh;
    width: 100%;
    height: 100%;
  `,
  Box: styled.div`
    width: 100%;
    height: 100%;
    z-index: 2;
  `,
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    gap: 1rem;
  `,
  Card: styled.div`
    margin-bottom: 1rem;
    border: 1px solid var(--color-primary);
    border-radius: 8px;
    padding: 0.5rem;
    background: rgba(66, 63, 87, 0.5);
  `,
  MovieName: styled.p`
    color: var(--color-red);
  `,
  Flex: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  Text: styled.p`
    margin-right: 0.25rem;
  `,
};
