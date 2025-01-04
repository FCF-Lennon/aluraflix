import styled from 'styled-components';
import logoSrc from '/Logo.svg';

const FooterWrapper = styled.footer`
  background: rgba(0, 0, 0, 0.9);
  border-top: 4px solid #2271D1;
  box-shadow: 0 5px 29px 0 rgba(34, 113, 209, 0.7);
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 430px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 168px;
  height: 40px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Logo src={logoSrc} alt="Logo" />
    </FooterWrapper>
  );
};

export default Footer;
