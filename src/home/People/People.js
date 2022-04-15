import React, { useEffect } from "react";
import styled from "styled-components";
import male from "../../images/people-male.svg";
import female from "../../images/people-female.svg";
import { BASE_API_PERSON_URL, NEMO } from "../../utils/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActorList } from "../../redux/actions";
import { Heading, Container, GridCardV1 } from "../../styles/Styles";
import Pagination from "../../components/Pagination/Pagination";
import LazyLoad from "react-lazyload";
import { LoadingPageV2 } from "../../components/Loading/Loading";

export default function People() {
  document.title = `People Popular - ${NEMO}`;

  const { actor, totalPages } = useSelector((state) => state.PeopleReducer);
   const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const page = parseInt(params.id) || 1;

  useEffect(() => {
    dispatch(getActorList(page, navigate));
    window.scroll(0, 0);
  }, [dispatch, page, navigate]);

  return (
    <Container>
      <Heading>Popular People</Heading>
      {isLoading ? (
        <LoadingPageV2 grid />
      ) : (
        <>
          <GridCardV1 grid>
            {actor.map((person, index) => (
              <Link
                to={`/person/${person.name
                  .toLowerCase()
                  .split(" ")
                  .join("-")}-${person.id}`}
                target="_parent"
                key={index}
                id="person"
              >
                <S.Card>
                  <LazyLoad height={400} style={{ height: "100%" }}>
                    <S.Box>
                      <S.Image
                        src={
                          person.profile_path === null && person.gender === 1
                            ? female
                            : person.profile_path === null
                            ? male
                            : `${BASE_API_PERSON_URL}${person.profile_path}`
                        }
                        alt={person.name}
                      />
                      <S.Content
                        id="person-name"
                        display={person.profile_path === null ? "block" : ""}
                      >
                        <S.Name>{person.name}</S.Name>
                      </S.Content>
                    </S.Box>
                  </LazyLoad>
                </S.Card>
              </Link>
            ))}
          </GridCardV1>
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </Container>
  );
}

const S = {
  Card: styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    background-color: var(--rgba-blue-magenta);
    height: calc(((100vw - 5rem) / 2) * 1.5);

    @media (min-width: 768px) {
      height: calc(((100vw - 6rem) / 3) * 1.5);
    }

    @media (min-width: 1024px) {
      height: calc(((100vw - 7rem) / 4) * 1.5);
    }

    @media (min-width: 1440px) {
      height: calc(((1440px - 8rem) / 5) * 1.5);
    }

    :hover #person-name {
      display: block;
    }
  `,
  Box: styled.div`
    animation: fade-in 1.5s ease-in-out 0s both;
    height: 100%;
  `,
  Image: styled.img`
    width: 100%;
    transition: all 0.5s ease-in-out;
    height: inherit;

    :hover {
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
    display: ${(props) => (props.display ? props.display : "none")};

    @media (max-width: 1024px) {
      display: block;
    }
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
