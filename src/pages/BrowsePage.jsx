import React from 'react';
import SearchBarComponent from "../components/SearchBarComponent.jsx";
import FoundItemsComponent from "../components/FoundItemsComponent.jsx";

const BrowsePage = () => {
    return (
        <div>
            <span>Browse</span>
            <SearchBarComponent />
            <FoundItemsComponent />
        </div>
    );
};

export default BrowsePage;