import React, { useState } from "react";

const GENRES = ["Electronic","Hip-Hop","Indie Pop","R&B","Synthwave","Folk","Jazz","Rock","Country"];
const AESTHETICS = ["Dark Aesthetic","Bright & Colorful","Minimalist","Vintage","Futuristic","Nature-Driven","Street/Urban"];

const ARTIST_NAMES = ["Luna Nova","Echo Drift","Neon Pulse","Midnight Sage","Crystal Wave","Solar Tide","Prism Echo"];

export default function AIArtistSection() {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("Electronic");
  const [aesthetic, setAesthetic] = useState("Minimalist");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(-1);
  const [artist, setArtist] = useState(null);
  const [activeTab, setActiveTab] = useState("album");

  const STEPS = [
    { key: "profile", label: "Generating artist profile..." },
    { key: "image", label: "Creating visual identity..." },
    { key: "album", label: "Producing album concept..." },
    { key: "merch", label: "Designing merchandise..." },
    { key: "music", label: "Composing music DNA..." },
  ];

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setArtist(null);
    for (let i = 0; i < STEPS.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 900));
    }
    const name = ARTIST_NAMES[Math.floor(Math.random() * ARTIST_NAMES.length)];
    setArtist({
      name,
      genre,
      bio: `${name} is an innovative artist who ${prompt.toLowerCase()}. Known for their ${aesthetic.toLowerCase()} visual identity and captivating live performances, ${name} is rapidly becoming a defining voice in the ${genre} scene.`,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
      album: {
        title: "Digital Dreams",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        tracks: ["Intro – Digital Awakening","Neon Nights","Electric Soul","Midnight Drive","Reflections","Ghost Signal","Outro – Dawn"],
      },
      merch: [
        { type: "T-Shirt", price: "$25" },
        { type: "Hoodie", price: "$45" },
        { type: "Poster", price: "$15" },
        { type: "Sticker Pack", price: "$8" },
      ],
    });
    setStep(-1);
    setLoading(false);
  };

  return (
    <section id="ai-artist" className="content-section active">
      <div className="section-header">
        <div><h1>AI Artist Development</h1><p>Generate complete artist profiles with AI</p></div>
      </div>
      <div className="ai-artist-grid">
        <div className="dashboard-card">
          <h3>Create an AI Artist</h3>
          <div className="form-group">
            <label>Artist Description</label>
            <textarea className="text-input" rows="4" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe the artist's vibe, influences, and story..." />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <select className="select-input" value={genre} onChange={e => setGenre(e.target.value)}>
              {GENRES.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Aesthetic Style</label>
            <select className="select-input" value={aesthetic} onChange={e => setAesthetic(e.target.value)}>
              {AESTHETICS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <button className="btn-primary" onClick={generate} disabled={loading}>
            <i className="fas fa-magic"></i> {loading ? "Generating..." : "Generate Artist"}
          </button>

          {loading && (
            <div className="generation-progress" style={{ marginTop: "1rem" }}>
              {STEPS.map((s, i) => (
                <div key={s.key} className={`progress-step${i === step ? " active" : i < step ? " complete" : ""}`}>
                  <i className={`fas ${i < step ? "fa-check-circle" : i === step ? "fa-circle-notch fa-spin" : "fa-circle"}`}></i>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {artist && (
          <div className="dashboard-card generated-artist-card">
            <div className="artist-header" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <img src={artist.image} alt={artist.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <h2 style={{ color: "#4ecdc4" }}>{artist.name}</h2>
                <p style={{ color: "#aaa" }}>{artist.genre}</p>
                <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", lineHeight: 1.6 }}>{artist.bio}</p>
              </div>
            </div>
            <div className="artist-details-tabs" style={{ marginTop: "1.5rem" }}>
              <div className="tab-nav" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                {["album","merch","details"].map(tab => (
                  <button key={tab} className={`btn-secondary${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)} style={activeTab === tab ? { background: "#4ecdc4", color: "#000" } : {}}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              {activeTab === "album" && (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <img src={artist.album.cover} alt="album" style={{ width: 120, height: 120, borderRadius: 8, objectFit: "cover" }} />
                  <div>
                    <h3>{artist.album.title}</h3>
                    {artist.album.tracks.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.35rem 0", borderBottom: "1px solid #222", fontSize: "0.875rem", color: "#ccc" }}>
                        <i className="fas fa-play" style={{ color: "#4ecdc4", marginTop: 2 }}></i>
                        <span style={{ flex: 1 }}>{t}</span>
                        <span style={{ color: "#666" }}>3:{(20 + i * 13).toString().padStart(2,"0")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "merch" && (
                <div className="merch-grid">
                  {artist.merch.map((m, i) => (
                    <div className="merch-item" key={i}>
                      <div className="merch-placeholder" style={{ fontSize: "2rem" }}>🎨</div>
                      <h4>{m.type}</h4>
                      <p className="merch-price">{m.price}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "details" && (
                <div>
                  <div style={{ marginBottom: "1rem" }}><h4 style={{ color: "#4ecdc4" }}>Background</h4><p style={{ color: "#ccc", marginTop: "0.25rem" }}>Generated based on your prompt and genre preferences.</p></div>
                  <div><h4 style={{ color: "#4ecdc4" }}>Style</h4><p style={{ color: "#ccc", marginTop: "0.25rem" }}>Unique blend of {artist.genre.toLowerCase()} with {aesthetic.toLowerCase()} influences.</p></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
