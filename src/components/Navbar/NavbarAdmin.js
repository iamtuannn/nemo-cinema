import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../utils/config";

export default function NavbarAdmin() {
  const [showBar, setShowBar] = useState(false);
  const navigate = useNavigate();

  const type = ["movie", "news", "user"];
  const hideBar = () => setShowBar(false);

  const manageLink = (type) => (
    <Dropdown.Box key={type}>
      <Dropdown.Block>{type}</Dropdown.Block>
      <Dropdown.Content className="dropdown-content">
        <Dropdown.Link to={`/admin/${type}`} onClick={hideBar}>
          {`manage ${type}`}
        </Dropdown.Link>
        <Dropdown.Link to={`/admin/${type}/add`} onClick={hideBar}>
          {`add ${type}`}
        </Dropdown.Link>
      </Dropdown.Content>
    </Dropdown.Box>
  );

  const navbar = () => (
    <Nav.List style={showBar ? { top: "70px" } : {}}>
      {type.map((type) => manageLink(type))}
      <Dropdown.LogOut
        onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          navigate("/");
          setShowBar(false)
        }}
      >
        Log Out
      </Dropdown.LogOut>
    </Nav.List>
  );

  return (
    <Nav.Box>
      <Nav.Wrapper>
        <Nav.LogoBar>
          <Link to="/" onClick={hideBar} >
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
  Box: styled.div`
    background-color: var(--color-nav);
    padding: 0.5rem 1rem;

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
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,

  Logo: styled.span`
    font-size: 2.5rem;
    font-family: "Khand", sans-serif;
    text-transform: uppercase;
    color: var(--color-red);
    font-weight: 700;
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
      background-color: var(--color-magenta);
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
    background-color: var(--color-magenta);
    border-radius: 4px;

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
    text-transform: uppercase;
    transition: all 0.5s ease-in-out;
    font-family: "Khand", sans-serif;

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
    background-color: var(--color-red);
    box-shadow: var(--shadow-dark);
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
    color: var(--text-light);
    display: block;
    border-radius: 4px;
    text-transform: capitalize;
    transition: all 0.5s ease-in-out;
    width: 100%;
    margin: 0.5rem 0;
    text-align: center;

    :hover {
      color: var(--color-red);
      background-color: var(--text-light);
    }

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      margin: 0;
      border: var(--border);
      border-radius: 0;
      text-align: left;

      :hover {
        color: var(--text-light);
        background-color: var(--color-magenta);
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
};
