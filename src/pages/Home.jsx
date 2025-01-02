import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorias from '../components/Categorias';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import Modal from '../components/Modal';
import GlobalStyles from '../components/GlobalStyles';

const VideosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Home = () => {
  const [videos, setVideos] = useState({ frontend: [], backend: [], innovacion: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado de carga

  const url = "http://localhost:5000/videos";

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

  if (loading) return <div>Cargando videos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <GlobalStyles />
      <Header />
      <Banner />
      <Categorias>
        {Object.keys(videos).map((category) => (
          <div key={category}>
            <h2>{category.toUpperCase()}</h2>
            <VideosContainer>
              {videos[category].map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </VideosContainer>
          </div>
        ))}
      </Categorias>
      {showModal && (
        <Modal
          video={selectedVideo}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
