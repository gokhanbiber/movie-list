import React from 'react';

interface MovieCardProps {
  img: string;
}

const MovieCard = ({ img }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img alt="poster" src={img} />
    </div>
  );
};

export default MovieCard;
