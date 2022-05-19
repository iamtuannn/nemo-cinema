import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled.div`
  background-color: var(--rgba-blue-magenta);
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
`;

export const Rounded = styled.div`
  animation: fade-in 1s ease-in-out 0s both;
`;

export const Content = styled.div`
  position: relative;
  height: calc(((100vw - 5rem) / 2) * 1.5);
  overflow: hidden;

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

export const Poster = styled.img`
  height: inherit;
  width: 100%;
  transition: transform 0.5s ease-in-out;

  ${Content}:hover & {
    transform: scale(1.1);
  }
`;

export const NoPoster = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const Play = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;

  ${Content}:hover & {
    visibility: visible;
  }
`;

export const Info = styled.div`
  position: relative;
  height: 4.25rem;
  min-height: 4.25rem;
  background: var(--color-secondary);
  padding: 0.25rem 0.5rem;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.1rem;
  font-family: "Changa", sans-serif;
  text-align: center;
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;

  && svg {
    font-size: 3rem;
    color: var(--color-red);

    @media (min-width: 1440px) {
      font-size: 4rem;
    }
  }
`;

export const StyledLink = styled(Link)`
  position: absolute;
  font-size: 1.1rem;
  font-family: "Changa", sans-serif;
  font-weight: 600;
  visibility: hidden;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: var(--color-primary);
  transition: all 0.5 ease-in-out;

  &:hover {
    color: #fff;
  }

  ${Info}:hover & {
    visibility: visible;
  }
`;
