import React from 'react';
import homeLogo from '../assets/homeLogo.svg';
import searchLogo from '../assets/searchLogo.svg';
import {Link, useLocation} from 'react-router-dom';
import "../stylesheets/SidebarComponent.css"
const SidebarMenuComponent = () => {
    const pageTitle = useLocation().pathname === "/" ? "Home" : "Search Event"
    return (
        <div className="sidebar-menu">
            <h3 className="sidebar-section-title">{pageTitle}</h3>
            <nav className="navbar">
                <Link to="/" className="menuOption">
                    <img className="logo" src={homeLogo} alt="" />
                    <span className="menuName">Home</span>
                </Link>

                <Link to="/browse" className="menuOption" >
                    <img className="logo" src={searchLogo} alt=""/>
                    <span className="menuName">Search Event</span>
                </Link>
            </nav>
        </div>
)
    ;
};

export default SidebarMenuComponent;