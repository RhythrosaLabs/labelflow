import React from "react";
import DashboardSection from "./sections/DashboardSection";
import ArtistsSection from "./sections/ArtistsSection";
import CampaignsSection from "./sections/CampaignsSection";
import AssetsSection from "./sections/AssetsSection";
import ScheduleSection from "./sections/ScheduleSection";
import ContactsSection from "./sections/ContactsSection";
import OpportunitiesSection from "./sections/OpportunitiesSection";
import NotesSection from "./sections/NotesSection";
import AIArtistSection from "./sections/AIArtistSection";
import AIBlogWriterSection from "./sections/AIBlogWriterSection";
import MerchMockupsSection from "./sections/MerchMockupsSection";
import ResourcesSection from "./sections/ResourcesSection";
import TodosSection from "./sections/TodosSection";
import SpotSpotterSection from "./sections/SpotSpotterSection";
import AnalyticsSection from "./sections/AnalyticsSection";

const SECTION_MAP = {
  dashboard: DashboardSection,
  artists: ArtistsSection,
  campaigns: CampaignsSection,
  assets: AssetsSection,
  schedule: ScheduleSection,
  contacts: ContactsSection,
  opportunities: OpportunitiesSection,
  notes: NotesSection,
  "ai-artist": AIArtistSection,
  "ai-blog-writer": AIBlogWriterSection,
  "merch-mockups": MerchMockupsSection,
  resources: ResourcesSection,
  todos: TodosSection,
  "spot-spotter": SpotSpotterSection,
  analytics: AnalyticsSection,
};

export default function MainContent({ activeSection }) {
  const SectionComponent = SECTION_MAP[activeSection];

  return (
    <main className="main-content">
      <header className="top-bar">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search artists, campaigns, assets..." />
        </div>
        <div className="header-actions">
          <button className="btn-primary"><i className="fas fa-plus"></i> Quick Add</button>
          <div className="notification-icon">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </div>
          <div className="user-profile">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="User avatar"
            />
          </div>
        </div>
      </header>

      {SectionComponent ? (
        <SectionComponent />
      ) : (
        <div className="content-section active">
          <h1 style={{ color: "#4ecdc4" }}>
            {activeSection.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <p>Coming soon...</p>
        </div>
      )}
    </main>
  );
}
