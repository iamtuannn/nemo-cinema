import React from "react";
import CGV from "../../images/cinema/cgv.png";
import CineStar from "../../images/cinema/cinestar.png";
import GalaxyCinema from "../../images/cinema/galaxycine.png";
import BHDStar from "../../images/cinema/bhdstar.png";
import LotteCinema from "../../images/cinema/lottecinema.png";
import MegaGS from "../../images/cinema/megagscinemas.png";
import styled from "styled-components";
import {
  ReactSlick,
  RSNextArrow,
  RSPrevArrow,
} from "../../components/ReactSlick/ReactSlick";
import LazyLoad from "react-lazyload";

export default function Cinema() {
  return (
    <ReactSlick {...settings}>
      {CinemaList.map((cinema) => (
        <S.Link href={cinema.url} target="_blank" key={cinema.name}>
          <LazyLoad>
            <S.Logo src={cinema.src} alt={cinema.name} title={cinema.name} />
          </LazyLoad>
        </S.Link>
      ))}
    </ReactSlick>
  );
}

const S = {
  Link: styled.a``,
  Logo: styled.img`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    animation: fade-in 1s ease-in-out;
  `,
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <RSNextArrow />,
  prevArrow: <RSPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const CinemaList = [
  {
    name: "CGV",
    src: CGV,
    url: "https://www.cgv.vn/",
  },
  {
    name: "Cine Star",
    src: CineStar,
    url: "https://cinestar.com.vn/",
  },
  {
    name: "Galaxy Cinema",
    src: GalaxyCinema,
    url: "https://www.galaxycine.vn/",
  },
  {
    name: "BHD Star",
    src: BHDStar,
    url: "https://www.bhdstar.vn/",
  },
  {
    name: "Lotte Cinema",
    src: LotteCinema,
    url: "https://www.lottecinemavn.com/LCHS/index.aspx",
  },
  {
    name: "Mega GS",
    src: MegaGS,
    url: "https://www.megagscinemas.vn/",
  },
];
