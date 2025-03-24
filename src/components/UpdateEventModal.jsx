import React, { useState, useEffect } from "react";
import "../stylesheets/UpdateEventModal.css";

const UpdateEventModal = ({ event, onClose, onUpdateSubmit }) => {
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        Venue: "",
        City: "",
        posterSrc: "",
    });

    // Populate form with event data when component mounts or event changes
    useEffect(() => {
        if (event) {
            setFormData({
                id: event.id,
                title: event.title || "",
                description: event.description || "",
                Venue: event.Venue || "",
                City: event.City || "",
                posterSrc: event.posterSrc || "",
            });
        }
    }, [event]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateSubmit(formData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="formTitle">Update Event</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="Venue"
                        placeholder="Venue"
                        value={formData.Venue}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="City"
                        placeholder="City"
                        value={formData.City}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="posterSrc"
                        placeholder="Poster Image URL"
                        value={formData.posterSrc}
                        onChange={handleChange}
                        required
                    />
                    <div className="buttons">
                        <button type="submit">Update</button>
                        <button type="button" className="close-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEventModal;