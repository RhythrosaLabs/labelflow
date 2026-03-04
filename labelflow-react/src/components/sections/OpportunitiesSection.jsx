import React, { useState } from "react";

const OPPORTUNITY_TYPES = ["all","sync","festivals","contests","collaborations","grants","showcases","labels","playlists","media"];
const GENRES = ["all","pop","rock","hip-hop","electronic","indie","country","jazz","classical","folk","rnb"];

const mockResults = [
  {
    title: "Netflix Sync License Submission",
    type: "Sync Licensing",
    value: "$8,000–$25,000",
    deadline: "Jan 15, 2025",
    fit: 94,
    description: "Open call for original tracks for upcoming drama series. Looking for moody electronic and indie pop.",
  },
  {
    title: "SXSW 2025 Artist Application",
    type: "Festival",
    value: "Exposure + $2,500",
    deadline: "Dec 31, 2024",
    fit: 88,
    description: "Apply for an official showcase slot at Austin's premier music festival.",
  },
  {
    title: "Spotify RADAR Program",
    type: "Playlist Placement",
    value: "Streaming growth",
    deadline: "Rolling",
    fit: 82,
    description: "Global emerging artist spotlight program for acts with under 10M monthly listeners.",
  },
  {
    title: "Music Grant – Urban Arts Foundation",
    type: "Grant",
    value: "$5,000",
    deadline: "Feb 1, 2025",
    fit: 76,
    description: "Funding for independent artists to produce their next album or EP.",
  },
];

export default function OpportunitiesSection() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [genre, setGenre] = useState("all");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setLoading(false);
      setResults(mockResults);
    }, 1400);
  };

  return (
    <section id="opportunities" className="content-section active">
      <div className="section-header">
        <div><h1>Business Opportunities</h1><p>AI-powered discovery for your roster</p></div>
      </div>
      <div className="opportunities-search-container">
        <div className="dashboard-card">
          <h3>Find Opportunities</h3>
          <div className="form-group">
            <label>What are you looking for?</label>
            <textarea className="text-input" rows="3" value={query} onChange={e => setQuery(e.target.value)} placeholder="Sync licensing, festivals, collaborations..." />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Opportunity Type</label>
              <select className="select-input" value={type} onChange={e => setType(e.target.value)}>
                {OPPORTUNITY_TYPES.map(t => <option key={t} value={t}>{t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Genre Focus</label>
              <select className="select-input" value={genre} onChange={e => setGenre(e.target.value)}>
                {GENRES.map(g => <option key={g} value={g}>{g === "all" ? "All Genres" : g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <button className="btn-primary search-btn" onClick={search}><i className="fas fa-search"></i> Find Opportunities</button>
        </div>

        {loading && (
          <div className="loading-indicator">
            <div className="loading-spinner"><i className="fas fa-spinner fa-spin"></i></div>
            <p>Discovering opportunities...</p>
          </div>
        )}

        {results === null && !loading && (
          <div className="opportunity-results">
            <div className="empty-state"><i className="fas fa-star"></i><h3>No search yet</h3><p>Enter requirements to discover relevant opportunities</p></div>
          </div>
        )}

        {results && (
          <div className="opportunity-results">
            {results.map((r, i) => (
              <div className="opportunity-card dashboard-card" key={i}>
                <div className="opp-header">
                  <div>
                    <h4>{r.title}</h4>
                    <span className="opp-type">{r.type}</span>
                  </div>
                  <div className="opp-fit">
                    <span className="score">{r.fit}%</span>
                    <span className="score-label">Fit Score</span>
                  </div>
                </div>
                <p>{r.description}</p>
                <div className="opp-meta">
                  <span><i className="fas fa-dollar-sign"></i> {r.value}</span>
                  <span><i className="fas fa-calendar"></i> Deadline: {r.deadline}</span>
                </div>
                <div className="opp-actions">
                  <button className="btn-secondary btn-sm">Save</button>
                  <button className="btn-primary btn-sm">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="opportunities-kanban">
          <div className="kanban-column"><h3>Prospecting</h3><div className="opportunity-card"><h4>Spotify Playlist Placement</h4><p>New Music Friday consideration for Luna Nova</p><span className="value">$15K potential</span></div></div>
          <div className="kanban-column"><h3>In Progress</h3><div className="opportunity-card"><h4>Festival Booking</h4><p>Summer circuit for Alex Chen</p><span className="value">$50K potential</span></div></div>
          <div className="kanban-column"><h3>Closed</h3><div className="opportunity-card"><h4>Sync License Deal</h4><p>Netflix series soundtrack placement</p><span className="value">$25K closed</span></div></div>
        </div>
      </div>
    </section>
  );
}
