import React, { useState, useEffect } from 'react';
import Layaut from '../components/Layaut';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0px;
`

const TitlePageWrapper  = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 120px;
  font-family: "Roboto", serif;
  color: #F5F5F5;
  text-align: center;
  gap: 5px;

  & h2 {
    font-size: clamp(35px, 4vw, 48px);
    font-weight: 900;
  }

  & p {
    font-size: clamp(14px, 4vw, 18px);
    font-weight: 400;
    color: #FFFFFF;
  }

`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-self: center;
  padding: 20px 0px;
  border-radius: 10px;
  width: 100%;
  max-width: 1000px;
  gap: 20px;
  margin-bottom: 25px;


  & h3 {
    color: #FFFFFF;
    font-size: clamp(16px, 4vw, 30px);
    font-weight: 450;
    border-top: 2px solid #262626;
    border-bottom: 2px solid #262626;
    padding: 10px 0px;
  }

  @media (max-width: 768px) {
      margin: 0;
  }

`;

const ItemsFormWrapper = styled.div`
  display: flex;
  gap: 3vw;
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 450;

  & div {
    display: flex;
    flex-direction: column;
    width: clamp(335px, 50vw, 460px);
    gap: 20px;
    width: 100%;

    & div {
      flex-direction: column-reverse;
      gap: 5px;
    }
  }

  @media (max-width: 768px) {
      display: block;
    }
`;

const Input = styled.input`
  background-color: initial;
  width: 100%;
  height: 62px;
  padding: 8px;
  border: 0;
  border-bottom: 3px solid ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#A5A5A5')};
  color: #FFFFFF;
  font-size: 16px;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  height: 62px;
  padding: 8px;
  border: 0;
  border-bottom: 3px solid ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#A5A5A5')};
  background-color: initial;
  color: #FFFFFF;
  outline: none;
  font-size: clamp(16px, 4vw, 20px);

  & option {
    background-color: rgba(0, 0, 0, 0.9);
    font-size: clamp(16px, 1.5vw, 20px) !important;
  }
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse !important;

  & textarea {
    height: 100%;
  }

  @media (max-width: 768px) {
      margin-top: 20px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 0;
  border-bottom: 3px solid ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#A5A5A5')};
  background-color: initial;
  color: #FFFFFF;
  font-size: 16px;
  resize: none;
  outline: none;
`;

const ButtonWrapper = styled.div`
  flex-direction: row !important;
  justify-content: right;
  gap: 20px !important;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 10px;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  display: flex;
  border: 2px solid #F5F5F5;
  width: 100%;
  max-width: 120px;
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

const LabelTitleInput = styled.label`
  font-weight: 600;
  color: ${({ $isFocused }) => ($isFocused ? '#6BD1FF' : '#FFFFFF')};
  transform: ${({ $isFocused }) => ($isFocused ? 'scale(1.05) translate(2%, -1%)' : 'none')};
`;

const NuevoVideo = () => {

  const urlCategories = 'http://localhost:5000/categories';
  const [focusedField, setFocusedField] = useState('');
  const [video, setVideo] = useState({
    title: '',
    categoryId: '',
    url: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener las categorías de la API
    fetch(urlCategories)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        // setLoading(false);
      })
      .catch(error => console.error('Error al optener categorias:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la solicitud POST
    fetch('http://localhost:5000/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Video guardado:', data);
        alert("Video creado con exito :)")
        // Limpiar el formulario
        setVideo({
          title: '',
          categoryId: '',
          url: '',
          description: ''
        });
      })
      .catch((error) => {
        console.error('Error al guardar el video:', error);
      });
  };

  const handleClear = () => {
    setVideo({
      title: '',
      categoryId: '',
      url: '',
      description: ''
    });
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField('');

  return (
    <Layaut>
      <Wrapper>
        <TitlePageWrapper>
          <h2>NUEVO VIDEO</h2>
          <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TERJETA DE VIDEO</p>
        </TitlePageWrapper>
        <FormWrapper>
          <h3>Crear Tarjeta</h3>
          <form onSubmit={handleSubmit}>
            <ItemsFormWrapper>
              <div>
                <div>
                  <Input
                    type="text"
                    name="title"
                    value={video.title}
                    onChange={handleChange}
                    placeholder="Título del video"
                    onFocus={() => handleFocus('title')}
                    onBlur={handleBlur}
                    $isFocused={focusedField === 'title'}
                    required
                  />
                  <LabelTitleInput $isFocused={focusedField === 'title'} htmlFor="title">
                      Título
                  </LabelTitleInput>
                </div>
                <div>
                  <Select
                    name="categoryId"
                    value={video.categoryId}
                    onChange={handleChange}
                    onFocus={() => handleFocus('categoryId')}
                    onBlur={handleBlur}
                    $isFocused={focusedField === 'categoryId'}
                    required
                  >
                    <option value="" disabled>Seleccionar categoría</option>
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
                <div>
                  <Input
                    type="url"
                    name="url"
                    value={video.url}
                    onChange={handleChange}
                    placeholder="URL del video"
                    onFocus={() => handleFocus('url')}
                    onBlur={handleBlur}
                    $isFocused={focusedField === 'url'}
                    required
                  />
                  <LabelTitleInput $isFocused={focusedField === 'url'} htmlFor="url">
                    Video URL
                  </LabelTitleInput>
                </div>
              </div>
              <TextAreaWrapper>
                <ButtonWrapper>
                  <Button type="submit">GUARDAR</Button>
                  <Button type="button" onClick={handleClear}>LIMPIAR</Button>
                </ButtonWrapper>
                <Textarea
                  name="description"
                  value={video.description}
                  onChange={handleChange}
                  placeholder="Descripción del video"
                  onFocus={() => handleFocus('description')}
                  onBlur={handleBlur}
                  $isFocused={focusedField === 'description'}
                  required
                />
                <LabelTitleInput $isFocused={focusedField === 'description'} htmlFor="description">
                  Descripción
                </LabelTitleInput>
              </TextAreaWrapper>
            </ItemsFormWrapper>
          </form>
        </FormWrapper>
      </Wrapper>
    </Layaut>
  );
};

export default NuevoVideo;