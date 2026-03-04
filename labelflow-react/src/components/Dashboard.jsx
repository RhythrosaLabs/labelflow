import React from "react";

export default function Dashboard() {
  return (
    <section className="content-section active">
      <div className="section-header">
        <h1>Dashboard</h1>
        <p>Overview of your label's performance and activities</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>42</h3>
            <p>Active Artists</p>
            <span className="trend positive">+12%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-bullhorn"></i>
          </div>
          <div className="stat-info">
            <h3>28</h3>
            <p>Active Campaigns</p>
            <span className="trend positive">+8%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-play"></i>
          </div>
          <div className="stat-info">
            <h3>2.4M</h3>
            <p>Monthly Streams</p>
            <span className="trend positive">+24%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <h3>$124K</h3>
            <p>Monthly Revenue</p>
            <span className="trend positive">+18%</span>
          </div>
        </div>
      </div>
      {/* Add more dashboard content as needed */}
    </section>
  );
}
