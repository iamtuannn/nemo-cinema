import styled from "styled-components";
import { GridCardV1, GridCardV2 } from "../../styles/Styles";

export const LoadingCardV1 = () => <V1 />;
export const LoadingCardV2 = () => <V2 />;
export const LoadingPageV0 = () => <V0 />;
export const LoadingPageV1 = (props) => (
  <GridCardV2 grid={props.grid ? true : false}>
    {Array(20)
      .fill(0)
      .map((item, i) => (
        <V1 key={i} />
      ))}
  </GridCardV2>
);
export const LoadingPageV2 = (props) => (
  <GridCardV1 grid={props.grid ? true : false}>
    {Array(20)
      .fill(0)
      .map((item, i) => (
        <V2 key={i} />
      ))}
  </GridCardV1>
);

// horizontal rectangle
const V1 = styled.div`
  height: 250px;
  width: 100%;
  animation: loading 2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    hsla(248, 16%, 19%, 0.3) 25%,
    hsla(0, 56%, 53%, 0.25) 37%,
    hsla(248, 16%, 19%, 0.4) 63%
  );
  background-size: 400% 100%;
  margin: 0.5rem 0;
  border-radius: 4px;
`;

// vertical rectangle
const V2 = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  background-size: 400% 100%;
  animation: loading 2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    hsla(248, 16%, 19%, 0.3) 25%,
    hsla(0, 56%, 53%, 0.25) 37%,
    hsla(248, 16%, 19%, 0.4) 63%
  );

  height: calc(((100vw - 5rem) / 2) * 1.5);

  @media (min-width: 768px) {
    height: calc(((100vw - 6rem) / 3) * 1.5);
  }
  @media (min-width: 1024px) {
    height: calc(((100vw - 7rem) / 4) * 1.5);
  }

  @media (min-width: 1440px) {
    height: calc(((1440px - 8rem) / 5) * 1.5);
  }
`;

//full page
const V0 = styled.div`
  height: 100vh;
  width: 100%;
  animation: loading 2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    hsla(248, 16%, 19%, 0.3) 25%,
    hsla(0, 56%, 53%, 0.25) 37%,
    hsla(248, 16%, 19%, 0.4) 63%
  );
  background-size: 400% 100%;
  border-radius: 0.5rem;
`;
