import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../images/no-image.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Container, SectionTitle } from "../../styles/Styles";
import { Breakpoints } from "../../styles/Breakpoints";
import { getNewsAction } from "../../redux/actions";
import styled from "styled-components";
import { NewsCardV2 } from "../../components/NewsCard/NewsCardV2";
import { LoadingPageV0 } from "../../components/Loading/Loading";


export default function News() {
  const news = useSelector((state) => state.NewsReducer.news);
  const latest = useSelector((state) => state.NewsReducer.newsList);
  const popular = latest.filter((news) => news.popular === true);
  const trending = latest.filter((news) => news.trending === true);
   const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewsAction(params.url, navigate));
  }, [dispatch, params.url, navigate]);

  const renderNews = ({ name, type, max, width }) => (
    <>
      <SectionTitle w={width}>{name} News</SectionTitle>
      <SideBar.BoxContent>
        {type.slice(0, max).map((news, i) => (
          <NewsCardV2 news={news} key={i} />
        ))}
      </SideBar.BoxContent>
    </>
  );

  return (
    <>
      {isLoading ? (
        <LoadingPageV0 />
      ) : (
        <Container>
          <S.Box>
            <S.Article>
              <S.ArticleHeader>
                <S.Title>{news.title}</S.Title>
                <S.Excerpt>{news.excerpt}</S.Excerpt>
                <S.Published>
                  published {moment(news.published).startOf("hour").fromNow()}
                </S.Published>
                <S.Image
                  src={news.imageUrl !== "" ? news.imageUrl : noImage}
                  alt={news.title}
                />
              </S.ArticleHeader>
              <S.ArticleBody>
                {news.body.split("\n\n").map((item, index) => (
                  <S.Content key={index}>{item}</S.Content>
                ))}
              </S.ArticleBody>
            </S.Article>
            <SideBar.Box grid>
              {renderNews({
                name: "Trending",
                type: trending,
                max: 4,
                width: "181px",
              })}
              {renderNews({
                name: "Popular",
                type: popular,
                max: 2,
                width: "172px",
              })}
            </SideBar.Box>
          </S.Box>
          <Latest.Box>
            <SectionTitle w="149px">Latest News</SectionTitle>
            <Latest.Grid>
              {latest.slice(0, 4).map((news, i) => (
                <NewsCardV2 news={news} key={i} />
              ))}
            </Latest.Grid>
          </Latest.Box>
        </Container>
      )}
    </>
  );
}

const S = {
  Box: styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    animation: fade-in 1s ease-in-out 0s;
    transition: all 1s ease-in-out;

    ${Breakpoints.md} {
      display: block;
    }
  `,

  Article: styled.div``,

  ArticleHeader: styled.div``,

  Title: styled.h2`
    font-size: 2.7em;
    font-weight: 600;
    line-height: 1.3;
    font-family: "Khand", sans-serif;
    color: var(--text-light);

    ${Breakpoints.md} {
      display: block;
      font-size: 1.5em;
    }
  `,

  Excerpt: styled.p`
    font-size: 1.2rem;
    font-family: "Changa", sans-serif;
    line-height: 1.5;
    margin: 1rem 0 1rem;
  `,

  Published: styled.span`
    text-transform: uppercase;
    font-style: italic;
    color: var(--color-light-blue);
  `,

  Image: styled.img`
    margin: 1rem 0;
    max-width: 100%;
  `,

  ArticleBody: styled.div``,
  Content: styled.p`
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 2rem;
  `,
};

const SideBar = {
  Box: styled.div``,
  BoxContent: styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    ${Breakpoints.md} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    ${Breakpoints.sm} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
};

const Latest = {
  Box: styled.div`
    margin-top: 1rem;
  `,
  Grid: styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    ${Breakpoints.md} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    ${Breakpoints.sm} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
};
