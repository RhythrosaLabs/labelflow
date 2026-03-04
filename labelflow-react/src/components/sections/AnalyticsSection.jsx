import React, { useEffect, useRef } from "react";

const GEO_DATA = [
  { city: "Los Angeles", pct: 22 },
  { city: "New York", pct: 18 },
  { city: "London", pct: 14 },
  { city: "Berlin", pct: 11 },
  { city: "Toronto", pct: 9 },
  { city: "Other", pct: 26 },
];

export default function AnalyticsSection() {
  const streamsRef = useRef(null);
  const revenueRef = useRef(null);
  const streamsChart = useRef(null);
  const revenueChart = useRef(null);

  useEffect(() => {
    const Chart = window.Chart;
    if (!Chart) return;

    if (streamsChart.current) { streamsChart.current.destroy(); }
    if (revenueChart.current) { revenueChart.current.destroy(); }

    const chartDefaults = {
      scales: {
        y: { ticks: { color: "#999" }, grid: { color: "#2a2a2a" } },
        x: { ticks: { color: "#999" }, grid: { color: "#2a2a2a" } },
      },
      plugins: { legend: { labels: { color: "#ccc" } } },
    };

    if (streamsRef.current) {
      streamsChart.current = new Chart(streamsRef.current, {
        type: "line",
        data: {
          labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          datasets: [
            {
              label: "Total Streams",
              data: [1200000, 1350000, 1800000, 2100000, 2400000, 2650000, 2950000],
              borderColor: "#4ecdc4",
              backgroundColor: "rgba(78,205,196,0.08)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Luna Nova",
              data: [540000, 610000, 780000, 900000, 1050000, 1150000, 1280000],
              borderColor: "#ff6b6b",
              backgroundColor: "rgba(255,107,107,0.06)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: { responsive: true, ...chartDefaults },
      });
    }

    if (revenueRef.current) {
      revenueChart.current = new Chart(revenueRef.current, {
        type: "doughnut",
        data: {
          labels: ["Streaming", "Merchandise", "Live Shows", "Sync Licensing"],
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: ["#4ecdc4", "#ff6b6b", "#667eea", "#ffa726"],
            borderColor: "#111",
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: "#ccc" }, position: "bottom" } },
        },
      });
    }

    return () => {
      streamsChart.current?.destroy();
      revenueChart.current?.destroy();
    };
  }, []);

  return (
    <section id="analytics" className="content-section active">
      <div className="section-header">
        <div><h1>Analytics</h1><p>Track performance across all channels</p></div>
        <button className="btn-primary"><i className="fas fa-chart-bar"></i> Export Report</button>
      </div>

      <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Total Streams", value: "2.95M", trend: "+23%", icon: "fa-play" },
          { label: "Total Revenue", value: "$141K", trend: "+14%", icon: "fa-dollar-sign" },
          { label: "New Followers", value: "18.4K", trend: "+31%", icon: "fa-users" },
          { label: "Playlist Adds", value: "342", trend: "+56%", icon: "fa-list" },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon"><i className={`fas ${s.icon}`}></i></div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
              <span className="trend positive">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="dashboard-card">
          <h3>Streaming Growth</h3>
          <canvas ref={streamsRef} height={160}></canvas>
        </div>

        <div className="dashboard-card">
          <h3>Audience Geography</h3>
          <div className="geo-breakdown">
            {GEO_DATA.map((g, i) => (
              <div key={i} style={{ marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.2rem" }}>
                  <span style={{ color: "#ccc" }}>{g.city}</span>
                  <span style={{ color: "#4ecdc4" }}>{g.pct}%</span>
                </div>
                <div style={{ background: "#222", borderRadius: 4, height: 6 }}>
                  <div style={{ width: `${g.pct}%`, background: "linear-gradient(90deg, #4ecdc4, #667eea)", borderRadius: 4, height: "100%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Revenue Mix</h3>
          <canvas ref={revenueRef} height={160}></canvas>
        </div>
      </div>
    </section>
  );
}
