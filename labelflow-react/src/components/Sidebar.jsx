import React from "react";
import "./Sidebar.css";

const navItems = [
  { section: "dashboard", icon: "fa-chart-line", label: "Dashboard" },
  { section: "artists", icon: "fa-users", label: "Artists" },
  { section: "campaigns", icon: "fa-bullhorn", label: "Campaigns" },
  { section: "assets", icon: "fa-folder-open", label: "Assets" },
  { section: "schedule", icon: "fa-calendar-alt", label: "Schedule" },
  { section: "contacts", icon: "fa-address-book", label: "Contacts" },
  { section: "opportunities", icon: "fa-star", label: "Opportunities" },
  { section: "notes", icon: "fa-sticky-note", label: "Notes" },
  { section: "ai-artist", icon: "fa-magic", label: "AI Artist" },
  { section: "ai-blog-writer", icon: "fa-feather-alt", label: "AI Blog Writer" },
  { section: "merch-mockups", icon: "fa-tshirt", label: "Merch Mockups" },
  { section: "resources", icon: "fa-book", label: "Resources" },
  { section: "todos", icon: "fa-tasks", label: "To-Do" },
  { section: "spot-spotter", icon: "fa-map-marker-alt", label: "Street Marketing" },
  { section: "analytics", icon: "fa-chart-bar", label: "Analytics" }
];

export default function Sidebar({ activeSection, onNavigate }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-music"></i>
          <span>LabelFlow</span>
        </div>
      </div>
      <div className="nav-menu">
        {navItems.map(item => (
          <div
            key={item.section}
            className={`nav-item${activeSection === item.section ? " active" : ""}`}
            onClick={() => onNavigate(item.section)}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="ai-assistant">
        <div className="ai-button">
          <i className="fas fa-robot"></i>
          <span>AI Assistant</span>
        </div>
      </div>
    </nav>
  );
}
