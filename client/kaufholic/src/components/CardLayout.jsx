import React from 'react';
import './CardLayout.css'; // Link to the CSS file for styling

const Card = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

const CardLayout = () => {
  const cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'];

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card key={index} title={card} />
      ))}
    </div>
  );
};

export default CardLayout;
