import React, { useState } from "react";

const assetsData = [
  { name: "Luna Nova - Summer Vibes.wav", type: "audio", size: "45 MB", date: "Dec 12, 2024" },
  { name: "Alex Chen - Cover Art.png", type: "image", size: "2.3 MB", date: "Dec 10, 2024" },
  { name: "Summer Vibes - Music Video.mp4", type: "video", size: "1.2 GB", date: "Dec 8, 2024" },
  { name: "Contract Template - Artist.pdf", type: "document", size: "340 KB", date: "Dec 5, 2024" },
  { name: "Label Logo Pack.zip", type: "image", size: "8.7 MB", date: "Dec 1, 2024" },
  { name: "Midnight Dreams - Mix.mp3", type: "audio", size: "12 MB", date: "Nov 28, 2024" },
];

const iconMap = { audio: "fa-music", image: "fa-image", video: "fa-video", document: "fa-file-alt" };

export default function AssetsSection() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? assetsData : assetsData.filter(a => a.type === filter);

  return (
    <section id="assets" className="content-section active">
      <div className="section-header">
        <div>
          <h1>Asset Management</h1>
          <p>Organize and distribute your creative files</p>
        </div>
        <div className="header-actions-group">
          <button className="btn-secondary"><i className="fas fa-download"></i> Download All</button>
          <button className="btn-primary"><i className="fas fa-upload"></i> Upload Assets</button>
        </div>
      </div>
      <div className="asset-filters">
        {["all", "audio", "image", "video", "document"].map(f => (
          <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="assets-grid">
        {filtered.map((asset, i) => (
          <div className="asset-card" key={i}>
            <div className="asset-icon"><i className={`fas ${iconMap[asset.type]}`}></i></div>
            <div className="asset-info">
              <h4>{asset.name}</h4>
              <p>{asset.size} · {asset.date}</p>
            </div>
            <div className="asset-actions">
              <button className="btn-icon" title="Download"><i className="fas fa-download"></i></button>
              <button className="btn-icon" title="Share"><i className="fas fa-share"></i></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
