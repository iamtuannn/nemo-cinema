import styled from "styled-components";

export const Container = styled.div`
  min-height: ${(props) => (props.auto ? "auto" : "100vh")};
  margin: 0 auto;
  max-width: 1440px;
  padding: 1rem;
  animation: fade-in 1s ease-in-out 0s both;
  
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;
