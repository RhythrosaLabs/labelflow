import React, { useState } from "react";

const FILTERS = ["all","artists","campaigns","meetings","ideas"];

const initialNotes = [
  { id: 1, title: "Luna Nova Meeting Notes", category: "artists", content: "Discussed new EP direction. Going for a more experimental sound blending electronica with folk elements. Release target Q2.", date: "Dec 12, 2024" },
  { id: 2, title: "Q4 Campaign Strategy", category: "campaigns", content: "Focus on TikTok and Instagram Reels. Budget allocation: 40% influencer, 35% paid ads, 25% organic.", date: "Dec 10, 2024" },
  { id: 3, title: "Label Industry Meeting", category: "meetings", content: "Met with A&R reps from three major distributors. DistroKid Pro deal looks promising. Follow up by end of month.", date: "Dec 8, 2024" },
  { id: 4, title: "Sync Licensing Idea", category: "ideas", content: "Pitch Luna Nova's ambient tracks to Netflix and HBO. Create a dedicated sync reel with the top 5 most licensable tracks.", date: "Dec 5, 2024" },
];

export default function NotesSection() {
  const [notes, setNotes] = useState(initialNotes);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(initialNotes[0]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const visible = filter === "all" ? notes : notes.filter(n => n.category === filter);

  const selectNote = (n) => { setSelected(n); setEditing(false); };

  const saveNote = () => {
    setNotes(notes.map(n => n.id === selected.id ? { ...n, content: draft } : n));
    setSelected(s => ({ ...s, content: draft }));
    setEditing(false);
  };

  const newNote = () => {
    const n = { id: Date.now(), title: "New Note", category: "ideas", content: "", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
    setNotes(ns => [n, ...ns]);
    setSelected(n);
    setDraft("");
    setEditing(true);
  };

  return (
    <section id="notes" className="content-section active">
      <div className="section-header">
        <div><h1>Notes</h1><p>Capture meetings, ideas, and plans</p></div>
        <button className="btn-primary" onClick={newNote}><i className="fas fa-plus"></i> New Note</button>
      </div>
      <div className="notes-container">
        <div className="notes-sidebar">
          <div className="notes-filter">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All Notes" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="notes-list">
            {visible.map(n => (
              <div key={n.id} className={`note-item${selected?.id === n.id ? " active" : ""}`} onClick={() => selectNote(n)}>
                <h4>{n.title}</h4>
                <p>{n.content.slice(0, 60)}...</p>
                <span className="note-date">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="note-editor">
          {selected ? (
            <>
              <div style={{ marginBottom: "0.75rem" }}>
                <h3 style={{ color: "#4ecdc4", marginBottom: "0.25rem" }}>{selected.title}</h3>
                <span style={{ fontSize: "0.8rem", color: "#888" }}>{selected.date} · {selected.category}</span>
              </div>
              {editing ? (
                <textarea className="text-input" rows="12" value={draft} onChange={e => setDraft(e.target.value)} style={{ width: "100%", resize: "vertical" }} />
              ) : (
                <div style={{ whiteSpace: "pre-wrap", color: "#ccc", lineHeight: 1.7, minHeight: "12rem" }}>{selected.content}</div>
              )}
              <div className="note-actions">
                <button className="btn-secondary">Share</button>
                <button className="btn-secondary">Archive</button>
                {editing
                  ? <button className="btn-primary" onClick={saveNote}>Save Note</button>
                  : <button className="btn-primary" onClick={() => { setDraft(selected.content); setEditing(true); }}>Edit</button>
                }
              </div>
            </>
          ) : (
            <p style={{ color: "#888" }}>Select or create a note...</p>
          )}
        </div>
      </div>
    </section>
  );
}
