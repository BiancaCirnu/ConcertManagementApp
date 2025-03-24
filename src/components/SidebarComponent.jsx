import React from 'react';
import SidebarMenuComponent from "./SidebarMenuComponent.jsx";
import SidebarFilterComponent from "./SidebarFilterComponent.jsx";

const SidebarComponent = ({ selectedFilters, updateFilters }) => {
    return (
        <div className="sidebar-component">
            <SidebarMenuComponent className="sidebar-section" />
            <br/>
            <SidebarFilterComponent
                className="sidebar-section"
                selectedFilters={selectedFilters}
                updateFilters={updateFilters}
            />
        </div>
    );
};

export default SidebarComponent;