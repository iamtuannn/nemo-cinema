import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import noImage from "../../images/no-image.svg";
import { Breakpoints } from "../../styles/Breakpoints";
import LazyLoad from "react-lazyload";

export const NewsCardV1 = ({ news }) => (
  <NewsCard.MB>
    <LazyLoad height={100}>
      <NewsCard.Box>
        <Link to={`/news/${news.titleUrl}/`} target="_parent">
          <NewsCard.Image
            src={news.imageUrl !== "" ? news.imageUrl : noImage}
            alt={news.title}
            loading="lazy"
          />
        </Link>
        <NewsCard.Content>
          <Link to={`/news/${news.titleUrl}/`} target="_parent">
            <NewsCard.Title>{news.title}</NewsCard.Title>
          </Link>
          <div>
            <NewsCard.Excerpt>{news.excerpt}</NewsCard.Excerpt>
            <NewsCard.Published>
              published {moment(news.published).startOf("hour").fromNow()}
            </NewsCard.Published>
          </div>
        </NewsCard.Content>
      </NewsCard.Box>
    </LazyLoad>
  </NewsCard.MB>
);

const NewsCard = {
  MB: styled.div`
    margin-bottom: 1.5rem;

    :last-child {
      margin-bottom: 0;
    }
  `,
  Box: styled.div`
    border-radius: 0.5rem;
    background: var(--color-secondary);
    overflow: hidden;
    display: grid;
    grid-template-columns: 30% 1fr;
    animation: fade-in 1s ease-in-out 0s both;

    ${Breakpoints.lg} {
      grid-template-columns: 40% 1fr;
    }
  `,

  Image: styled.img`
    max-width: 100%;
    min-height: 100%;
    background-color: var(--rgba-blue-magenta);
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem;

  `,

  Col: styled.div``,
  Title: styled.span`
    font-family: "Khand", sans-serif;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #fff;

    :hover {
      color: var(--color-red);
    }
  `,
  Excerpt: styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  `,

  Published: styled.span`
    font-style: italic;
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 500;
  `,
};
