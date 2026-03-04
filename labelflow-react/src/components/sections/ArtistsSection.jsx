import React, { useState } from "react";

const artistsData = [
  {
    name: "Luna Nova",
    genre: "Electronic / Pop",
    streams: "1.2M",
    growth: "+24%",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=face",
    status: "active",
  },
  {
    name: "Alex Chen",
    genre: "Hip-Hop / R&B",
    streams: "890K",
    growth: "+18%",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    status: "active",
  },
  {
    name: "The Midnight",
    genre: "Synthwave",
    streams: "650K",
    growth: "+31%",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=80&h=80&fit=crop&crop=face",
    status: "active",
  },
  {
    name: "Jade Rivers",
    genre: "Indie Folk",
    streams: "320K",
    growth: "+9%",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    status: "active",
  },
];

export default function ArtistsSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="artists" className="content-section active">
      <div className="section-header">
        <div>
          <h1>Artists</h1>
          <p>Manage your roster and track performance</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus"></i> Add Artist
        </button>
      </div>
      <div className="artists-grid">
        {artistsData.map((artist, i) => (
          <div className="artist-card" key={i}>
            <div className="artist-header">
              <img src={artist.image} alt={artist.name} className="artist-avatar" />
              <div>
                <h3>{artist.name}</h3>
                <p className="artist-genre">{artist.genre}</p>
              </div>
            </div>
            <div className="artist-stats">
              <div className="artist-stat">
                <span className="stat-value">{artist.streams}</span>
                <span className="stat-label">Monthly Streams</span>
              </div>
              <div className="artist-stat">
                <span className="stat-value trend positive">{artist.growth}</span>
                <span className="stat-label">Growth</span>
              </div>
            </div>
            <div className="artist-actions">
              <button className="btn-secondary btn-sm">View Profile</button>
              <button className="btn-primary btn-sm">Manage</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show" onClick={(e) => e.target.classList.contains("modal") && setShowModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Artist</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Artist Name</label><input type="text" className="text-input" placeholder="Artist name" /></div>
              <div className="form-group"><label>Genre</label><input type="text" className="text-input" placeholder="Genre" /></div>
              <div className="form-group"><label>Bio</label><textarea className="text-input" rows="3" placeholder="Artist bio..."></textarea></div>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Save Artist</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
