import styled from "styled-components";

export const Card = styled.div`
  margin-top: 1rem;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-secondary);

  :first-child {
    margin-top: 0;
  }

  @media (min-width: 1024px) {
    display: ${(props) => (props.display ? props.display : "none")};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  height: auto;
  max-height: 141px;
  animation: fade-in 1s ease-in-out 0s both;
  @media (min-width: 1024px) {
    max-height: 204px;
  }
`;

export const Poster = styled.img`
  width: 94px;
  height: 141px;
  width: 94px;
  height: 141px;
  background-color: var(--rgba-blue-magenta);

  @media (min-width: 1024px) {
    width: 136px;
    height: 204px;
    width: 136px;
    height: 204px;
  }
`;

export const Content = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Name = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.2rem;
  margin: 0;
  white-space: normal;
  color: var(--color-red);
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

export const ReleaseDate = styled.span`
  margin-left: 0;
  white-space: nowrap;
  font-style: italic;
  font-size: 0.8rem;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const Overview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  font-size: 1rem;
  @media (min-width: 1024px) {
    -webkit-line-clamp: 3;
  }
`;
