import styled from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";

const StyledNextArrow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.sizeLarge ? "50px" : "40px")};
  height: ${(props) => (props.sizeLarge ? "50px" : "40px")};
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;
  top: ${(props) => (props.center ? "calc(50% - 2.125rem)" : "50%")};
  margin-top: -24px;
  background: rgba(66, 63, 87, 0.5);
  right: 20px;
  z-index: 10;
`;

const StyledPrevArrow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.sizeLarge ? "50px" : "40px")};
  height: ${(props) => (props.sizeLarge ? "50px" : "40px")};
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;
  top: ${(props) => (props.center ? "calc(50% - 2.125rem)" : "50%")};
  margin-top: -24px;
  background: rgba(66, 63, 87, 0.5);
  left: 20px;
  z-index: 10;
`;

export const RSNextArrow = (props) => {
  const { onClick } = props;
  return (
    <StyledNextArrow
      onClick={onClick}
      center={props.center ? true : false}
      sizeLarge={props.sizeLarge ? true : false}
    >
      <BsChevronRight style={{ color: "var(--color-red)" }} />
    </StyledNextArrow>
  );
};

export const RSPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <StyledPrevArrow
      onClick={onClick}
      center={props.center ? true : false}
      sizeLarge={props.sizeLarge ? true : false}
    >
      <BsChevronLeft style={{ color: "var(--color-red)" }} />
    </StyledPrevArrow>
  );
};

export const ReactSlick = styled(Slider)`
  .slick-list {
    margin: 1rem 0;
    animation: fade-in 1s ease-in-out;
  }

  .slick-slide {
    padding: 0.25rem;
  }
`;
