import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavBarLink, TOKEN, USER_LOGIN } from "../../utils/config";

export default function NavbarHome() {
  const [showBar, setShowBar] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("USER_LOGIN")) || "";

  function renderLink({ navLink = false, path, name }) {
    if (navLink) {
      return (
        <Nav.Link to={path} key={name} onClick={() => setShowBar(false)}>
          {name}
        </Nav.Link>
      );
    }

    return (
      <Dropdown.Link to={path} onClick={() => setShowBar(false)}>
        {name}
      </Dropdown.Link>
    );
  }

  function isLogin() {
    if (Object.keys(user).length === 0) {
      return (
        <Dropdown.Box>
          <Dropdown.Block>Login / Register</Dropdown.Block>
          <Dropdown.Content className="dropdown-content">
            {renderLink({ path: "/login", name: "Log In" })}
            {renderLink({ path: "/signup", name: "Sign Up" })}
          </Dropdown.Content>
        </Dropdown.Box>
      );
    }

    return (
      <Dropdown.Box>
        <Dropdown.User>Hi, {user.hoTen}</Dropdown.User>
        <Dropdown.Content className="dropdown-content">
          {renderLink({ path: "/profile", name: "Profile" })}
          {renderLink({ path: "/history", name: "Booking History" })}
          {user.maLoaiNguoiDung === "QuanTri" ? (
            <>{renderLink({ path: "/admin", name: "Dashboard" })}</>
          ) : (
            <></>
          )}
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
        </Dropdown.Content>
      </Dropdown.Box>
    );
  }

  return (
    <Nav.Box>
      <Nav.Wrapper>
        <Nav.LogoBar>
          <Link to="/" onClick={() => setShowBar(false)}>
            <Nav.Logo className="logo">Nemo cinema</Nav.Logo>
          </Link>
          <Nav.Icon onClick={() => setShowBar(!showBar)}>
            {showBar ? <Nav.CloseIcon /> : <Nav.BarIcon />}
          </Nav.Icon>
        </Nav.LogoBar>
        <Nav.List style={showBar ? { top: "65px" } : {}}>
          {NavBarLink.map((link) => renderLink(link))}
          {isLogin()}
        </Nav.List>
      </Nav.Wrapper>
    </Nav.Box>
  );
}

const Nav = {
  Box: styled.header`
    background-color: var(--color-nav);
    padding: 0.5rem 1rem;

    @media (max-width: 900px) {
      padding: 0.5rem 0;
    }
  `,

  Wrapper: styled.div`
    max-width: 1440px;
    width: 90%;
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

  LogoLinK: styled(Link)``,

  Logo: styled.span`
    font-size: 2.5rem;
    font-family: "Changa", sans-serif;
    text-transform: uppercase;
    color: var(--color-red);
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
    margin-right: 0.25rem;
    color: var(--text-light);
    display: block;
    border-radius: 4px;
    transition: all 1s ease-in-out;
    font-family: "Khand", sans-serif;

    :hover {
      color: var(--text-light);
      background-color: var(--rgba-blue-magenta);
    }

    @media (max-width: 1024px) {
      padding: 0.75rem;
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
      display: block;
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
      transition: all 1s ease-in-out 0s;
      position: absolute;
      top: -100%;
      background-color: var(--color-nav);
      z-index: 999;
    }
  `,
};

const Dropdown = {
  Box: styled.div`
    position: relative;
    display: inline-block;
    min-width: 130px;
    user-select: none;
    transition: all 0.5s ease-in-out;

    :hover .dropdown-content {
      display: block;
    }

    @media (max-width: 900px) {
      width: 100%;
    }
  `,
  Block: styled.div`
    background-color: var(--color-red);
    padding: 0.5rem 1.25rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    display: flex;
    align-items: center;
    border: var(--border);
    cursor: pointer;
    width: 100%;
    border-radius: 4px;
    font-family: "Khand", sans-serif;

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      background-color: var(--rgba-blue-magenta);
      border: none;
      border-bottom: var(--border);
      border-radius: 0;
    }
  `,
  Content: styled.div`
    display: none;
    position: absolute;
    background-color: var(--rgba-blue-magenta);
    box-shadow: var(--shadow-dark);
    z-index: 100;
    border-radius: 8px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 0.5rem;
    width: max-content;

    @media (max-width: 900px) {
      position: unset;
      box-shadow: none;
      border-radius: 0;
      transform: translateX(0);
      width: 100%;
      padding: 0;
    }
  `,
  User: styled.span`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    background-color: var(--color-red);
    padding: 0.5rem 1.25rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    border: var(--border);
    cursor: pointer;
    width: 100%;
    border-radius: 4px;
    font-family: "Khand", sans-serif;

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      border-radius: 0;
    }
  `,

  Link: styled(Link)`
    display: block;
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    margin: 0.5rem;
    color: var(--text-light);
    display: block;
    border-radius: 4px;
    font-family: "Khand", sans-serif;
    width: 100%;
    margin: 0.5rem 0;
    text-align: center;

    :hover {
      color: var(--text-light);
      border: 1px solid var(--light);
    }

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border-bottom: var(--border);
      border-radius: 0;
      background-color: var(--color-nav);
      text-align: left;

      :hover {
        border: 0;
        border-bottom: var(--border);
      }
    }
  `,

  LogOut: styled.div`
    display: block;
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem 1.25rem;
    color: var(--text-light);
    display: block;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin: 0.5rem 0;
    text-align: center;
    font-family: "Khand", sans-serif;

    :hover {
      color: var(--text-light);
      border: 1px solid var(--color-red);
    }

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border-bottom: var(--border);
      border-radius: 0;

      :hover {
        border: 0;
        border-bottom: var(--border);
      }
    }
  `,
};
