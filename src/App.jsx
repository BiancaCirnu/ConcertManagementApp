import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HeaderComponent from './components/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
import FooterComponent from './components/FooterComponent'
import HomePage from './pages/HomePage.jsx'
import BrowsePage from './pages/BrowsePage.jsx'
import events from "./assets/inMemoryData.js";
import './App.css'

function App() {
    const [eventList, setEventList] = useState(events);
    const [currentEvents, setCurrentEvents] = useState(events);
    const [selectedFilters, setSelectedFilters] = useState({ City: [], Venue: [] });

    // Add a new event
    const addEvent = (newEvent) => {
        setEventList(prevEvents => [...prevEvents, newEvent]);
        // Apply current filters to the updated list
        applyFilters(selectedFilters, [...eventList, newEvent]);
    };

    // Remove an event
    const removeEvent = (eventId) => {
        const updatedEventList = eventList.filter(event => event.id !== eventId);
        setEventList(updatedEventList);

        // Apply current filters to the updated list
        applyFilters(selectedFilters, updatedEventList);
    };

    // Update an event
    const updateEvent = (updatedEvent) => {
        // Update the main event list
        const updatedEventList = eventList.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setEventList(updatedEventList);

        // Apply current filters to the updated list
        applyFilters(selectedFilters, updatedEventList);
    };

    // Helper function to apply filters
    const applyFilters = (filters, events) => {
        if (filters.City.length === 0 && filters.Venue.length === 0) {
            setCurrentEvents(events);
        } else {
            const filtered = events.filter(event => {
                const cityMatch = filters.City.length === 0 ||
                    filters.City.includes(event.City);

                const venueMatch = filters.Venue.length === 0 ||
                    filters.Venue.includes(event.Venue);

                return cityMatch && venueMatch;
            });

            setCurrentEvents(filtered);
        }
    };

    const updateFilters = (newFilters) => {
        setSelectedFilters(newFilters);
        applyFilters(newFilters, eventList);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <HeaderComponent events={eventList} addEvent={addEvent} />
                <SidebarComponent
                    selectedFilters={selectedFilters}
                    updateFilters={updateFilters}
                />
                <div className="pages">
                    <Routes>
                        <Route path="/" element={
                            <HomePage
                                currentEvents={currentEvents}
                                removeEvent={removeEvent}
                                updateEvent={updateEvent}
                            />
                        } />
                        <Route path="/browse" element={<BrowsePage />} />
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}

export default App;