import React, { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const events = [
  { date: 15, title: "Luna Nova - Studio Session", time: "2:00 PM" },
  { date: 18, title: "Alex Chen - Music Video Shoot", time: "10:00 AM" },
  { date: 22, title: "Label Meeting - Q4 Review", time: "3:00 PM" },
  { date: 28, title: "Luna Nova - Live Performance", time: "8:00 PM" },
];

export default function ScheduleSection() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [showModal, setShowModal] = useState(false);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section id="schedule" className="content-section active">
      <div className="section-header">
        <div><h1>Schedule</h1><p>Releases, shows, and important dates</p></div>
        <button className="btn-primary" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> Add Event</button>
      </div>
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-btn" onClick={prevMonth}><i className="fas fa-chevron-left"></i></button>
          <h3>{MONTHS[month]} {year}</h3>
          <button className="nav-btn" onClick={nextMonth}><i className="fas fa-chevron-right"></i></button>
        </div>
        <div className="calendar-grid">
          {DAYS.map(d => <div className="calendar-day-header" key={d}>{d}</div>)}
          {cells.map((day, i) => {
            const event = day ? events.find(e => e.date === day) : null;
            return (
              <div key={i} className={`calendar-day${day ? "" : " empty"}${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? " today" : ""}`}>
                {day && <span className="day-number">{day}</span>}
                {event && <div className="calendar-event">{event.title}</div>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="dashboard-card" style={{ marginTop: "1.5rem" }}>
        <h3>Upcoming Events</h3>
        <div className="events-list">
          {events.map((e, i) => (
            <div className="event-item" key={i}>
              <div className="event-date">
                <span className="day">{e.date}</span>
                <span className="month">{MONTHS[month].slice(0, 3)}</span>
              </div>
              <div className="event-info">
                <h4>{e.title}</h4>
                <span>{e.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal show" onClick={(e) => e.target.classList.contains("modal") && setShowModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Event</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Event Name</label><input type="text" className="text-input" placeholder="Release, show, milestone..." /></div>
              <div className="form-group"><label>Date</label><input type="date" className="text-input" /></div>
              <div className="form-group"><label>Time</label><input type="time" className="text-input" /></div>
              <div className="form-group"><label>Description</label><textarea className="text-input" rows="3"></textarea></div>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Save Event</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
