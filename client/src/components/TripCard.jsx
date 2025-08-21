import { useState } from 'react';

function TripCard({ trip, onAddTag }) {
  const description = trip.description || '';
  const truncated = description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const [copied, setCopied] = useState(false);

  const handleTagClick = (tag) => {
    if (onAddTag) onAddTag(tag);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trip.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy url:', error);
    }
  };

  return (
    <div className="travel-card">
      <div className="card-main-image">
        <img src={trip.photos?.[0]} alt={trip.title} />
      </div>

      <div className="card-content">
        <a href={trip.url} target="_blank" rel="noopener noreferrer" className="card-title">
          {trip.title}
        </a>

        <p className="card-description">{truncated}</p>

        <div className="card-actions">
          <a href={trip.url} className="read-more" target="_blank" rel="noopener noreferrer">
            อ่านต่อ
          </a>
          <button type="button" className="copy-button" onClick={handleCopy} aria-label="คัดลอกลิงก์">
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกลิงก์'}
          </button>
        </div>

        <div className="card-categories">
          <span className="category-label">หมวด:</span>
          {trip.tags?.map((tag, index) => (
            <button
              key={index}
              type="button"
              className="category-tag"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="card-thumbnails">
          {trip.photos?.slice(1, 4).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${trip.title} ${index + 1}`}
              className="thumbnail-image"
            />
          ))}
        </div>

        <a href={trip.url} className="link-icon" target="_blank" rel="noopener noreferrer">
          🔗
        </a>
      </div>
    </div>
  );
}

export default TripCard;
