import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-left: 32px;
  padding-right: 32px;
  font-size: 24px;
  border-bottom: 1px solid #2f3336;
`;

const Nav = styled.nav``;

const Logo = styled.div``;

const RightContent = styled.div``;

const NavList = styled.ul`
  display: flex;
  list-style: none;
`;

const NavListItem = styled.li`
  margin: 0 12px;
`;

const ItemLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;

  :hover {
    color: #fff;
  }

  &.active {
    color: #fff;
  }
`;

function Navbar(): ReactElement {
  return (
    <Header>
      <Logo>🧑🏻‍💻 Job interview</Logo>
      <Nav>
        <NavList>
          <NavListItem>
            <ItemLink to="/" exact>
              Home
            </ItemLink>
          </NavListItem>
          <NavListItem>
            <ItemLink to="/questions" exact>
              Questions
            </ItemLink>
          </NavListItem>
        </NavList>
      </Nav>
      <RightContent>👩‍🏭</RightContent>
    </Header>
  );
}

export default Navbar;
