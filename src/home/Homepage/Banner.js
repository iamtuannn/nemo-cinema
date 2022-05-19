import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import {
  RSNextArrow,
  RSPrevArrow,
} from "../../components/ReactSlick/ReactSlick";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getVideoId from "get-video-id";
import BannerList from "../../utils/BannerList";

export default function Banner() {
  const dispatch = useDispatch();

  return (
    <S.Slider {...settings}>
      {BannerList.map((banner) => (
        <S.Box key={banner.id}>
          <Link to={banner.link}>
            <S.Backdrop backdrop={banner.backdrop} />
          </Link>
          <S.Content>
            <S.Background>
              <S.Name>{banner.name}</S.Name>
              <S.Tagline>{banner.tagline}</S.Tagline>
              <S.Button
                bg="var(--color-red)"
                onClick={() => {
                  dispatch({
                    type: "SET_STATUS",
                    status: {
                      isOpen: true,
                      videoId: getVideoId(banner.trailer).id,
                    },
                  });
                }}
              >
                <S.PlayTrailer>WATCH TRAILER</S.PlayTrailer>
              </S.Button>
            </S.Background>
          </S.Content>
        </S.Box>
      ))}
    </S.Slider>
  );
}

const S = {
  Box: styled.div`
    position: relative;
  `,
  Backdrop: styled.div`
    background-image: url(${(props) => props.backdrop});
    width: 100vw;
    height: calc(100vw * 2 / 5);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: auto;
    @media (min-width: 1920px) {
      width: 1920px;
      height: 800px;
    }
  `,
  Content: styled.div`
    position: absolute;
    bottom: 10%;
    left: 10%;
    min-width: 300px;
  `,
  Name: styled.h4`
    font-size: calc(1.8rem + 0.5vw);
    font-weight: 600;
    font-family: Khand, sans-serif;
    margin-bottom: 0;
  `,
  Tagline: styled.p`
    border-left: 3px solid var(--color-red);
    padding-left: 1rem;
    font-size: 1.3em;
    font-weight: 400;
    font-style: italic;
    color: var(--color-red);
    font-family: "Changa", sans-serif;
    margin-bottom: 1rem;
  `,
  Background: styled.div`
    background: rgba(66, 63, 87, 0.7);
    padding: 1rem;
    border-radius: 8px;
  `,
  Button: styled.button`
    background: var(--color-red);
    border: 1px solid transparent;
    cursor: pointer;
    color: #fff;
    padding: 5px 10px;
    width: auto;
    height: auto;
    border-radius: 6px;
  `,
  PlayTrailer: styled.span`
    font-weight: 600;
    font-family: Khand, sans-serif;
    font-size: 20px;
  `,
  Slider: styled(Slider)`
    display: none;

    @media (min-width: 768px) {
      animation: fade-in 1s ease-in-out;
      display: block;
      max-width: 1920px;
      margin: auto;
      .slick-dots {
        bottom: 10px;
      }
      .slick-dots li.slick-active button:before {
        opacity: 1;
        color: var(--color-red);
      }
      .slick-dots li button:before {
        opacity: 0.8;
        color: var(--color-primary);
        font-size: 0.8rem;
      }
    }
  `,
};

const settings = {
  dots: true,
  infinite: true,
  lazyLoad: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <RSNextArrow sizeLarge />,
  prevArrow: <RSPrevArrow sizeLarge />,
};
