import styled from "styled-components";

export const MovieGridV1 = styled.div`
  display: none;
  gap: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const MovieGridV2 = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 768px) {
    display: none;
  }
`;
