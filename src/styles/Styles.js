import styled from "styled-components";
import { Breakpoints } from "./Breakpoints";

export const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1440px;
  padding: 2rem;
  animation: fade-in 1s ease-in-out 0s both;

  ${Breakpoints.lg} {
    padding: 1rem;
  }
`;

export const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  font-family: "Khand", sans-serif;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-red);
  padding-bottom: 1rem;

  ${Breakpoints.lg} {
    font-size: 2.5rem;
  }

  ${Breakpoints.md} {
    font-size: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  display: block;
  position: relative;
  line-height: 1.3;
  font-family: Khand;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.5px;
  margin: ${(props) => (props.mbZero ? "0 0 1.5rem 0" : "1.5rem 0")};

  &&::after {
    content: "";
    display: block;
    width: ${(props) => props.w};
    height: 5px;
    margin-top: 0.5rem;
    background: var(--color-red);
  }
`;

export const StyledButton = styled.button`
  background: var(--color-red);
  border: none;
  color: var(--text-light);
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: "Khand", sans-serif;
  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : "none"};
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  z-index: 1;
  position: relative;
  min-width: 100px;

  ::after {
    content: "";
    z-index: -1;
    background-color: var(--color-magenta);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 1.25em;
    transform: translate3d(-825%, 0, 0) rotate(35deg);
  }

  :hover::after {
    transition: transform 0.5s ease-in-out;
    transform: translate3d(200%, 0, 0) rotate(35deg);
  }

  ${Breakpoints.lg} {
    font-size: 1.3rem;
  }

  ${Breakpoints.sm} {
    font-size: 1.2rem;
  }
`;
