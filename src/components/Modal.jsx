import React, { useState } from 'react';
import styled from 'styled-components';
import iconClosed from '../assets/iconos/cerrar.png';

const ModalWrapper = styled.div`
  background-color: rgba(3, 18, 47, 0.76);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0px 20px;
`;

const ModalContent = styled.dialog`
  background: #03122F;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid #6BD1FF;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  gap: 35px;

  & form {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 15px;
  }

  & div {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ModalTitle = styled.h2`
  color: #2271D1;
  font-family: "Roboto", serif;
  font-size: clamp(12px, 2.5vw, 32px);
  font-weight: 900;
  width: 100%;
`;

const LabelTitleInput = styled.label`
  display: inline-flex;
  font-size: clamp(12px, 2.5vw, 20px);
  font-weight: 350;
  color: ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#FFFFFF')};
  transform: ${({ $isFocused }) => ($isFocused ? 'scale(1.05) translate(2%, -1%)' : 'none')};
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  background: initial;
  outline: none;
  color: #FFFFFF;
  border: 0;
  border-bottom: 3px solid ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#A5A5A5')};
  height: 62px;
  font-size: clamp(12px, 2.5vw, 20px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  background: initial;
  outline: none;
  color: #FFFFFF;
  border: 0;
  border-bottom: 3px solid ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#A5A5A5')};
  height: 62px;
  font-size: clamp(12px, 2.5vw, 20px);
  cursor: pointer;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  & option {
    background-color: #03122F;
    color: #FFFFFF;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  background: initial;
  outline: none;
  color: #FFFFFF;
  border: 0;
  border-bottom: 3px solid ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#A5A5A5')};
  font-size: clamp(12px, 2.5vw, 20px);
  resize: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ButtonWrapper = styled.div`
  flex-direction: row !important;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  display: flex;
  border: 2px solid #F5F5F5;
  width: 100%;
  max-width: 180px;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: clamp(12px, 2.5vw, 20px);
  font-weight: 600;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    border-color: #2271d1;
    box-shadow: inset 0 0 12px 4px #2271d1;
    color: #2271d1;
  }
`;

const ClosedButton = styled(Button)`
  background-color: initial;
  position: absolute;
  top: 5px;
  right: 10px;
  width: fit-content;
  padding: 0;
  border: 0;

  &:hover {
    background-color: transparent;
    border-color: none;
    box-shadow: none;
    color: none;
  }

  & img {
    width: 40px;
  }
`;

const Modal = ({ video, onClose, onSave, categories }) => {
  const [updatedVideo, setUpdatedVideo] = useState({ ...video });
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {

    const { name, value } = e.target;
    setUpdatedVideo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value; // Solo el ID
    setUpdatedVideo((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
    }));
  };

  const handleSubmit = () => {
    // Crear una copia del objeto 
    const { category, ...videoToSave } = updatedVideo;
    onSave(videoToSave); // Guardar solo los datos correctos
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField('');

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalTitle>EDITAR VIDEO</ModalTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Campo Título */}
          <div>
            <Input
              type="text"
              name="title"
              value={updatedVideo.title}
              onChange={handleChange}
              placeholder="Ingrese el título"
              onFocus={() => handleFocus('title')}
              onBlur={handleBlur}
              $isFocused={focusedField === 'title'}
              required
            />
            <LabelTitleInput $isFocused={focusedField === 'title'} htmlFor="title">
              Título
            </LabelTitleInput>
          </div>

          {/* Campo Categoría */}
          <div>
            <Select
              name="categoryId"
              value={updatedVideo.categoryId}
              onChange={handleCategoryChange}
              onFocus={() => handleFocus('categoryId')}
              onBlur={handleBlur}
              $isFocused={focusedField === 'categoryid'}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
            <LabelTitleInput
              $isFocused={focusedField === 'categoryId'}
              htmlFor="categoryId"
            >
              Categoría
            </LabelTitleInput>
          </div>

          {/* Campo URL */}
          <div>
            <Input
              type="url"
              name="url"
              value={updatedVideo.url}
              onChange={handleChange}
              placeholder="Ingrese el enlace del video"
              onFocus={() => handleFocus('url')}
              onBlur={handleBlur}
              $isFocused={focusedField === 'url'}
              required
            />
            <LabelTitleInput $isFocused={focusedField === 'url'} htmlFor="url">
              Video URL
            </LabelTitleInput>
          </div>

          {/* Campo Descripción */}
          <div>
            <Textarea
              name="description"
              value={updatedVideo.description}
              onChange={handleChange}
              placeholder="¿De qué se trata el video?"
              onFocus={() => handleFocus('description')}
              onBlur={handleBlur}
              $isFocused={focusedField === 'description'}
              required
            />
            <LabelTitleInput $isFocused={focusedField === 'description'} htmlFor="description">
              Descripción
            </LabelTitleInput>
          </div>

          <ButtonWrapper>
            <Button type="button" onClick={handleSubmit}>Guardar</Button>
            <Button type="button" onClick={onClose}>Cerrar</Button>
          </ButtonWrapper>
        </form>
        <ClosedButton onClick={onClose}>
          <img src={iconClosed} alt="Cerrar" />
        </ClosedButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
