import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import BlockRevealer from '../components/BlockRevealer/BlockRevealer';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventData.sort((a, b) => a.date.toDate() - b.date.toDate()));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="events events--loading">
        <BlockRevealer
          direction="lr"
          bgcolor="#7f40f1"
          delay={300}
        >
          <h2>Loading Events...</h2>
        </BlockRevealer>
      </div>
    );
  }

  return (
    <div className="events">
      <BlockRevealer
        direction="tb"
        bgcolor="#ff784a"
        delay={200}
      >
        <h1 className="events__title">Upcoming Events</h1>
        <p className="events__subtitle">Join us in celebrating Matatu culture</p>
      </BlockRevealer>

      <div className="events__timeline">
        {events.map((event, index) => (
          <BlockRevealer
            key={event.id}
            direction={index % 2 === 0 ? 'lr' : 'rl'}
            bgcolor="#7f40f1"
            delay={300 + index * 100}
            className="events__item-wrapper"
          >
            <div 
              className={`events__item ${selectedEvent?.id === event.id ? 'is-selected' : ''}`}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="events__item-date">
                {formatDate(event.date.toDate())}
              </div>
              <div className="events__item-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="events__item-details">
                  <span>
                    <i className="icon-location"></i>
                    {event.location}
                  </span>
                  <span>
                    <i className="icon-time"></i>
                    {event.time}
                  </span>
                </div>
              </div>
              {event.imageUrl && (
                <div className="events__item-image">
                  <img src={event.imageUrl} alt={event.title} />
                </div>
              )}
            </div>
          </BlockRevealer>
        ))}
      </div>

      {selectedEvent && (
        <div 
          className="events__modal"
          onClick={() => setSelectedEvent(null)}
        >
          <BlockRevealer
            direction="tb"
            bgcolor="#000"
            delay={0}
            className="events__modal-content"
            onClick={e => e.stopPropagation()}
          >
            {selectedEvent.imageUrl && (
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title} 
                className="events__modal-image"
              />
            )}
            <div className="events__modal-info">
              <h2>{selectedEvent.title}</h2>
              <div className="events__modal-meta">
                <p className="events__modal-date">
                  {formatDate(selectedEvent.date.toDate())}
                </p>
                <p className="events__modal-location">
                  {selectedEvent.location}
                </p>
                <p className="events__modal-time">
                  {selectedEvent.time}
                </p>
              </div>
              <div className="events__modal-description">
                {selectedEvent.fullDescription || selectedEvent.description}
              </div>
              {selectedEvent.ticketUrl && (
                <a 
                  href={selectedEvent.ticketUrl}
                  className="events__modal-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Tickets
                </a>
              )}
            </div>
            <button 
              className="events__modal-close"
              onClick={() => setSelectedEvent(null)}
            >
              ×
            </button>
          </BlockRevealer>
        </div>
      )}
    </div>
  );
};

export default Events;
