import styled from 'styled-components';

const Card = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background-color: white;
`;

const CardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const CardTitle = styled.h4`
  font-size: 16px;
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const Button = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const EditButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #388e3c;
  }
`;

const VideoCard = ({ video, onDelete, onEdit }) => {
  return (
    <Card>
      <CardTitle>{video.title}</CardTitle>
      <CardDescription>{video.description}</CardDescription>
      <CardImage src={video.image} alt={video.title} />
      <div>
        <EditButton onClick={() => onEdit(video)}>Editar</EditButton>
        <Button onClick={() => onDelete(video.id)}>Borrar</Button>
      </div>
    </ Card>
  );
};

export default VideoCard;
