import styled from 'styled-components';

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  background-color: #f4f4f4;
`;

const CategoryTitle = styled.h2`
  text-align: center;
  color: #333;
`;

const Categories = ({ children }) => {
  return (
    <CategoriesWrapper>
      {children}
    </CategoriesWrapper>
  );
};

export default Categories;
