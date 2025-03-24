import { useState, useEffect } from "react";
import "../stylesheets/HomePage.css";
import EventDetailsModal from "../components/EventDetailsModal";
import UpdateEventModal from "../components/UpdateEventModal";
import EventStatistics from "../components/EventStatistics.jsx";

const HomePage = ({ currentEvents, removeEvent, updateEvent }) => {
    const [page, setPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState(null);
    const [showStatistics, setShowStatistics] = useState(false);
    const [popularityCount, setPopularityCount] = useState({});
    const [mostPopularEventId, setMostPopularEventId] = useState(null);

    const ITEMS_PER_PAGE = 2;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const selectedItems = currentEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        const initialPopularity = {...popularityCount};

        currentEvents.forEach(event => {
            if (!initialPopularity[event.id]) {
                initialPopularity[event.id] = 0;
            }
        });

        if (Object.keys(initialPopularity).length !== Object.keys(popularityCount).length) {
            setPopularityCount(initialPopularity);
        }
    }, [currentEvents]);

    // Update most popular event whenever popularityCount changes
    useEffect(() => {
        if (Object.keys(popularityCount).length === 0) return;

        let maxClicks = -1; // Start at -1 to handle zero clicks
        let mostPopularId = null;

        Object.entries(popularityCount).forEach(([id, count]) => {
            // Only consider events that still exist
            const eventExists = currentEvents.some(event => String(event.id) === String(id));

            if (eventExists && count > maxClicks) {
                maxClicks = count;
                mostPopularId = id;
            }
        });

        setMostPopularEventId(mostPopularId);

        // Debug log
        console.log("Most popular event ID:", mostPopularId);
    }, [popularityCount, currentEvents]);

    const incrementPopularity = (eventId) => {
        setPopularityCount(prev => {
            const newCount = (prev[eventId] || 0) + 1;
            return { ...prev, [eventId]: newCount };
        });
    };

    const openEventDetails = (event) => {
        setSelectedEvent(event);
        setIsDetailsModalOpen(true);
        incrementPopularity(event.id);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        // Optional: Reset selected event after modal close animation completes
        setTimeout(() => setSelectedEvent(null), 300);
    };

    const handleRemoveEvent = (eventId) => {
        removeEvent(eventId);
        popularityCount[eventId] = 0;
        // Check if we need to adjust the page number (if we removed the last item on the page)
        const newTotalPages = Math.ceil((currentEvents.length - 1) / ITEMS_PER_PAGE);
        if (page > newTotalPages && page > 1) {
            setPage(newTotalPages);
        }
    };

    const openUpdateModal = (event) => {
        setEventToUpdate(event);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setTimeout(() => setEventToUpdate(null), 300);
    };

    const handleUpdateSubmit = (updatedEvent) => {
        updateEvent(updatedEvent);
        closeDetailsModal(); // Close the details modal as well
    };

    // Helper function to check if an event is the most popular
    const isEventMostPopular = (eventId) => {
        return String(eventId) === String(mostPopularEventId);
    };

    return (
        <div className="main-content">
            <div className="view-controls">
                <button
                    className={`view-button ${!showStatistics ? 'active' : ''}`}
                    onClick={() => setShowStatistics(false)}
                >
                    Event List
                </button>
                <button
                    className={`view-button ${showStatistics ? 'active' : ''}`}
                    onClick={() => setShowStatistics(true)}
                >
                    Analytics Dashboard
                </button>
            </div>

            {!showStatistics ? (
                <div className="events-section">
                    <h2 className="event-title">Event List</h2>
                    <div className="event-grid">
                        {selectedItems.map((event) => {
                            const isMostPopular = isEventMostPopular(event.id);
                            return (
                                <div
                                    key={event.id}
                                    className={`event-card ${isMostPopular ? 'most-popular' : ''}`}
                                    onClick={() => openEventDetails(event)}
                                >
                                    <img src={event.posterSrc} alt={event.title} className="event-image" />
                                    <h3 className="event-title">{event.title}</h3>

                                    {/* Debug info - remove in production */}
                                    {/* <div>ID: {event.id} / Most Popular: {String(mostPopularEventId)}</div> */}

                                    {isMostPopular && (
                                        <div className="popular-badge">Most Popular</div>
                                    )}
                                    <div className="click-count">
                                        Views: {popularityCount[event.id] || 0}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pagination-controls">
                        <button
                            className="page-button"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            aria-label="Previous page"
                        >
                            Prev
                        </button>
                        <span className="page-indicator">Page {page}</span>
                        <button
                            className="page-button"
                            onClick={() => setPage(page + 1)}
                            disabled={startIndex + ITEMS_PER_PAGE >= currentEvents.length}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <EventStatistics events={currentEvents} popularityData={popularityCount} />
            )}

            {/* Event Details Modal */}
            {isDetailsModalOpen && (
                <EventDetailsModal
                    event={selectedEvent}
                    onClose={closeDetailsModal}
                    onRemove={handleRemoveEvent}
                    onUpdate={openUpdateModal}
                    clickCount={popularityCount[selectedEvent.id] || 0}
                />
            )}

            {/* Update Event Modal */}
            {isUpdateModalOpen && (
                <UpdateEventModal
                    event={eventToUpdate}
                    onClose={closeUpdateModal}
                    onUpdateSubmit={handleUpdateSubmit}
                />
            )}
        </div>
    );
};

export default HomePage;