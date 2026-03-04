import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";

const AI_RESPONSES = [
  "Based on your current campaigns, I recommend focusing on social media engagement for Luna Nova.",
  "Your streaming numbers look great! Consider expanding Alex Chen's promotion to new platforms.",
  "I notice opportunities in your schedule. Would you like me to suggest some release optimisations?",
  "Luna Nova's fanbase is surging in Berlin and Amsterdam — consider a European tour push.",
  "Let me help you create a targeted marketing strategy for your artists.",
  "Your best performing artist this month is Luna Nova with 24% growth. Keep momentum!",
];

function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your LabelFlow AI. Ask me anything about your label." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages(m => [...m, { role: "ai", text: reply }]);
    }, 800);
  };

  return (
    <div className="floating-ai">
      <button className="floating-ai-btn" onClick={() => setOpen(o => !o)}>
        <i className="fas fa-comment-dots"></i>
      </button>
      {open && (
        <div className="floating-ai-panel">
          <div className="floating-ai-header">
            <h3>AI Assistant</h3>
            <button className="close-btn" onClick={() => setOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="floating-ai-body">
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chat-message ${m.role}-message`}>
                  {m.role === "ai" && <i className="fas fa-robot"></i>}
                  <span>{m.text}</span>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask LabelFlow AI..."
              />
              <button onClick={send}><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <MainContent activeSection={activeSection} />
      <FloatingAI />
    </div>
  );
}

export default App;

