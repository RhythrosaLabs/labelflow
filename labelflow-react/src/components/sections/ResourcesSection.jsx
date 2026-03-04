import React, { useState } from "react";

const CATEGORIES = ["Links","Documents","Media","References"];
const CAT_ICONS = { Links: "fa-link", Documents: "fa-file-alt", Media: "fa-video", References: "fa-book" };
const CAT_COUNTS = { Links: 12, Documents: 18, Media: 6, References: 9 };

const initialResources = [
  { id: 1, title: "SubmitHub – Blog & Playlist Submissions", category: "Links", url: "https://www.submithub.com", date: "Dec 10, 2024" },
  { id: 2, title: "Music Business Worldwide", category: "Links", url: "https://www.musicbusinessworldwide.com", date: "Dec 9, 2024" },
  { id: 3, title: "Standard Artist Contract Template", category: "Documents", url: "#", date: "Dec 8, 2024" },
  { id: 4, title: "Label Royalty Split Sheet", category: "Documents", url: "#", date: "Dec 6, 2024" },
  { id: 5, title: "Luna Nova – EPK Video", category: "Media", url: "#", date: "Dec 4, 2024" },
  { id: 6, title: "Music Industry Reports 2024", category: "References", url: "#", date: "Dec 1, 2024" },
  { id: 7, title: "The Music Modernization Act – Summary", category: "References", url: "#", date: "Nov 28, 2024" },
];

export default function ResourcesSection() {
  const [resources, setResources] = useState(initialResources);
  const [selectedCat, setSelectedCat] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Links", url: "" });

  const visible = selectedCat === "all" ? resources : resources.filter(r => r.category === selectedCat);

  const save = () => {
    if (!form.title.trim()) return;
    setResources(rs => [...rs, { ...form, id: Date.now(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }]);
    setForm({ title: "", category: "Links", url: "" });
    setShowModal(false);
  };

  const remove = (id) => setResources(rs => rs.filter(r => r.id !== id));

  return (
    <section id="resources" className="content-section active">
      <div className="section-header">
        <div><h1>Resources</h1><p>Links, documents, and references</p></div>
        <button className="btn-primary" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> Add Resource</button>
      </div>
      <div className="resources-grid">
        <div className="resource-categories">
          <div className={`category-card${selectedCat === "all" ? " active" : ""}`} onClick={() => setSelectedCat("all")}>
            <div className="category-icon"><i className="fas fa-th"></i></div>
            <h3>All</h3>
            <p className="category-count">{resources.length} items</p>
          </div>
          {CATEGORIES.map(cat => (
            <div key={cat} className={`category-card${selectedCat === cat ? " active" : ""}`} onClick={() => setSelectedCat(cat)}>
              <div className="category-icon"><i className={`fas ${CAT_ICONS[cat]}`}></i></div>
              <h3>{cat}</h3>
              <p className="category-count">{resources.filter(r => r.category === cat).length} items</p>
            </div>
          ))}
        </div>
        <div className="resources-list">
          {visible.map(r => (
            <div className="resource-item" key={r.id}>
              <div className="resource-icon"><i className={`fas ${CAT_ICONS[r.category]}`}></i></div>
              <div className="resource-info">
                <h4>{r.title}</h4>
                <p>{r.category} · {r.date}</p>
              </div>
              <div className="resource-actions">
                {r.url !== "#" && <a href={r.url} target="_blank" rel="noreferrer" className="btn-secondary btn-sm"><i className="fas fa-external-link-alt"></i></a>}
                <button className="btn-secondary btn-sm" onClick={() => remove(r.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal show" onClick={e => e.target.classList.contains("modal") && setShowModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Resource</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Title</label><input className="text-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Resource title" /></div>
              <div className="form-group"><label>Category</label>
                <select className="select-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group"><label>URL (optional)</label><input className="text-input" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." /></div>
              <button className="btn-primary" onClick={save}>Save Resource</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
