import { useState } from "react";
import "../stylesheets/HeaderComponent.css";

const HeaderComponent = ({ events, addEvent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        Venue: "",
        City: "",
        posterSrc: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create new event object with proper structure
        const newEvent = {
            id: events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 0,
            title: formData.title,
            description: formData.description,
            Venue: formData.Venue,
            City: formData.City,
            posterSrc: formData.posterSrc
        };

        // Call the addEvent function passed from parent
        addEvent(newEvent);

        // Reset form and close modal
        setFormData({ title: "", description: "", Venue: "", City: "", posterSrc: "" });
        setIsModalOpen(false);
    };

    return (
        <div className="header">
            <button className="addEventButton" onClick={() => setIsModalOpen(true)}>
                <span>Add Event</span>
            </button>
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="formTitle">Create New Event</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
                            <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
                            <input type="text" name="Venue" placeholder="Venue" value={formData.Venue} onChange={handleChange} required />
                            <input type="text" name="City" placeholder="City" value={formData.City} onChange={handleChange} required />
                            <input type="text" name="posterSrc" placeholder="Poster Image URL" value={formData.posterSrc} onChange={handleChange} required />
                            <div className="buttons">
                                <button type="submit">Submit</button>
                                <button type="button" className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderComponent;