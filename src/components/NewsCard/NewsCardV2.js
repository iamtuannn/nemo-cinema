import { Link } from "react-router-dom";
import styled from "styled-components";
import noImage from "../../images/no-image.svg";
import LazyLoad from "react-lazyload";

export const NewsCardV2 = ({ news }) => (
  <NewsCard.MB>
    <LazyLoad height={400} style={{ height: "100%" }}>
      <NewsCard.Box>
        <Link to={`/news/${news.titleUrl}/`} target="_parent">
          <NewsCard.Image
            src={news.imageUrl !== "" ? news.imageUrl : noImage}
            alt={news.title}
            loading="lazy"
          />
          <NewsCard.Content>
            <NewsCard.Title>{news.title}</NewsCard.Title>
          </NewsCard.Content>
        </Link>
      </NewsCard.Box>
    </LazyLoad>
  </NewsCard.MB>
);

const NewsCard = {
  MB: styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    animation: fade-in 1s ease-in-out 0s;
    height: 100%;
    margin-bottom: 1.5rem;

    :last-child {
      margin-bottom: 0;
    }
  `,
  Box: styled.div`
    background: var(--color-secondary);
    height: 100%;
  `,

  Image: styled.img`
    width: 100%;
    height: 200px;
    background-color: var(--rgba-blue-magenta);
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
  `,
  Title: styled.span`
    font-family: "Khand", sans-serif;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #fff;

    :hover {
      color: var(--color-red);
    }
  `,
};
