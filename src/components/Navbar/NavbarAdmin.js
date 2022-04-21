import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavAdminLink, TOKEN, USER_LOGIN } from "../../utils/config";

export default function NavbarAdmin() {
  const [showBar, setShowBar] = useState(false);
  const navigate = useNavigate();

  const renderLink = () =>
    NavAdminLink.map((el) => (
      <Dropdown.Box key={el.type}>
        <Dropdown.Block>{el.type}</Dropdown.Block>
        <Dropdown.Content className="dropdown-content">
          {el.link.map((el) => (
            <Dropdown.Link
              key={el.name}
              to={el.path}
              onClick={() => setShowBar(false)}
            >
              {el.name}
            </Dropdown.Link>
          ))}
        </Dropdown.Content>
      </Dropdown.Box>
    ));

  const navbar = () => (
    <Nav.List style={showBar ? { top: "64px" } : {}}>
      <Dropdown.Admin
        onClick={() => {
          navigate("/admin");
          setShowBar(false);
        }}
      >
        Dashboard
      </Dropdown.Admin>
      {renderLink()}
      <Dropdown.LogOut
        onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          navigate("/");
          setShowBar(false);
        }}
      >
        Log Out
      </Dropdown.LogOut>
    </Nav.List>
  );

  return (
    <Nav.Box backgroundColor={showBar ? "var(--color-nav)" : "transparent"}>
      <Nav.Wrapper>
        <Nav.LogoBar>
          <Link to="/" onClick={() => setShowBar(false)}>
            <Nav.Logo className="logo">Nemo cinema</Nav.Logo>
          </Link>
          <Nav.Icon onClick={() => setShowBar(!showBar)}>
            {showBar ? <Nav.CloseIcon /> : <Nav.BarIcon />}
          </Nav.Icon>
        </Nav.LogoBar>
        {navbar()}
      </Nav.Wrapper>
    </Nav.Box>
  );
}

const Nav = {
  Box: styled.header`
    background-color: ${(props) => props.backgroundColor};
    padding: 0.5rem 1rem;
    transition: all 0.5s ease-in-out 0.25s;

    @media (max-width: 900px) {
      padding: 0.5rem 0;
    }
  `,

  Wrapper: styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 1024px) {
      width: 95%;
    }

    @media (max-width: 900px) {
      width: 100%;
      flex-direction: column;
    }
  `,

  LogoBar: styled.div`
    @media (max-width: 900px) {
      width: 100%;
      padding: 0.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,

  Logo: styled.span`
    font-size: 2.5rem;
    font-family: "Changa", sans-serif;
    text-transform: uppercase;
    color: var(--text-light);
    font-weight: 700;

    @media (max-width: 1024px) {
      font-size: 2.2rem;
    }

    @media (max-width: 400px) {
      font-size: 1.8rem;
    }

    @media (max-width: 300px) {
      font-size: 1.6rem;
    }
  `,

  Icon: styled.div`
    font-size: 2.5rem;
    cursor: pointer;
    display: none;
    transition: all 1s ease-in-out;

    @media (max-width: 900px) {
      display: flex;
    }
  `,

  BarIcon: styled(FaBars)`
    animation: fade-in 0.5s ease-in-out;
  `,

  CloseIcon: styled(FaPlus)`
    transform: rotate(45deg);
    animation: close 0.5s ease-in-out;
  `,

  Link: styled(NavLink)`
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    margin-right: 0.5rem;
    color: var(--text-light);
    display: block;
    border-radius: 4px;
    transition: all 0.5s ease-in-out;

    :hover {
      color: var(--text-light);
      background-color: var(--rgba-blue-magenta);
    }

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border-bottom: var(--border);
      border-radius: 0;
    }
  `,

  List: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 900px) {
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
      position: absolute;
      top: -100%;
      z-index: 999;
      transition: all 1s ease-in-out;
    }
  `,
};

const Dropdown = {
  Box: styled.div`
    position: relative;
    display: inline-block;
    min-width: 100px;
    user-select: none;
    margin: 0 0.5rem;
    transition: all 0.5s ease-in-out;
    border-radius: 4px;
    background-color: var(--deep-peach);

    :hover .dropdown-content {
      display: block;
    }

    @media (max-width: 900px) {
      width: 100%;
      margin: 0;
    }
  `,
  Block: styled.div`
    padding: 0.5rem 1.25rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    border-radius: 4px;
    text-transform: capitalize;
    transition: all 0.5s ease-in-out;
    font-family: "Khand", sans-serif;
    color: var(--dark);

    :hover {
      /* background-color: var(--color-nav); */
    }

    @media (max-width: 900px) {
      display: none;
    }
  `,
  Content: styled.div`
    display: none;
    position: absolute;
    background-color: var(--deep-peach);
    box-shadow: var(--shadow-light);
    z-index: 100;
    border-radius: 8px;
    width: max-content;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 0.5rem;

    @media (max-width: 900px) {
      position: unset;
      box-shadow: none;
      border-radius: 0;
      display: block;
      background-color: var(--color-nav);
      transform: translateX(0);
      width: 100%;
      padding: 0;
    }
  `,

  Link: styled(Link)`
    display: block;
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    color: var(--dark);
    display: block;
    text-transform: capitalize;
    transition: all 0.5s ease-in-out;
    width: 100%;
    margin: 0.5rem 0;
    text-align: center;
    border-bottom: 1px solid var(--light);

    :last-child {
      border-bottom: none;
    }

    :hover {
      color: var(--dark);
    }

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      margin: 0;
      border: var(--border);
      border-radius: 0;
      text-align: left;
      color: var(--text-light);

      :hover {
        color: var(--text-light);
        background-color: var(--rgba-blue-magenta);
      }
    }
  `,

  LogOut: styled.div`
    display: block;
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    margin: 0.5rem;
    color: var(--text-light);
    display: block;
    border-radius: 4px;
    background-color: var(--color-red);
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    font-family: "Khand", sans-serif;

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
  `,

  Admin: styled.div`
    display: block;
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    margin: 0.5rem;
    color: var(--dark);
    display: block;
    border-radius: 4px;
    background-color: var(--deep-peach);
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    font-family: "Khand", sans-serif;

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border: var(--border);
      border-radius: 0;
      text-align: left;
      background-color: var(--color-nav);
      color: var(--text-light);
    }
  `,
};
