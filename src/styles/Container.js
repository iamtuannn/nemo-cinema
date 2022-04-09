import styled from "styled-components";

export const Container = styled.div`
  min-height: ${(props) => (props.auto ? "auto" : "100vh")};
  margin: 0 auto;
  max-width: 1440px;
  padding: 1rem;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;
