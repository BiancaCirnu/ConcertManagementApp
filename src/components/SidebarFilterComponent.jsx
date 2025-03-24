import { useState, useEffect } from "react";
import filters from "../assets/inMemoryFilters.js";

const SidebarFilterComponent = ({ selectedFilters, updateFilters }) => {
    const [expanded, setExpanded] = useState({});
    const [selectedOptions, setSelectedOptions] = useState(selectedFilters || { City: [], Venue: [] });

    // Sync with parent component when props change
    useEffect(() => {
        if (selectedFilters) {
            setSelectedOptions(selectedFilters);
        }
    }, [selectedFilters]);

    const openCategory = (category) => {
        setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    const selectOption = (category, option) => {
        const updatedOptions = {...selectedOptions};

        // Check if option is already selected
        if (updatedOptions[category].includes(option)) {
            // Remove the option
            updatedOptions[category] = updatedOptions[category].filter(item => item !== option);
        } else {
            // Add the option
            updatedOptions[category] = [...updatedOptions[category], option];
        }

        // Update local state
        setSelectedOptions(updatedOptions);

        // Notify parent component about filter change
        if (updateFilters) {
            updateFilters(updatedOptions);
        }
    };

    const showClearFilters = selectedOptions.City?.length > 0 || selectedOptions.Venue?.length > 0;

    const clearFilters = () => {
        const emptyFilters = { City: [], Venue: [] };
        setSelectedOptions(emptyFilters);

        if (updateFilters) {
            updateFilters(emptyFilters);
        }
    };

    return (
        <div className="sidebar-filter">
            <h3 className="sidebar-section-title">Filter</h3>
            <div className="filtering-options">
                {filters.map(({ category, options }) => (
                    <div key={category}>
                        <button className="filterCategory" onClick={() => openCategory(category)}>
                            <span className="filterOption">{category}</span>
                        </button>
                        {expanded[category] && (
                            <div className="filterOptions">
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        className={`filterOption ${selectedOptions[category]?.includes(option) ? "selected" : ""}`}
                                        onClick={() => selectOption(category, option)}
                                    >
                                        <b> &gt; </b> {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {showClearFilters && (
                    <button
                        className="clearFilterButton"
                        onClick={clearFilters}
                    >
                        <span>Clear Filters</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SidebarFilterComponent;