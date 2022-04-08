import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../utils/config";

export default function NavbarHome() {
  const [showBar, setShowBar] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("USER_LOGIN")) || "";

  function isLogin() {
    if (Object.keys(user).length === 0) {
      return (
        <Dropdown.Box>
          <Dropdown.Block>Login / Register</Dropdown.Block>
          <Dropdown.Content className="dropdown-content">
            <Dropdown.Link to="/login" target="_parent">
              Login
            </Dropdown.Link>
            <Dropdown.Link to="/register" target="_parent">
              Register
            </Dropdown.Link>
          </Dropdown.Content>
        </Dropdown.Box>
      );
    }

    return (
      <Dropdown.Box>
        <Dropdown.User>Hi, {user.hoTen}</Dropdown.User>
        <Dropdown.Content className="dropdown-content">
          <Dropdown.Link to="/profile" target="_parent">
            Profile
          </Dropdown.Link>
          <Dropdown.Link to="/history" target="_parent">
            Booking History
          </Dropdown.Link>
          {user.maLoaiNguoiDung === "QuanTri" ? (
            <Dropdown.Link to="/admin">Dashboard</Dropdown.Link>
          ) : (
            <></>
          )}
          <Dropdown.LogOut
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              navigate("/");
            }}
          >
            Log Out
          </Dropdown.LogOut>
        </Dropdown.Content>
      </Dropdown.Box>
    );
  }

  const navbar = (display) => (
    <Nav.List display={display}>
      <Nav.Link to="/now-showing" target="_parent">
        Now Showing
      </Nav.Link>
      <Nav.Link to="/coming-soon" target="_parent">
        Coming Soon
      </Nav.Link>
      <Nav.Link to="/news" target="_parent">
        News
      </Nav.Link>
      <Nav.Link to="/actor" target="_parent">
        Actor
      </Nav.Link>
      {isLogin()}
    </Nav.List>
  );

  return (
    <Nav.Box>
      <Nav.Wrapper>
        <Nav.LogoBar color={showBar ? "var(--color-red)" : "transparent"}>
          <Link to="/" target="_parent">
            <Nav.Logo>Nemo cinema</Nav.Logo>
          </Link>
          <Nav.Icon onClick={() => setShowBar(!showBar)}>
            {showBar ? <Nav.CloseIcon /> : <Nav.BarIcon />}
          </Nav.Icon>
        </Nav.LogoBar>
        {showBar ? navbar("block") : navbar("none")}
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
      border-bottom: 1px solid ${(props) => props.color};
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
    transition: all 1s ease-in-out;
    font-family: "Khand", sans-serif;

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
    animation: fade-in 1s ease-in-out;

    @media (max-width: 900px) {
      display: ${(props) => props.display};
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
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

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      background-color: var(--color-magenta);
      border: none;
      border-bottom: var(--border);
      border-radius: 0;
    }
  `,
  Content: styled.div`
    display: none;
    position: absolute;
    background-color: var(--color-magenta);
    box-shadow: var(--shadow-dark);
    z-index: 100;
    width: 100%;
    border-radius: 8px;

    @media (max-width: 900px) {
      position: unset;
      box-shadow: none;
      border-radius: 0;
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

    :hover {
      color: var(--text-light);
      border: var(--border);
    }

    @media (max-width: 900px) {
      padding: 1rem 1.5rem;
      width: 100%;
      margin: 0;
      border-bottom: var(--border);
      border-radius: 0;
      background-color: var(--color-nav);

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
    margin: 0.5rem;
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
};
