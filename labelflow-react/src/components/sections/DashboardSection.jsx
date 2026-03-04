import React from "react";

const activities = [
  { icon: "fas fa-upload", text: "<strong>New track uploaded</strong> by Luna Nova", time: "2 hours ago" },
  { icon: "fas fa-bullhorn", text: '<strong>Campaign launched</strong> for "Summer Vibes" EP', time: "5 hours ago" },
  { icon: "fas fa-handshake", text: "<strong>Collaboration secured</strong> with Metro FM", time: "1 day ago" },
];

const events = [
  { day: "15", month: "Dec", title: "Luna Nova - Studio Session", time: "2:00 PM" },
  { day: "18", month: "Dec", title: "Alex Chen - Music Video Shoot", time: "10:00 AM" },
  { day: "22", month: "Dec", title: "Label Meeting - Q4 Review", time: "3:00 PM" },
];

export default function DashboardSection() {
  return (
    <section id="dashboard" className="content-section active">
      <div className="section-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your label performance</p>
        </div>
        <div className="header-actions-group">
          <button className="btn-secondary">Share Report</button>
          <button className="btn-primary">Generate Insights</button>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-users"></i></div>
          <div className="stat-info"><h3>42</h3><p>Active Artists</p><span className="trend positive">+12%</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-bullhorn"></i></div>
          <div className="stat-info"><h3>28</h3><p>Active Campaigns</p><span className="trend positive">+8%</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-play"></i></div>
          <div className="stat-info"><h3>2.4M</h3><p>Monthly Streams</p><span className="trend positive">+24%</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-dollar-sign"></i></div>
          <div className="stat-info"><h3>$124K</h3><p>Monthly Revenue</p><span className="trend positive">+18%</span></div>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activities.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-icon"><i className={a.icon}></i></div>
                <div className="activity-info">
                  <p dangerouslySetInnerHTML={{ __html: a.text }} />
                  <span>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-card upcoming-events">
          <h3>Upcoming Events</h3>
          <div className="events-list">
            {events.map((e, i) => (
              <div className="event-item" key={i}>
                <div className="event-date">
                  <span className="day">{e.day}</span>
                  <span className="month">{e.month}</span>
                </div>
                <div className="event-info">
                  <h4>{e.title}</h4>
                  <span>{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-card ai-insights">
          <h3>AI Insights</h3>
          <div className="insights-list">
            <div className="insight-item"><i className="fas fa-lightbulb"></i><p>Promote "Midnight Dreams" on TikTok - trending up 340%</p></div>
            <div className="insight-item"><i className="fas fa-crosshairs"></i><p>Optimal release time for Alex Chen: Tuesday 3PM EST</p></div>
            <div className="insight-item"><i className="fas fa-chart-line"></i><p>Luna Nova fanbase surging in Berlin and Amsterdam</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
