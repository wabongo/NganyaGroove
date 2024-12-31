import { useState } from 'react';
import BlockRevealer from '../BlockRevealer/BlockRevealer';
import './MatatuCard.css';

const MatatuCard = ({ 
  matatu, 
  onVote, 
  onRate 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BlockRevealer
      direction="tb"
      bgcolor="#ff784a"
      className="matatu-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="matatu-card__image-container">
        <img 
          src={matatu.imageUrl} 
          alt={matatu.name} 
          className="matatu-card__image" 
        />
        <div className={`matatu-card__overlay ${isHovered ? 'matatu-card__overlay--visible' : ''}`}>
          <h3 className="matatu-card__title">{matatu.name}</h3>
          <p className="matatu-card__route">Route: {matatu.route}</p>
          <div className="matatu-card__stats">
            <div className="matatu-card__stat">
              <span className="matatu-card__stat-label">Votes</span>
              <span className="matatu-card__stat-value">{matatu.votes}</span>
            </div>
            <div className="matatu-card__stat">
              <span className="matatu-card__stat-label">Rating</span>
              <span className="matatu-card__stat-value">{matatu.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="matatu-card__actions">
            <button 
              className="matatu-card__button matatu-card__button--vote"
              onClick={() => onVote(matatu.id)}
            >
              Vote
            </button>
            <button 
              className="matatu-card__button matatu-card__button--rate"
              onClick={() => onRate(matatu.id)}
            >
              Rate
            </button>
          </div>
        </div>
      </div>
    </BlockRevealer>
  );
};

export default MatatuCard;
