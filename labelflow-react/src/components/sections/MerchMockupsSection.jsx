import React, { useState } from "react";

const PRODUCTS = ["t-shirt","hoodie","tote-bag","mug","poster","phone-case","hat","sweatshirt"];
const STYLES = ["Modern Minimalist","Vintage Retro","Bold & Colorful","Street & Urban","Nature & Organic","Kawaii Cute","Cyberpunk Futuristic"];
const COLORS = ["Any colors","Monochrome","Warm Earth Tones","Cool Ocean","Vibrant Neon","Soft Pastels","Luxury Gold & Black"];
const ENVIRONMENTS = ["Any","Studio Lighting","Cozy Home","Outdoor Nature","Urban Street","Festival Stage"];
const MATERIALS = ["Standard","Soft Cotton","Premium Leather","Metallic Finish","Wood Grain","Glass Glossy"];

// Polished placeholder images by product type using picsum
const PRODUCT_IMAGES = {
  "t-shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
  "hoodie": "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=400&fit=crop",
  "tote-bag": "https://images.unsplash.com/photo-1597482196758-5c84d02e37fb?w=600&h=400&fit=crop",
  "mug": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=400&fit=crop",
  "poster": "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=600&h=400&fit=crop",
  "phone-case": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop",
  "hat": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=400&fit=crop",
  "sweatshirt": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&h=400&fit=crop",
};

export default function MerchMockupsSection() {
  const [product, setProduct] = useState("");
  const [design, setDesign] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [environment, setEnvironment] = useState("");
  const [material, setMaterial] = useState("");
  const [noText, setNoText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mockup, setMockup] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [angle, setAngle] = useState("front");

  const generate = () => {
    if (!product || !design) { return; }
    setLoading(true);
    setMockup(null);
    setTimeout(() => {
      const m = {
        id: Date.now(),
        product,
        design,
        style: style || "Default",
        color: color || "Any",
        image: PRODUCT_IMAGES[product] || PRODUCT_IMAGES["t-shirt"],
        label: `${style || "Standard"} ${product}`,
      };
      setMockup(m);
      setGallery(g => [m, ...g].slice(0, 12));
      setLoading(false);
    }, 1800);
  };

  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  return (
    <section id="merch-mockups" className="content-section active">
      <div className="section-header">
        <div><h1>AI Merch Mockups</h1><p>Generate realistic product mockups instantly</p></div>
      </div>
      <div className="merch-mockup-container">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Create Your Mockup</h3>
            <div className="form-group">
              <label>Product Type</label>
              <select className="select-input" value={product} onChange={e => setProduct(e.target.value)}>
                <option value="">Select...</option>
                {PRODUCTS.map(p => <option key={p} value={p}>{p.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Design Description</label>
              <textarea className="text-input" rows="3" value={design} onChange={e => setDesign(e.target.value)} placeholder="Describe your design..." />
            </div>
            <div className="form-group">
              <label>Style & Mood</label>
              <select className="select-input" value={style} onChange={e => setStyle(e.target.value)}>
                <option value="">Select style...</option>
                {STYLES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Color Scheme</label>
              <select className="select-input" value={color} onChange={e => setColor(e.target.value)}>
                {COLORS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Environment & Setting</label>
              <select className="select-input" value={environment} onChange={e => setEnvironment(e.target.value)}>
                {ENVIRONMENTS.map(env => <option key={env}>{env}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Material & Texture</label>
              <select className="select-input" value={material} onChange={e => setMaterial(e.target.value)}>
                {MATERIALS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={noText} onChange={e => setNoText(e.target.checked)} className="checkbox-input" /> No Text – generate without words
              </label>
            </div>
            <button className="btn-primary" onClick={generate} disabled={loading || !product || !design}>
              <i className="fas fa-magic"></i> {loading ? "Generating..." : "Generate Mockup"}
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Mockup Preview</h3>
            {loading && (
              <div style={{ textAlign: "center", padding: "3rem", color: "#4ecdc4" }}>
                <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "2rem" }}></i>
                <p style={{ marginTop: "1rem" }}>Generating your mockup...</p>
              </div>
            )}
            {!loading && !mockup && (
              <div className="mockup-display">
                <div className="placeholder-content">
                  <i className="fas fa-tshirt" style={{ fontSize: "3rem", color: "#444" }}></i>
                  <h3>Your mockup will appear here</h3>
                  <p>Fill the form and click "Generate Mockup"</p>
                </div>
              </div>
            )}
            {mockup && (
              <>
                <div className="mockup-display">
                  <img src={mockup.image} alt={mockup.label} style={{ width: "100%", borderRadius: 8, objectFit: "cover" }} />
                </div>
                <div className="mockup-actions">
                  <button className={`btn-secondary${favorites.includes(mockup.id) ? " active" : ""}`} onClick={() => toggleFav(mockup.id)}>
                    <i className={`fa${favorites.includes(mockup.id) ? "s" : "r"} fa-star`}></i> {favorites.includes(mockup.id) ? "Favorited" : "Favorite"}
                  </button>
                  <a className="btn-secondary" href={mockup.image} download={`${mockup.product}-mockup.jpg`} target="_blank" rel="noreferrer">
                    <i className="fas fa-download"></i> Download
                  </a>
                  <button className="btn-secondary" onClick={generate}><i className="fas fa-redo"></i> Regenerate</button>
                  <button className="btn-primary" onClick={() => { setMockup(null); setProduct(""); setDesign(""); }}><i className="fas fa-plus"></i> New Mockup</button>
                </div>
                <div className="camera-angles">
                  <h4>Camera Angles</h4>
                  <div className="angle-buttons">
                    {["front","side","top","diagonal","lifestyle","closeup"].map(a => (
                      <button key={a} className={`btn-secondary angle-btn${angle === a ? " active" : ""}`} onClick={() => setAngle(a)} style={angle === a ? { background: "#4ecdc4", color: "#000" } : {}}>
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="dashboard-card" style={{ marginTop: "1.5rem" }}>
            <h3>Your Generated Mockups</h3>
            <div className="merch-gallery">
              {gallery.map((m) => (
                <div key={m.id} className="gallery-item" style={{ cursor: "pointer" }} onClick={() => setMockup(m)}>
                  <img src={m.image} alt={m.label} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
                  <p style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "0.25rem", textAlign: "center" }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
