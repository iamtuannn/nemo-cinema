import React, { useEffect } from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";
import male from "../../images/people-male.svg";
import female from "../../images/people-female.svg";
import Loading from "../../components/Loading/Loading";
import { BASE_API_PERSON_URL } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActorList } from "../../redux/actions";
import { Container } from "../../styles/Container";
import { Heading } from "../../styles/Heading";
import Pagination from "../../components/Pagination/Pagination";
import LazyLoad from "react-lazyload";

export default function Actor() {
  const { actor, totalPages } = useSelector((state) => state.PeopleReducer);
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const params = useParams();
  const page = parseInt(params.id) || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActorList(page));
    window.scroll(0, 0);
  }, [dispatch, page]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Heading>Popular People</Heading>
          <S.Grid>
            {actor.map((person, index) => (
              <Link
                to={`/person/${person.name
                  .toLowerCase()
                  .split(" ")
                  .join("-")}-${person.id}`}
                target="_parent"
                key={index}
              >
                <LazyLoad height={400}>
                  <S.Card>
                    <S.Image
                      src={
                        person.profile_path === null && person.gender === 1
                          ? female
                          : person.profile_path === null
                          ? male
                          : BASE_API_PERSON_URL + person.profile_path
                      }
                      alt={person.name}
                    ></S.Image>
                    <S.Content>
                      <S.Name>{person.name}</S.Name>
                    </S.Content>
                  </S.Card>
                </LazyLoad>
              </Link>
            ))}
          </S.Grid>
          <Pagination page={page} totalPages={totalPages} />
        </Container>
      )}
    </>
  );
}

const S = {
  Grid: styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(5, minmax(0, 1fr));

    ${Breakpoints.lg} {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    ${Breakpoints.md} {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    ${Breakpoints.sm} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
  Card: styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    animation: fade-in 1s ease-in-out 0s both;
  `,
  Image: styled.img`
    max-width: 100%;
    background-color: var(--color-secondary);
    transition: all 1s ease-in-out;

    :hover{
      transform: scale(1.2);
    }
  `,
  Content: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 3rem;
    background: rgba(66, 63, 87, 0.7);
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Name: styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-transform: uppercase;
    font-weight: 600;
    font-family: "Changa", sans-serif;
    text-align: center;
    color: #fff;
  `,
};
