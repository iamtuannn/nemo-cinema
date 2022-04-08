import styled from "styled-components";
import { Breakpoints } from "./Breakpoints";

export const StyledButton = styled.button`
  background: var(--color-red);
  border: none;
  color: var(--text-light);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-family: "Khand", sans-serif;
  text-transform: ${(props) => (props.textTransform ? props.textTransform : "none")};
  font-weight: 700;
  font-size: 1.8rem;
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
    font-size: 1.5rem;
  }

  ${Breakpoints.sm} {
    font-size: 1.3rem;
  }
`;
