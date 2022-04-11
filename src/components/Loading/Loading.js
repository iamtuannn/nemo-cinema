import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

export default function Loading() {
  return (
    <S.Box>
      <S.BoxLoading>
        <S.Square />
      </S.BoxLoading>
    </S.Box>
  );
}

const spin = keyframes`
    50%,100% {
        transform: rotate(360deg);
    }
`;

const fill = keyframes`
    25%,50% {
        transform: scaleY(0);
    }
    100% {
        transform: scaleY(1);
    }
`;

const S = {
  Box: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    transform: translateY(-13%);
  `,
  BoxLoading: styled.div`
    transform: translateY(-13%);
    width: 5em;
    height: 5em;
  `,
  Square: styled.div`
    position: relative;
    width: 5em;
    height: 5em;
    border: 3px solid rgb(202, 66, 66);
    overflow: hidden;
    animation: ${spin} 3s ease infinite;

    ::before {
      content: "";
      position: absolute;
      top: -3px;
      left: -3px;
      width: 5em;
      height: 5em;
      background-color: rgb(202 66 66 / 80%);
      transform-origin: center bottom;
      transform: scaleY(1);
      animation: ${fill} 3s linear infinite;
    }
  `,
};
