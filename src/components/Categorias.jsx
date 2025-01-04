import styled from 'styled-components';

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 100px 20px;
  font-family: "Roboto", serif;
  overflow-y: hidden;
`;

const Categories = ({ children }) => {
  return (
    <CategoriesWrapper>
      {children}
    </CategoriesWrapper>
  );
};

export default Categories;
