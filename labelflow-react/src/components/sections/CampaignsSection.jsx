import React from "react";

const campaigns = [
  {
    title: "Summer Vibes EP Launch",
    artist: "Luna Nova",
    status: "active",
    budget: "$5,000",
    spent: "$2,800",
    progress: 65,
    reach: "125K",
    engagement: "8.2%",
    streams: "45K",
  },
  {
    title: "Electronic Dreams Tour",
    artist: "Alex Chen",
    status: "planning",
    budget: "$15,000",
    spent: "$3,200",
    progress: 25,
    reach: "89K",
    engagement: "6.8%",
    streams: "234",
  },
  {
    title: "Midnight Waves Single",
    artist: "The Midnight",
    status: "active",
    budget: "$3,500",
    spent: "$1,100",
    progress: 40,
    reach: "67K",
    engagement: "9.1%",
    streams: "28K",
  },
];

export default function CampaignsSection() {
  return (
    <section id="campaigns" className="content-section active">
      <div className="section-header">
        <div>
          <h1>Marketing Campaigns</h1>
          <p>Plan, execute, and measure impact</p>
        </div>
        <button className="btn-primary"><i className="fas fa-plus"></i> New Campaign</button>
      </div>
      <div className="campaigns-list">
        {campaigns.map((c, i) => (
          <div className="campaign-card" key={i}>
            <div className="campaign-header">
              <h3>{c.title}</h3>
              <span className={`status ${c.status}`}>{c.status}</span>
            </div>
            <p className="campaign-artist">Artist: {c.artist}</p>
            <div className="campaign-metrics">
              <span><i className="fas fa-eye"></i> {c.reach} reach</span>
              <span><i className="fas fa-heart"></i> {c.engagement} engagement</span>
              <span><i className="fas fa-play"></i> {c.streams} streams</span>
            </div>
            <div className="campaign-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${c.progress}%` }}></div>
              </div>
              <span>{c.progress}%</span>
            </div>
            <div className="campaign-budget">
              <span>Budget: {c.budget} | Spent: {c.spent}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
