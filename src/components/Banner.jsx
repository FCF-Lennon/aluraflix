import { useEffect, useState } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const BannerItem = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
        console.log("Datos obtenidos: ", data); // Verifico si se optienen datos
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
        <div>No hay videos destacados</div> // Muestro un mensaje si no hay videos
      ) : (
        videosDestacados.map((video) => (
          <BannerItem key={video.id} $image={video.image}>
            <h1>FRONT END</h1>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <iframe
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={true}
              frameBorder={"0"}
              // color={color}
              aria-description={video.description}
            />
          </BannerItem>
        ))
      )}
    </BannerWrapper>
  );
};

export default Banner;
