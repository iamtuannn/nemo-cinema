import React from "react";
import styled from "styled-components";
import { AUTHOR, AUTHOR_URL } from "../../utils/config";

export default function Footer() {
  return (
    <S.Box>
      <S.Text>
        Built and designed by{" "}
        <S.Link href={AUTHOR_URL} target="_blank">
          {AUTHOR}
        </S.Link>
      </S.Text>
    </S.Box>
  );
}

const S = {
  Box: styled.footer`
    margin-top: auto;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-footer);
  `,

  Text: styled.span`
    text-align: center;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-family: "Khand", sans-serif;

    @media (min-width: 600px) {
      /* font-size: 1rem; */
    }
  `,

  Link: styled.a`
    color: var(--color-red);

    :hover {
      color: var(--color-red);
    }
  `,
};
