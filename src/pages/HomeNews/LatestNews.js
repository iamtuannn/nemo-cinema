import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEMO } from "../../utils/config";
import { getNewsListAction } from "../../redux/actions";
import { Container } from "../../styles/Container";
import { Heading } from "../../styles/Heading";
import { NewsCardV1 } from "../../components/NewsCard/NewsCardV1";
import { NewsCardV2 } from "../../components/NewsCard/NewsCardV2";
import Loading from "../../components/Loading/Loading";

export default function LatestNews() {
  const news = useSelector((state) => state.NewsReducer.newsList);
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsListAction());
    document.title = `Latest News - ${NEMO}`;
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Heading>Latest News</Heading>
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
