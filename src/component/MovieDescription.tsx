import React from 'react';

interface MovieDescriptionProps {
  desc: string;
  text: string;
}

const MovieDescription = ({ desc, text }: MovieDescriptionProps) => {
  return (
    <p>
      <span className="text-bolder">{desc}</span>: {text}
    </p>
  );
};

export default MovieDescription;
