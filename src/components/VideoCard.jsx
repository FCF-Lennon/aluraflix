import styled from 'styled-components';
import iconoEditar from '../assets/iconos/editar.png';
import iconoEliminar from '../assets/iconos/eliminar.png';

const Card = styled.div`
  background: rgba(0, 0, 0, 0.9);
  flex: 0 0 calc(100% / 3 - 13px); 
  max-width: calc(100% / 3);
  max-height: 325px;
  height: 100%;
  box-shadow: inset 0px 0px 17px 5px ${({ $color }) => $color};
  border: 4px solid ${({ $color }) => $color};
  border-radius: 10px;
  transition: box-shadow 0.3s ease, border 0.3s ease;

  @media (max-width: 1024px) {
    flex: 0 0 calc(100% / 2 - 9px);
    max-width: calc(100% / 2);
  }

  @media (max-width: 572px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const CardIframe = styled.iframe`
  width: 100%;
  height: 100%;
  max-height: 260px;
  object-fit: cover;
  aspect-ratio: 16/9;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 4px solid ${({ $color }) => $color};
`;

const CardTitle = styled.h4`
  font-size: 16px;
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 60px;
  min-height: 51px;
  display: flex;
  justify-content: center; 
  align-items: center;
  border-radius: 0px 0px 10px 10px;
  gap: clamp(20px, 4vw, 70px); 
  transition: gap 0.3s ease;

  @media (max-width: 572px) {
    gap: 15vw;
  }
`;

const Button = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: fit-content;
  height: 100%; 
  max-height: 28px;
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 800;
  color: #F5F5F5;
  gap: 1vw;
  outline: none;
  cursor: pointer;
  border: 0;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const IconButton = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-width: 25px;
  max-height: 28px;
`;

const VideoCard = ({ video, onDelete, onEdit, $color }) => {
  return (
    <Card $color={$color}>
      <CardIframe 
        src={video.url} 
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
        frameBorder="0"
        aria-description={video.description}
        $color={$color}
      />
      <ButtonWrapper $color={$color}>
        <Button onClick={() => onEdit(video)}>
          <IconButton src={iconoEditar} alt="Icono de editar" />
          EDITAR
        </Button>
        <Button onClick={() => onDelete(video.id)}>
          <IconButton src={iconoEliminar} alt="Icono de eliminar" />
          BORRAR
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

export default VideoCard;

