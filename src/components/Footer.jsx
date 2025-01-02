import styled from 'styled-components';
import logoSrc from '/Logo.svg';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
`;

const Logo = styled.img`
  height: 30px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Logo src={logoSrc} alt="Logo" />
    </FooterWrapper>
  );
};

export default Footer;
