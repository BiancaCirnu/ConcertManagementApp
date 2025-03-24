import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import "../stylesheets/EventStatistics.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

const EventStatistics = ({ events }) => {
    const [cityData, setCityData] = useState([]);
    const [venueData, setVenueData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);

    // Generate dynamic chart data whenever events change
    useEffect(() => {
        generateChartData(events);
    }, [events]);

    const generateChartData = (eventsData) => {
        // Generate city distribution data
        const cityCounts = {};
        eventsData.forEach(event => {
            const city = event.City;
            cityCounts[city] = (cityCounts[city] || 0) + 1;
        });

        const cityChartData = Object.keys(cityCounts).map(city => ({
            name: city,
            value: cityCounts[city]
        }));
        setCityData(cityChartData);

        // Generate venue distribution data
        const venueCounts = {};
        eventsData.forEach(event => {
            const venue = event.Venue;
            venueCounts[venue] = (venueCounts[venue] || 0) + 1;
        });

        const venueChartData = Object.keys(venueCounts).map(venue => ({
            name: venue,
            events: venueCounts[venue]
        }));
        setVenueData(venueChartData);
    };

    return (
        <div className="statistics-container">
            <h2>Event Analytics Dashboard</h2>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Events by City</h3>
                    <PieChart width={550} height={400}>
                        <Pie
                            data={cityData}
                            cx={270}
                            cy={200}
                            labelLine={true}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {cityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                    </PieChart>
                </div>

                <div className="chart-card">
                    <h3>Events by Venue</h3>
                    <BarChart
                        width={500}
                        height={300}
                        data={venueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="events" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>

            <div className="stats-summary">
                <div className="stat-box">
                    <h4>Total Events</h4>
                    <p>{events.length}</p>
                </div>
                <div className="stat-box">
                    <h4>Number of Cities</h4>
                    <p>{cityData.length}</p>
                </div>
                <div className="stat-box">
                    <h4>Number of Venues</h4>
                    <p>{venueData.length}</p>
                </div>
            </div>
        </div>
    );
};

export default EventStatistics;