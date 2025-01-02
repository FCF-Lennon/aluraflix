import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoSrc from '/Logo.svg';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  &:hover {
    color: #f44336;  // Cambio de color en hover
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo src={logoSrc} alt="Logo" />
      <Nav>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/nuevo-video">Nuevo Video</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
