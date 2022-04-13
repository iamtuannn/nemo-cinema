import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";
import { getPersonAction } from "../../redux/actions";
import { BASE_API_PERSON_URL } from "../../utils/config";
import male from "../../images/people-male.svg";
import female from "../../images/people-female.svg";
import moment from "moment";
import { Container, SectionTitle } from "../../styles/Styles";
import { MovieCardV3 } from "../../components/MovieCard/V3/MovieCardV3";
import Loading from "../../components/Loading/Loading";

export default function Person() {
  const { person, acting } = useSelector((state) => state.PeopleReducer);
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPersonAction(params.id, params.nameUrl, navigate));
  }, [dispatch, params.id, params.nameUrl, navigate, person.name]);

  const renderBio = () => (
    <Bio.Box>
      <Bio.Name>{person.name}</Bio.Name>
      <SectionTitle w="133px" mbZero>
        Biography
      </SectionTitle>
      <Bio.Content>
        {person.biography === "" ? (
          <Bio.Text>We don't have a biography for {person.name}</Bio.Text>
        ) : (
          person.biography
            .split("\n\n")
            .map((text, index) => <Bio.Text key={index}>{text}</Bio.Text>)
        )}
      </Bio.Content>
    </Bio.Box>
  );

  const renderInfo = () => (
    <>
      <Info.Name>{person.name}</Info.Name>
      <SectionTitle w="174px" mbZero>
        Personal Info
      </SectionTitle>
      {person.gender === 0 &&
      person.birthday == null &&
      person.also_known_as?.length === 0 &&
      person.place_of_birth == null ? (
        <Info.Text>
          We don't have a personal information for {person.name}
        </Info.Text>
      ) : (
        <>
          {person.gender === 0 ? (
            <></>
          ) : (
            <Info.Box>
              <Info.Text>
                <Info.Strong>Gender</Info.Strong>
              </Info.Text>
              <Info.Text> {person.gender === 1 ? "Female" : "Male"}</Info.Text>
            </Info.Box>
          )}
          {person.birthday == null ? (
            <></>
          ) : (
            <Info.Box>
              <Info.Text>
                <Info.Strong>Birthday</Info.Strong>
              </Info.Text>
              <Info.Text>
                {moment(person.birthday).format("ll")} (
                {moment(Date.now()).format("YYYY") -
                  moment(person.birthday).format("YYYY")}{" "}
                years old)
              </Info.Text>
            </Info.Box>
          )}
          {person.place_of_birth == null ? (
            <></>
          ) : (
            <Info.Box>
              <Info.Text>
                <Info.Strong>Place of Birthday</Info.Strong>
              </Info.Text>
              <Info.Text>{person.place_of_birth}</Info.Text>
            </Info.Box>
          )}
          {person.also_known_as?.length === 0 ? (
            <></>
          ) : (
            <Info.AKA>
              <Info.Text>
                <Info.Strong>Also Known As</Info.Strong>
              </Info.Text>
              {person.also_known_as.map((item, index) => (
                <Info.Text key={index}>{item}</Info.Text>
              ))}
            </Info.AKA>
          )}
        </>
      )}
    </>
  );

  const renderLatestMovie = () => (
    <>
      <SectionTitle w="171px">Latest Movies</SectionTitle>
      {acting
        .filter(
          (movie) =>
            movie.release_date !== "" &&
            moment(movie.release_date).format("YYYY") < 2023
        )
        .sort((a, b) =>
          Date.parse(a.release_date) < Date.parse(b.release_date) ? 1 : -1
        )
        .slice(0, 5)
        .map((movie, i) => (
          <MovieCardV3 movie={movie} key={i} display={"block"} />
        ))}
    </>
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <S.Gird>
            <div>
              <S.Flex>
                <S.Image
                  src={
                    person.profile_path === null && person.gender === 1
                      ? female
                      : person.profile_path === null
                      ? male
                      : BASE_API_PERSON_URL + person.profile_path
                  }
                  alt={person.name}
                />
              </S.Flex>
              {renderInfo()}
            </div>
            <div>
              {renderBio()}
              {renderLatestMovie()}
            </div>
          </S.Gird>
        </Container>
      )}
    </>
  );
}

const S = {
  Gird: styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;

    ${Breakpoints.lg} {
      grid-template-columns: 200px 1fr;
      gap: 1rem;
    }

    ${Breakpoints.sm} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  `,
  Flex: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  `,
  Image: styled.img`
    width: 300px;
    height: 450px;
    border-radius: 0.5rem;
    background-color: var(--rgba-blue-magenta);

    ${Breakpoints.lg} {
      width: 200px;
      height: 300px;
    }

    ${Breakpoints.sm} {
      width: 50vw;
      min-height: 75vw;
    }
  `,
};

const Bio = {
  Box: styled.div``,

  Name: styled.h2`
    font-size: 2.9rem;
    font-weight: 600;
    font-family: Khand;
    display: block;
    color: var(--text-light);

    ${Breakpoints.sm} {
      display: none;
    }
  `,
  Content: styled.div`
    height: 312px;
    overscroll-behavior-y: auto;
    overflow-y: auto;

    ${Breakpoints.lg} {
      height: 152px;
      overscroll-behavior-y: auto;
      overflow-y: auto;
    }

    ${Breakpoints.sm} {
      height: auto;
    }
  `,

  Text: styled.p``,
};

const Info = {
  Name: styled.h2`
    font-size: 2.9rem;
    font-weight: 600;
    font-family: Khand;
    display: none;
    color: var(--text-light);
    text-align: center;

    ${Breakpoints.sm} {
      display: block;
    }
  `,
  Box: styled.div`
    margin-bottom: 1rem;
  `,
  Text: styled.p``,
  Strong: styled.strong``,
  AKA: styled.div`
    display: block;

    ${Breakpoints.sm} {
      display: none;
    }
  `,
};
