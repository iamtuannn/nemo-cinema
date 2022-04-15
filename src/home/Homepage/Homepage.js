import React from "react";
import { useSelector } from "react-redux";
import { Container, Heading } from "../../styles/Styles";
import { NEMO } from "../../utils/config";
import Banner from "./Banner";
import Cinema from "./Cinema";
import Movies from "./Movies";
import News from "./News";

export default function Homepage() {
  document.title = NEMO;

  const comingSoon = useSelector((state) => state.MovieReducer.comingSoon);
  const nowShowing = useSelector((state) => state.MovieReducer.nowShowing);

  return (
    <>
      <Banner />
      <Container>
        <Heading>Now Showing</Heading>
        <Movies movies={nowShowing} />
        <Heading>Coming Soon</Heading>
        <Movies movies={comingSoon} />
        <Heading>Latest News</Heading>
        <News />
        <Heading>Partner</Heading>
        <Cinema />
      </Container>
    </>
  );
}
