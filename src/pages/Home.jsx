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
    scrollbar-color: ${({ $color }) => $color}, rgba(34, 113, 209, 0.17); 
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

  const videosUrl = "http://localhost:5000/videos";
  const categoriesUrl = "http://localhost:5000/categories";
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado de carga

  const getCategoryColor = (category) => {
    switch (category.title) {
      case "Frontend":
        return "#6BD1FF";
      case "Backend":
        return "#00C86F";
      case "Innovación y Gestion":
        return "#FFBA05";
      default:
        return "Grey"; // Color por defecto
    }
  };

  useEffect(() => {
    // Realizar ambas peticiones simultáneamente
    Promise.all([
      fetch(videosUrl).then((res) => res.json()),
      fetch(categoriesUrl).then((res) => res.json())
    ])
      .then(([videosData, categoriesData]) => {
        if (Array.isArray(videosData) && Array.isArray(categoriesData)) {
          const videosMapped = videosData.map((video) => ({
            ...video,
            category: categoriesData.find((cat) => cat.id === video.categoryId)
          }));
          setVideos(videosMapped);
          setCategories(categoriesData);
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
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
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
    // Actualizar el video localmente
    setVideos((prevVideos) => {
      return prevVideos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video
      );
    });

    // Hacer la solicitud PUT para actualizar el video en el db.json
    fetch(`${videosUrl}/${updatedVideo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Video actualizado en db.json:", data);
        alert("Video actualizado con exito :)")
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error al actualizar el video:", error);
        setError("Error al actualizar el video");
      });
  };

  // if (loading) return <div>Cargando videos...</div> 
  if (error) return <div>Error: {error}</div>;

  return (

    <Layaut>
      <Banner />
      <Categorias>
        {categories.map((category) => {
          const color = getCategoryColor(category); 
          const categoryVideos = videos.filter((video) => video.categoryId === category.id);
          return (
            <ItemsCategorias key={category.id}>
              <TitleWrapper>
                <TitleCategory $color={color}>{category.title}</TitleCategory>
              </TitleWrapper>
              <VideosContainer $color={color}>
                {categoryVideos.map((video) => (
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
          categories={categories}
        />
      )}
    </Layaut>
  );
};

export default Home;