import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEMO } from "../../utils/config";
import { getNewsListAction } from "../../redux/actions";
import { Heading, Container } from "../../styles/Styles";
import { NewsCardV1 } from "../../components/NewsCard/NewsCardV1";
import { NewsCardV2 } from "../../components/NewsCard/NewsCardV2";
import { LoadingPageV1 } from "../../components/Loading/Loading";

export default function LatestNews() {
  document.title = `Latest News - ${NEMO}`;

  const news = useSelector((state) => state.NewsReducer.newsList);
  const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsListAction());
  }, [dispatch]);

  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension < 600;

  return (
    <Container>
      <Heading>Latest News</Heading>
      {isLoading ? (
        <LoadingPageV1 grid />
      ) : (
        <>
          {news.map((news, index) => (
            <Fragment key={index}>
              {isMobile ? (
                <NewsCardV2 news={news} />
              ) : (
                <NewsCardV1 news={news} />
              )}
            </Fragment>
          ))}
        </>
      )}
    </Container>
  );
}
