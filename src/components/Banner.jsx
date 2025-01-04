import { useEffect, useState } from 'react';
import styled from 'styled-components';
import iconoError404 from '../assets/iconos/error-404.png'

const BannerWrapper = styled.div`
  background-image: linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.56)), url('src/assets/imagenes/banner.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center; 
  width: 100%;
  height: 100%;
  padding: clamp(50px, 50vh, 100px) 20px;
  font-family: "Roboto", serif;

  @media (max-width: 430px) {
    display: none;
  }
`;

const ItemsErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const ErrorImage = styled.img`
  width: 100%;
  max-width: 100px;
  height: auto;
  filter: hue-rotate(200deg) saturate(1.5);
`

const ErrorText = styled.p`
  color: #F5F5F5;
  font-size: clamp(16px, 4vw, 46px);
  font-weight: 400;
`

const BannerItems = styled.div`
  width: 100%;
  max-width: 1360px;
  height: fit-content;
  color: #F5F5F5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row-reverse;
  gap: 50px;
  height: clamp(569px, 50vh ,832px);

  @media (max-width: 836px) {
    flex-wrap: wrap-reverse;
    height:100%;
  }
`;

const ItemVideo = styled.figure`
  width: 100%;
  max-width: 650px;
  height: 100%;
  align-content: center;
  
  & iframe {
    aspect-ratio: 16 / 9;
    border-radius: 15px; 
    border: 4px solid #6BD1FF;
    box-shadow: inset 0px 0px 17px 8px #6BD1FF;
    object-fit: contain;
    width: 100%;
  }
`;

const ItemDescription = styled.figcaption`
  color: #F5F5F5;
  margin: 0;
  box-sizing: border-box;
  display: inline;
  flex-direction: column;
  width: 100%;
  max-width: 660px;
  height: auto;
  flex-grow: 1;

    & h1 {
        background-color: #6BD1FF;
        display: inline-flex;
        border-radius: 15px;
        font-weight: 800;
        font-size: 48px;
        padding: 15px;
        margin: 0;
    }

    & h2 {
        font-size: 46px;
        font-weight: 400;
        margin: 0;
        margin-top: 40px;
    }

    & p {
        margin: 0;
        margin-top: 10px;
        font-size: 18px;
        font-weight: 300;
    }

    @media (max-width: 1024px) {
        & h1 {
            font-size: 32px;
            width: 282px;
            justify-content: center;
        }
    }

`;

const Banner = () => {
  const url = "http://localhost:5000/videosDestacados";
  const [videosDestacados, setVideosDestacados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para verificar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener los videos destacados');
        }
        return res.json();
      })
      .then((data) => {
        setVideosDestacados(data); // Asigno los datos directamente
        setLoading(false); // Actualizo el estado de carga
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message); // Si hay un error, actualizo el estado
        setLoading(false); // Termina la carga incluso si hay error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Muestro mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestro el error si ocurre
  }

  return (
    <BannerWrapper>
      {videosDestacados.length === 0 ? (
        <ItemsErrorWrapper>
          <ErrorImage src={iconoError404} alt='Icono de error 404' />
          <ErrorText>No hay videos destados :(</ErrorText>
        </ItemsErrorWrapper>
      ) : (
        videosDestacados.map((video) => (
          <BannerItems key={video.id} $image={video.image}>
            <ItemVideo>
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
                frameBorder={"0"}
                // color={color}
                aria-description={video.description}
              />
            </ItemVideo>
            <ItemDescription>
              <h1>FRONT END</h1>
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </ItemDescription>
          </BannerItems>
        ))
      )}
    </BannerWrapper>
  );
};

export default Banner;