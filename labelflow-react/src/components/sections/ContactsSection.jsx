import React, { useState } from "react";

const initialContacts = [
  { name: "Sarah Mitchell", company: "Metro FM", role: "Radio", email: "sarah@metrofm.com", phone: "+1 555-0101" },
  { name: "James Park", company: "Spotify Editorial", role: "Playlist Curator", email: "james@spotify.com", phone: "+1 555-0102" },
  { name: "Kenji Watts", company: "NME Magazine", role: "Journalist", email: "kenji@nme.com", phone: "+1 555-0103" },
  { name: "Lily Tran", company: "CAA", role: "Manager", email: "lily@caa.com", phone: "+1 555-0104" },
  { name: "Marcus Stone", company: "Adidas Music", role: "Brand", email: "marcus@adidas.com", phone: "+1 555-0105" },
];

export default function ContactsSection() {
  const [contacts, setContacts] = useState(initialContacts);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", role: "Manager", email: "", phone: "" });

  const save = () => {
    if (!form.name.trim()) return;
    setContacts(c => [...c, form]);
    setForm({ name: "", company: "", role: "Manager", email: "", phone: "" });
    setShowModal(false);
  };

  return (
    <section id="contacts" className="content-section active">
      <div className="section-header">
        <div><h1>Contacts</h1><p>Industry relationships in one place</p></div>
        <button className="btn-primary" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> Add Contact</button>
      </div>
      <div className="contacts-list">
        {contacts.map((c, i) => (
          <div className="contact-card" key={i}>
            <div className="contact-avatar">{c.name.charAt(0)}</div>
            <div className="contact-info">
              <h4>{c.name}</h4>
              <p>{c.role} · {c.company}</p>
              <div className="contact-details">
                <span><i className="fas fa-envelope"></i> {c.email}</span>
                <span><i className="fas fa-phone"></i> {c.phone}</span>
              </div>
            </div>
            <div className="contact-actions">
              <button className="btn-secondary btn-sm"><i className="fas fa-envelope"></i></button>
              <button className="btn-secondary btn-sm"><i className="fas fa-phone"></i></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show" onClick={e => e.target.classList.contains("modal") && setShowModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Contact</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Name</label><input className="text-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" /></div>
              <div className="form-group"><label>Company</label><input className="text-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Label, agency, media..." /></div>
              <div className="form-group"><label>Role</label>
                <select className="select-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                  {["Manager","Promoter","Radio","Journalist","Brand","Playlist Curator","A&R"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Email</label><input className="text-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" /></div>
              <div className="form-group"><label>Phone</label><input className="text-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555-0000" /></div>
              <button className="btn-primary" onClick={save}>Save Contact</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
