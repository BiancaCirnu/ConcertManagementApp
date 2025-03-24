export function createEvent(title, description, venue, city, photoSource, lastId) {
    return {
        id: lastId + 1,
        title,
        description,
        venue,
        city,
        photo: photoSource
    };
}

export function addEvent(events, title, description, venue, city, photoSource) {
    const lastId = events.length > 0 ? events[events.length - 1].id : 0; // handle empty events array
    const newEvent = createEvent(title, description, venue, city, photoSource, lastId);
    return [...events, newEvent];  // Return new array with the new event added
}

export function removeEvent(eventId, events) {
    return events.filter(event => event.id !== eventId);  // Return a new filtered array
}

export function updateEvent(events, id, newTitle, newDescription, newVenue, newCity, newPhotoSource) {
    return events.map(event =>
        event.id === id
            ? {
                ...event,
                title: newTitle,
                description: newDescription,
                venue: newVenue,
                city: newCity,
                photo: newPhotoSource
            }
            : event
    );
}
