import styled from "styled-components";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pagination({ page, totalPages }) {
  const navigate = useNavigate();

  return (
    <S.Box>
      <p>
        Page <span style={{ color: "var(--color-red)" }}>{page}</span>
        {` of ${totalPages}`}
      </p>
      <S.Flex>
        {page > 1 ? (
          <S.Button onClick={() => navigate(`/people/${page - 1}`)}>
            <FaChevronCircleLeft />
          </S.Button>
        ) : null}
        {page < totalPages ? (
          <S.Button onClick={() => navigate(`/people/${page + 1}`)}>
            <FaChevronCircleRight />
          </S.Button>
        ) : null}
      </S.Flex>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;
    font-family: "Khand", sans-serif;
  `,
  Flex: styled.div`
    display: flex;
  `,
  Button: styled.div`
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;

    && svg {
      height: 2rem;
      width: 2rem;
      margin-left: 0.5rem;
    }
  `,
};
