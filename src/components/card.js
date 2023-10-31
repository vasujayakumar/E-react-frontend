import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/modelCard.css';

const Card = ({ src, alt, title, description, text }) => {
  return (
    <div className="card">
      <CardImage src={src} alt={alt} />
      <CardTitle title={title} />
      <CardDescription description={description} />
      <ActionButton text={text} />
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const CardImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="cardImage" />;
}

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const CardTitle = ({ title }) => {
  return <h2 className="cardTitle">{title}</h2>;
}

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const CardDescription = ({ description }) => {
  return <p className="cardDescription">{description}</p>;
}

CardDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

const ActionButton = ({ text }) => {
  return <button className="actionButton">{text}</button>;
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Card;
