import styled from "styled-components";

export const BackDrop = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  animation: fade-in 1s ease-in-out 0s both;

  @media (min-width: 1024px) {
    background-position: right -200px top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${(props) => props.bg};
  }
`;

export const CustomBackground = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 1024px) {
    background-image: linear-gradient(
      to right,
      rgba(38, 38, 38, 1) 200px,
      rgba(7.84%, 1.18%, 1.96%, 0.7) 50%
    );
  }
`;

export const Wrapper = styled.div`
  background-color: transparent;
  padding: 0;

  @media (min-width: 1024px) {
    padding: 30px 40px;
  }
`;

export const Content = styled.section`
  display: block;
  height: auto;
  width: 100%;
  min-width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: nowrap;
  }
`;

export const PosterWrapper = styled.div`
  height: auto;
  min-width: 100vw;
  width: 100vw;

  @media (min-width: 1024px) {
    border-width: 0px;
    min-width: 300px;
    width: 300px;
    height: 450px;
    overflow: hidden;
    border-radius: 8px;
  }
`;

export const PosterWrapperContent = styled.div`
  min-width: 100vw;
  width: 100vw;
  height: calc(100vw / 2.222222);
  position: relative;
  top: 0;
  left: 0;
  display: block;

  @media (min-width: 1024px) {
    min-width: 300px;
    width: 300px;
    height: 450px;
    position: relative;
    top: 0;
    left: 0;
    display: block;
  }
`;

export const PosterContent = styled.div`
  background-image: ${(props) => props.bg};
  background-position: calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-width: 100%;
  height: 100%;
  position: relative;
  animation: fade-in 1s ease-in-out 0s both;
  @media (min-width: 1024px) {
    width: 300px;
    height: 450px;
    background-image: none;
  }
`;

export const BackgroundGradient = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(9.8%, 9.41%, 9.02%, 1) 20%,
    rgba(9.8%, 9.41%, 9.02%, 0) 50%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const Poster = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: calc(((100vw / 2.222222) - 40px) / 1.5);
  height: calc((100vw / 2.222222) - 40px);
  border-radius: 8px;
  z-index: 4;
  animation: zoom-left 1s ease-in-out 0s;
  background: var(--color-primary);

  @media (min-width: 1024px) {
    position: unset;
    display: block;
    width: 100%;
    height: 100%;
    border-width: 0px;
    outline: none;
    top: 0;
    left: 0;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;

  && svg {
    font-size: 5rem;
    color: var(--color-red);
  }
`;

export const Play = styled.div`
  display: none;
  @media (min-width: 1024px) {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    visibility: hidden;

    ${PosterContent}:hover & {
      visibility: visible;
    }
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const InfoContent = styled.div`
  position: relative;
  bottom: 0;
  top: 0;
  float: none;
  box-sizing: border-box;
  padding-left: 0;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 40px;
  }
`;

export const Name = styled.h2`
  font-size: calc(1.8rem + 2vw);
  font-weight: 600;
  font-family: Khand, sans-serif;
  margin-bottom: 0;
  text-align: center;
  color: var(--text-light);
`;

export const Flex = styled.div`
  display: flex;
`;

export const Fact = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const Release = styled.span``;

export const Runtime = styled.span`
  position: relative;
  padding-left: 20px;

  &&::after {
    content: "\u2022";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 7px;
  }
`;

export const Genres = styled.span`
  position: relative;
  padding: 0.5rem 0;

  &&::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 7px;
  }

  @media (min-width: 1024px) {
    padding-left: 1.5rem;

    &&::after {
      content: "\u2022";
    }
  }
`;

export const Tagline = styled.p`
  border-left: 3px solid var(--color-red);
  padding-left: 1rem;
  margin: 1rem 0;
  font-size: 1.3em;
  font-weight: 400;
  font-style: italic;
  color: var(--color-red);
  font-family: "Changa", sans-serif;
`;

export const Overview = styled.p``;

export const OverviewContent = styled.div`
  padding: 1rem;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

export const Trailer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const ButtonTrailer = styled.button`
  background: var(--color-red);
  border: 1px solid transparent;
  cursor: pointer;
  color: #fff;
  padding: 5px 10px;
  width: auto;
  height: auto;
  border-radius: 6px;
`;

export const PlayTrailer = styled.span`
  font-weight: 600;
  font-family: Khand, sans-serif;
`;

export const Cast = styled.div`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: auto;
  padding: 1rem 0;
`;

export const FlexInitial = styled.div`
  flex: 0 1 auto;
`;

export const Card = styled.div`
  margin: 0 0.5rem;
  width: 120px;
  border-radius: 6px;
  overflow: hidden;
  height: 100%;

  &:first-child {
    margin-left: 0px;
  }

  @media (min-width: 768px) {
    width: 150px;
    margin: 0 0.75rem;
  }
`;

export const Profile = styled.img`
  background-color: var(--rgba-blue-magenta);
  width: 100%;
  height: 180px;
  display: block;

  @media (min-width: 768px) {
    height: 225px;
  }
`;

export const BgWhite = styled.div`
  background: #fff;
  height: 100%;
`;

export const CharacterName = styled.p`
  padding: 0.25rem 1rem;
  font-size: ${(props) => (props.small ? "0.9rem" : "1.1rem")};
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;

export const Showtime = styled.div`
  margin: 1.25rem 0;
  padding: 20px 20px 20px 0;
  border-radius: 8px;
  background: var(--color-secondary);
`;

export const NoShowtime = styled.p`
  font-family: Khand, sans-serif;
  font-size: 1.25rem;
  text-align: center;
  margin: 1rem 0;
`;

export const CinemaLogo = styled.img`
  width: 50px;
`;

export const Cinema = styled.div`
  padding: 1rem 0;
  border-bottom-width: 2px;
  &:last-child {
    border: none;
  }
  &:first-child {
    padding-top: 0;
  }
  color: white;
`;

export const CinemaName = styled.p`
  font-size: calc(0.8rem + 0.8vw);
  font-weight: 600;
  color: var(--color-red);
  margin-bottom: 0.5rem;
`;

export const CinemaShowtime = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  gap: 0.5rem;
`;

export const Checkout = styled.div`
  grid-column: span 1 / span 1;
  text-align: center;
`;

export const ShowtimeLink = styled.button`
  position: relative;
  z-index: 1;
  font-family: Khand, sans-serif;
  font-size: 1.25rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: -0.25em;
    right: -0.25em;
    background-color: var(--color-red);
    transform-origin: center right;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  :hover::before {
    transform: scaleX(1);
    transform-origin: center left;
  }
`;

export const MovieName = styled.span`
  color: var(--color-red);
  font-family: inherit;
  font-size: inherit;
`;
