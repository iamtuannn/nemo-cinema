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

const BannerList = [
  {
    id: 1,
    name: "Doctor Strange in the Multiverse of Madness",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ndCSoasjIZAMMDIuMxuGnNWu4DU.jpg",
    link: "/movie/doctor-strange-in-the-multiverse-of-madness-10197/",
    trailer: "https://youtu.be/Rt_UqUm38BI",
    tagline: "Enter a new dimension of Strange.",
  },
  {
    id: 2,
    name: "BLACKPINK: Light Up the Sky",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/dKtkvL8tScUlh67vig2Ama74Jz1.jpg",
    link: "/movie/blackpink-light-up-the-sky-10190/",
    trailer: "https://youtu.be/7jx_vdvxWu0",
    tagline: "The rise of a global phenomena.",
  },
  {
    id: 3,
    name: "Death on the Niles",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/lRbDyjI7HEaXxflFQbYpqHRGFBJ.jpg",
    link: "/movie/death-on-the-nile-10202/",
    trailer: "https://youtu.be/JM1U-Whb-P0",
    tagline: "Murder was just the beginning.",
  },
  {
    id: 4,
    name: "Eternals",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg",
    link: "/movie/eternals-10198/",
    trailer: "https://youtu.be/x_me3xsvDgk",
    tagline: "In the beginning...",
  },
  {
    id: 5,
    name: "Red Notice",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/dK12GIdhGP6NPGFssK2Fh265jyr.jpg",
    link: "/movie/red-notice-10257/",
    trailer: "https://youtu.be/Pj0wz7zu3Ms",
    tagline: "Pro and cons.",
  },
  {
    id: 6,
    name: "Lightyear",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ce7o5nkpZD6Dp5luLnSKMSUjatl.jpg",
    link: "/movie/lightyear-10256/",
    trailer: "https://youtu.be/BwPL0Md_QFQ",
    tagline: "Infinity awaits.",
  },
  {
    id: 7,
    name: "Don't Look Up",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/nvxrQQspxmSblCYDtvDAbVFX8Jt.jpg",
    link: "/movie/don-t-look-up-10200/",
    trailer: "https://youtu.be/RbIxYm3mKzI",
    tagline: "Based on truly possible events.",
  },
  {
    id: 8,
    name: "The Batman",
    backdrop:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
    link: "/movie/the-batman-10205/",
    trailer: "https://youtu.be/mqqft2x_Aa4",
    tagline: "Unmask the truth.",
  },
];

const settings = {
  dots: true,
  infinite: true,
  lazyLoad: true,
  fade: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  cssEase: "linear",
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <RSNextArrow sizeLarge />,
  prevArrow: <RSPrevArrow sizeLarge />,
};
