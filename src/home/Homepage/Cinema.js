import React from "react";
import CGV from "../../images/cinema/cgv.png";
import CineStar from "../../images/cinema/cinestar.png";
import GalaxyCinema from "../../images/cinema/galaxycine.png";
import BHDStar from "../../images/cinema/bhdstar.png";
import LotteCinema from "../../images/cinema/lottecinema.png";
import MegaGS from "../../images/cinema/megagscinemas.png";

export default function Cinema() {
  const CinemaCard = ({ cinema }) => (
    <div
      style={{
        width: "100px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
      key={cinema.name}
    >
      <a href={cinema.url} target="_blank">
        <img src={cinema.src} alt={cinema.name} style={{ width: "100%" }} />
      </a>
    </div>
  );

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {CinemaList.map((cinema) => CinemaCard({ cinema }))}
    </div>
  );
}

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
