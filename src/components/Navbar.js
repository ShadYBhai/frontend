import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <sapn className="crud">CRUD</sapn>
      <ul className="list">
        <li className="settings">Settings</li>
        <li className="account">Account</li>
      </ul>
      {/* <span className="crud">CRUD APP</span> */}
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 76px;
  padding-top: 1rem;
  background: #ffffff;
  /* box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2); */
  border-radius: 0px;
  background: rgba(0, 0, 0, 0.1);

  .list {
    position: relative;
    bottom: 1rem;
    margin-right: 4rem;
  }

  .settings {
    margin-left: 15rem;
  }

  .crud {
    display: flex;
    position: relative;
    top: 1rem;
    font-family: "Manrope";
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    margin-left: 4rem;
    text-transform: capitalize;
    font-weight: 800;
  }

  ul {
    display: flex;
    list-style: none;
    width: 30%;
    position: relative;
    justify-content: center;
    margin: auto;
    justify-content: space-between;
  }
  li {
    position: relative;
  }
`;
