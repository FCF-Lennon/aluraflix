import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import logoSrc from "/Logo.svg";
import home_activo from "../assets/iconos/home_activo.png";
import home_inactivo from "../assets/iconos/home_inactivo.png";
import newvideo_activo from "../assets/iconos/newvideo_activo.png";
import newvideo_inactivo from "../assets/iconos/newvideo_inactivo.png";

const Logo = styled.img`
  width: 100%;
  max-width: 168px;
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  width: clamp(210px, 40vw, 385px);

  @media (max-width: 1024px) {
    padding-left: 10px;
  }

  @media (max-width: 430px) {
    padding-left: 0px;
    max-width: 287px;
  }
`;

const NavLink = styled(RouterNavLink)`
  text-align: center;
  flex: 1;
  text-decoration: none;
  transition: all 0.3s ease;

  &.active h2 {
    background-color: rgba(0, 0, 0, 0.9);
    border-color: #2271d1;
    box-shadow: inset 0 0 12px 4px #2271d1;
    color: #2271d1;
  }

  &:hover {
    border-color: #ffffff;
    color: #ffffff;
  }

  & h2 {
    color: #f5f5f5;
    border: 2px solid #f5f5f5;
    font-size: clamp(14px, 2.5vw, 20px);
    font-weight: 900;
    line-height: 24px;
    white-space: nowrap;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  @media (max-width: 430px) {
    /* transition: all 0.3s ease; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    gap: 5px;
    background: ${({ $isActive }) => ($isActive ? "rgba(34, 113, 209, 0.24)" : "none")};
    border: ${({ $isActive }) => ($isActive ? "2px solid #2271D1" : "0px")};
    border-radius: 50px;
    padding: 5px;
    flex: ${({ $isActive }) => ($isActive ? "1" : "0")};

    &.active h2 {
      background: transparent;
      box-shadow: none;
    }

    & h2 {
      display: ${({ $isActive }) => ($isActive ? "block" : "none")};
      border: 0;
      border-radius: 0;
      color: ${({ $isActive }) => ($isActive ? "#2271D1" : "#F5F5F5")};
      margin: 0;
      padding: 0;
    }

    &:hover {
      border-color: #2271d1;
      color: #2271d1;
    }
  }
`;

const IconoLink = styled.img`
  display: none;

  @media (max-width: 430px) {
    display: block;
    width: ${({ $isActive }) => ($isActive ? "32px" : "40px")};
    height: ${({ $isActive }) => ($isActive ? "32px" : "40px")};
    transition: all 0.3s ease;
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background-color: #262626;
  color: white;
  border-bottom: 4px solid #2271d1;
  box-shadow: 0 5px 29px 0 rgba(34, 113, 209, 0.7);
  height: 60px;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    background: rgba(0, 0, 0, 0.9);
    height: 125px;
    padding: 0px 20px;
  }

  @media (max-width: 430px) {
    height: 100px;
    border-bottom: 0;
    border-top: 4px solid #2271d1;
    padding: 20px 23px;
    justify-content: center;
    order: 2;

    ${Logo} {
      display: none;
    }

    ${Nav} {
      width: 100%;
      transition: all 0.3s ease;
    }
  }
`;

const Header = () => {
  const location = useLocation(); // Obtenemos la ruta actual
  const [buttonActive, setButtonActive] = useState(location.pathname);

  // Actualizamos el estado cuando cambia la ruta, pero SOLO en resoluciones de máximo 430px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setButtonActive(location.pathname);
      }
    };

    // Escuchamos los cambios de tamaño
    window.addEventListener("resize", handleResize);
    handleResize(); // Aseguramos que se ejecute al cargar

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  return (
    <HeaderWrapper>
      <Logo src={logoSrc} alt="Logo" />
      <Nav>
        <NavLink
          to="/"
          $isActive={buttonActive === "/"}
        >
          <h2>HOME</h2>
          <IconoLink
            src={buttonActive === "/" ? home_activo : home_inactivo}
            alt="Icono de volver al home"
            $isActive={buttonActive === "/"}
          />
        </NavLink>
        <NavLink
          to="/nuevo-video"
          $isActive={buttonActive === "/nuevo-video"}
        >
          <h2>NUEVO VIDEO</h2>
          <IconoLink
            src={buttonActive === "/nuevo-video" ? newvideo_activo : newvideo_inactivo}
            alt="Icono de ir a nuevo video"
            $isActive={buttonActive === "/nuevo-video"}
          />
        </NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
