import React, { useState } from "react";

const AUDIENCES = ["general","hiphop","indie","electronic","pop"];
const ACTIVATIONS = ["posters","billboards","street-team","pop-up","projection"];

const MOCK_RESULTS = {
  Berlin: [
    { name: "Berghain Area – Revaler Str.", type: "Nightlife District", score: 97, footTraffic: "Very High", demographics: "Electronic music fans, 20–35", bestTimes: "Thu–Sun evenings" },
    { name: "Mauerpark Flea Market", type: "Outdoor Market", score: 92, footTraffic: "High", demographics: "Young creatives, tourists, locals", bestTimes: "Sunday 9AM–6PM" },
    { name: "Urban Outfitters Friedrichshain", type: "Retail Hub", score: 88, footTraffic: "High", demographics: "Fashion-forward youth", bestTimes: "Weekends, 12–5PM" },
  ],
  London: [
    { name: "Shoreditch High St / Brick Lane", type: "Cultural Quarter", score: 95, footTraffic: "Very High", demographics: "Young creatives, music fans 18–30", bestTimes: "Fri–Sun" },
    { name: "Record Store Day – Rough Trade East", type: "Record Store", score: 91, footTraffic: "High", demographics: "Music collectors, indie fans", bestTimes: "Saturdays" },
    { name: "Brixton Market", type: "Community Market", score: 87, footTraffic: "High", demographics: "Diverse music community", bestTimes: "Weekends" },
  ],
  default: [
    { name: "Downtown Coffee Hub", type: "Coffee Shop", score: 94, footTraffic: "High", demographics: "Young professionals, students", bestTimes: "Mon–Fri 7–9AM, 12–2PM" },
    { name: "Vinyl Records & More", type: "Record Store", score: 91, footTraffic: "Medium-High", demographics: "Music enthusiasts, collectors", bestTimes: "Weekends, 5–8PM" },
    { name: "University Student Center", type: "Educational", score: 88, footTraffic: "Very High", demographics: "Students, faculty", bestTimes: "Between classes, lunch hours" },
    { name: "Indie Venue Row", type: "Nightlife", score: 85, footTraffic: "High", demographics: "Live music fans 21–35", bestTimes: "Thu–Sat evenings" },
  ],
};

export default function SpotSpotterSection() {
  const [city, setCity] = useState("");
  const [audience, setAudience] = useState("general");
  const [activation, setActivation] = useState("posters");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const search = () => {
    if (!city.trim()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const key = Object.keys(MOCK_RESULTS).find(k => city.toLowerCase().includes(k.toLowerCase()));
      setResults(MOCK_RESULTS[key] || MOCK_RESULTS.default);
      setLoading(false);
    }, 1400);
  };

  return (
    <section id="spot-spotter" className="content-section active">
      <div className="section-header">
        <div><h1>Street Marketing</h1><p>Find perfect flyer & campaign locations worldwide</p></div>
      </div>
      <div className="spot-spotter-grid">
        <div className="dashboard-card spot-form">
          <h3>Search Locations</h3>
          <div className="form-group">
            <label>Campaign City</label>
            <input type="text" className="text-input" value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="Berlin, London, New York..." />
          </div>
          <div className="form-group">
            <label>Audience Type</label>
            <select className="select-input" value={audience} onChange={e => setAudience(e.target.value)}>
              <option value="general">General Audience</option>
              <option value="hiphop">Hip-Hop Fans</option>
              <option value="indie">Indie Music Lovers</option>
              <option value="electronic">Electronic Scene</option>
              <option value="pop">Pop Culture</option>
            </select>
          </div>
          <div className="form-group">
            <label>Activation Type</label>
            <select className="select-input" value={activation} onChange={e => setActivation(e.target.value)}>
              <option value="posters">Poster Drop</option>
              <option value="billboards">Billboards</option>
              <option value="street-team">Street Team</option>
              <option value="pop-up">Pop-up Booth</option>
              <option value="projection">Projection Mapping</option>
            </select>
          </div>
          <button className="btn-primary" onClick={search} disabled={loading}>
            <i className="fas fa-search"></i> {loading ? "Searching..." : "Find Spots"}
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Recommended Locations</h3>
          {!results && !loading && (
            <div className="empty-state">
              <i className="fas fa-map-pin"></i>
              <h3>No locations yet</h3>
              <p>Search for a city to see AI-powered suggestions</p>
            </div>
          )}
          {loading && (
            <div style={{ textAlign: "center", padding: "2rem", color: "#4ecdc4" }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: "2rem" }}></i>
              <p style={{ marginTop: "0.75rem" }}>Discovering the best spots in {city}...</p>
            </div>
          )}
          {results && (
            <div className="spot-results">
              <p style={{ color: "#888", marginBottom: "1rem", fontSize: "0.875rem" }}>
                <i className="fas fa-map-marker-alt" style={{ color: "#4ecdc4" }}></i> {results.length} top locations found in <strong style={{ color: "#fff" }}>{city}</strong>
              </p>
              {results.map((r, i) => (
                <div key={i} className="location-card dashboard-card" style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4>{r.name}</h4>
                      <p style={{ color: "#888", fontSize: "0.85rem" }}><i className="fas fa-store"></i> {r.type}</p>
                    </div>
                    <div style={{ textAlign: "center", background: "rgba(78,205,196,0.15)", borderRadius: 8, padding: "0.35rem 0.75rem" }}>
                      <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#4ecdc4" }}>{r.score}</div>
                      <div style={{ fontSize: "0.65rem", color: "#888" }}>Match</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.85rem", color: "#ccc" }}>
                    <span><i className="fas fa-walking" style={{ color: "#4ecdc4", width: 16 }}></i> {r.footTraffic} foot traffic</span>
                    <span><i className="fas fa-users" style={{ color: "#4ecdc4", width: 16 }}></i> {r.demographics}</span>
                    <span><i className="fas fa-clock" style={{ color: "#4ecdc4", width: 16 }}></i> {r.bestTimes}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                    <button className="btn-secondary btn-sm"><i className="fas fa-route"></i> Directions</button>
                    <button className="btn-primary btn-sm"><i className="fas fa-plus"></i> Add to Campaign</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
