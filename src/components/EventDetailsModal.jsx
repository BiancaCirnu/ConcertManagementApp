import React from "react";
import "../stylesheets/EventDetailsModal.css";

const EventDetailsModal = ({ event, onClose, onRemove, onUpdate }) => {
    if (!event) return null;

    const handleRemoveEvent = () => {
        if (window.confirm(`Are you sure you want to remove "${event.title}"?`)) {
            onRemove(event.id);
            onClose();
        }
    };

    const handleUpdateEvent = () => {
        onUpdate(event);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="event-modal" onClick={(e) => e.stopPropagation()}>
                <div className="event-modal-header">
                    <h2>{event.title}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="event-modal-content">
                    <div className="event-modal-image-container">
                        <img
                            src={event.posterSrc}
                            alt={event.title}
                            className="event-modal-image"
                        />
                    </div>

                    <div className="event-modal-details">
                        <div className="event-modal-location">
                            <h3>Location</h3>
                            <p><strong>City:</strong> {event.City}</p>
                            <p><strong>Venue:</strong> {event.Venue}</p>
                        </div>

                        <div className="event-modal-description">
                            <h3>Description</h3>
                            <p>{event.description}</p>
                        </div>
                    </div>
                </div>

                <div className="event-modal-footer">
                    <button
                        className="event-action-button update-button"
                        onClick={handleUpdateEvent}
                    >
                        Update Event
                    </button>
                    <button
                        className="event-action-button remove-button"
                        onClick={handleRemoveEvent}
                    >
                        Remove Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;