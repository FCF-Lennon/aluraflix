import styled from 'styled-components';
import { useState } from 'react';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #388e3c;
  }
`;

const Modal = ({ video, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: video.title,
    description: video.description,
    url: video.url
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!formData.title || !formData.description) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    onSave({ ...video, ...formData });
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalTitle>Editar Video</ModalTitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título del video"
          />
          <Input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL del video"
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            rows="4"
          />
          <Button type="submit">Guardar Cambios</Button>
        </form>
        <Button onClick={onClose}>Cerrar</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
