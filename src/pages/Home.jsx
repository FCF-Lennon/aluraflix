import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Banner from '../components/Banner';
import Categorias from '../components/Categorias';
import VideoCard from '../components/VideoCard';
import Modal from '../components/Modal';
import Layaut from '../components/Layaut';

const VideosContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 20px;
  padding: 40px 0px;

  &::-webkit-scrollbar {
    height: 10px;
    scrollbar-color: ${({ $color }) => $color}, rgba(34, 113, 209, 0.17); // revizar luego ojo
  }

  &::-webkit-scrollbar-track {
    background: rgba(34, 113, 209, 0.17);
    border-radius: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ $color }) => $color};
    height: 5px;
    border-radius: 10px;
  }
`;

const ItemsCategorias = styled.div`
  width: 100%;
  max-width: 1360px;
`

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 572px) {
    justify-content: left;
  }
`

const TitleCategory = styled.h2`
  background: ${({ $color }) => $color};
  color: #F5F5F5;
  width: 100%;
  max-width: clamp(250px, 50vw, 432px);
  height: 70px;
  font-size: clamp(16px, 4vw, 32px);
  font-weight: 800;
  white-space: nowrap;
  text-align: center; 
  align-content: center;
  border-radius: 15px;
  padding: 4px;
`

const Home = () => {

  const url = "http://localhost:5000/videos";
  const [videos, setVideos] = useState({ frontend: [], backend: [], innovacion: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado de carga
  const getCategoryColor = (category) => {
    switch (category.toUpperCase()) {
      case "FRONTEND":
        return "#6BD1FF";
      case "BACKEND":
        return "#00C86F";
      case "INNOVACION Y GESTION":
        return "#FFBA05";
      default:
        return ""; // Color por defecto
    }
  };

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los videos");
        return res.json();
      })
      .then((data) => {
        if (data && typeof data === "object") {
          setVideos(data);
        } else {
          throw new Error("La estructura de los datos no es válida.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setVideos((prevVideos) => {
      const updatedVideos = { ...prevVideos };
      for (const category in updatedVideos) {
        updatedVideos[category] = updatedVideos[category].filter((video) => video.id !== id);
      }
      return updatedVideos;
    });
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const handleSave = (updatedVideo) => {
    setVideos((prevVideos) => {
      const updatedVideos = { ...prevVideos };
      for (const category in updatedVideos) {
        const index = updatedVideos[category].findIndex((video) => video.id === updatedVideo.id);
        if (index !== -1) {
          updatedVideos[category][index] = updatedVideo;
        }
      }
      return updatedVideos;
    });
    handleCloseModal();
  };

  // if (loading) return <div>Cargando videos...</div>
  if (error) return <div>Error: {error}</div>;

  return (

    <Layaut>
      <Banner />
      <Categorias>
        {Object.keys(videos).map((category) => {
          const color = getCategoryColor(category); // Calcula el color una vez
          return (
            <ItemsCategorias key={category}>
              <TitleWrapper>
                <TitleCategory $color={color}>{category.toUpperCase()}</TitleCategory>
              </TitleWrapper>
              <VideosContainer $color={color}>
                {videos[category].map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    $color={color}
                  />
                ))}
              </VideosContainer>
            </ItemsCategorias>
          );
        })}
      </Categorias>
      {showModal && (
        <Modal
          video={selectedVideo}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </Layaut>
  );
};

export default Home;
