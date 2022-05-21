import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";
import LazyLoad from "react-lazyload";
import { LoadingCardV1 } from "../../components/Loading/Loading";
import noImage from "../../images/no-image.svg";
import { Link } from "react-router-dom";
import { NewsModel } from "../../models/models";
import { newsService } from "../../services/newsServices";

export default function News() {
  const [news, setNews] = useState({
    list: [new NewsModel()],
    isLoading: true,
  });

  useEffect(() => {
    const getNews = async () => {
      const result = await newsService.get();
      setNews({
        list: result.data.news
          .sort((a, b) => {
            return Date.parse(b.published) - Date.parse(a.published);
          })
          .slice(0, 6),
        isLoading: false,
      });
    };

    getNews();
  }, []);

  return (
    <S.Box>
      {news.isLoading ? (
        Array(6)
          .fill(0)
          .map((item, i) => (
            <S.Card key={i}>
              <LoadingCardV1 />
            </S.Card>
          ))
      ) : (
        <>
          {news.list.map((news, i) => (
            <S.Card key={i}>
              <LazyLoad height={200} style={{ height: "100%" }}>
                <Card.Box>
                  {news.imageUrl !== "" ? (
                    <Card.Img src={news.imageUrl} />
                  ) : (
                    <Card.NoImg src={noImage} />
                  )}
                  <Card.Title>
                    <Link to={`/news/${news.titleUrl}`} target="_parent">
                      <Card.Text>{news.title}</Card.Text>
                    </Link>
                  </Card.Title>
                </Card.Box>
              </LazyLoad>
            </S.Card>
          ))}
        </>
      )}
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;

    ${Breakpoints.lg} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    ${Breakpoints.sm} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
  Card: styled.div`
    width: 100%;
    font-size: 1.3rem;

    :first-child {
      grid-column: 1/3;
      font-size: 2.2rem;
    }

    :nth-child(2) {
      grid-column: 3/5;
      font-size: 2.2rem;
    }

    ${Breakpoints.lg} {
      :first-child,
      :nth-child(2) {
        grid-column: auto;
        font-size: 1.3rem;
      }
    }
  `,
};

const Card = {
  Box: styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    animation: fade-in 1s ease-in-out;
    background-color: var(--rgba-blue-magenta);
    height: 100%;
  `,
  Img: styled.img`
    width: 100%;
    background-position: center;
    background-size: cover;
    min-height: 250px;
  `,
  NoImg: styled.img`
    width: 180px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  Title: styled.div`
    position: absolute;
    bottom: 0;
    padding: 0.5rem 1rem;
    background-color: var(--rgba-blue-magenta);
    width: 100%;
  `,
  Text: styled.span`
    font-family: "Khand", sans-serif;
    font-size: inherit;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    :hover {
      color: var(--color-red);
    }
  `,
};
