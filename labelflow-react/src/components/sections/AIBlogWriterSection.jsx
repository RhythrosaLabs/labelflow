import React, { useState, useRef, useEffect } from "react";

const TONES = ["Professional","Casual","Formal","Creative","Persuasive"];
const SAMPLE_BLOGS = [
  { id: 1, title: "How to Build a Loyal Fanbase in 2025", author: "LabelFlow", date: "Dec 10, 2024", excerpt: "Building a loyal fanbase in today's music landscape requires a multi-platform approach..." },
  { id: 2, title: "The Ultimate Guide to Music Distribution", author: "LabelFlow", date: "Dec 5, 2024", excerpt: "Choosing the right distributor can make or break your release strategy..." },
  { id: 3, title: "Sync Licensing 101 for Independent Artists", author: "LabelFlow", date: "Nov 28, 2024", excerpt: "Sync licensing is one of the most lucrative yet underutilised revenue streams for artists..." },
];

const AI_IDEAS = [
  "10 Underrated Strategies for Getting Playlist Placements",
  "Why Your Release Strategy Is Costing You Streams",
  "The Artist's Guide to Negotiating Better Deals",
  "Behind the Scenes: What A&R Reps Actually Look For",
  "How Independent Labels Are Outpacing Majors in 2025",
];

const AI_TITLES = [
  "The Blueprint: Building a Label That Lasts",
  "From Bedroom Producer to Signed Artist in 12 Months",
  "Why Every Musician Needs a Personal Brand Strategy",
  "The Science of Music Marketing: Data-Driven Success",
];

export default function AIBlogWriterSection() {
  const [view, setView] = useState("write");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState(null);
  const [chatMessages, setChatMessages] = useState([{ role: "ai", text: "Hi! I'm your AI writing assistant. Ask me anything about your blog post." }]);
  const [chatInput, setChatInput] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const editorRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const runAI = (type) => {
    setLoading(true);
    setAiOutput(null);
    setTimeout(() => {
      let output = "";
      if (type === "ideas") output = AI_IDEAS.map((idea, i) => `${i + 1}. ${idea}`).join("\n");
      else if (type === "titles") output = AI_TITLES.map((t, i) => `${i + 1}. ${t}`).join("\n");
      else if (type === "improve") output = content ? `Improved version:\n\n${content}\n\n[AI suggestions: Consider adding more specific data points, breaking long paragraphs, and adding a compelling call-to-action at the end.]` : "Please write some content first.";
      else if (type === "expand" && topic) output = `Expanded on "${topic}":\n\nThe music industry has undergone a seismic shift in recent years, with independent artists and labels now holding more power than ever before. ${topic} represents one of the most critical areas where modern labels can differentiate themselves...\n\nKey points to explore:\n• Market evolution and current trends\n• Practical implementation strategies\n• Common mistakes to avoid\n• Success case studies`;
      else if (type === "full") {
        const t = title || "Untitled Post";
        output = `Generated full blog post for "${t}" (${tone} tone):\n\n# ${t}\n\nIntroduction: In today's rapidly evolving music industry, understanding the nuances of artist development is paramount...\n\n## Section 1: The Foundation\nEvery successful label starts with a clear vision and a strong roster strategy...\n\n## Section 2: Growth Strategies\nModern labels leverage data analytics, social media intelligence, and AI-powered tools...\n\n## Conclusion\nThe future belongs to labels that embrace innovation while staying true to the art.`;
      }
      setAiOutput(output || "Please provide input first.");
      setLoading(false);
    }, 1200);
  };

  const insertGenerated = () => {
    if (aiOutput) { setContent(c => c + "\n\n" + aiOutput); setAiOutput(null); }
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", text: chatInput };
    setChatMessages(m => [...m, userMsg]);
    setChatInput("");
    setTimeout(() => {
      const responses = [
        "Great question! For a " + tone.toLowerCase() + " tone, I'd suggest leading with a compelling statistic or anecdote.",
        "You could strengthen that section by adding specific examples from successful artists like Chance the Rapper or Billie Eilish.",
        "The structure looks solid. Consider adding a summary box or key takeaways at the end for better readability.",
        "SEO tip: Your title could include a keyword like 'music marketing' or 'artist branding' for better search visibility.",
      ];
      setChatMessages(m => [...m, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 800);
  };

  const downloadHtml = () => {
    const html = `<!DOCTYPE html><html><head><title>${title}</title></head><body><h1>${title}</h1><div>${content.replace(/\n/g, "<br>")}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${title || "blog"}.html`; a.click();
  };

  const execCmd = (cmd) => { document.execCommand(cmd, false, null); };

  return (
    <section id="ai-blog-writer" className="content-section active">
      <div className="blog-writer-container">
        <div className="blog-header">
          <div className="blog-logo"><i className="fas fa-feather-alt"></i><h1>AI Blog Writer</h1></div>
          <nav className="blog-header-nav">
            <button className={`nav-btn${view === "write" ? " active" : ""}`} onClick={() => setView("write")}><i className="fas fa-edit"></i> Write</button>
            <button className={`nav-btn${view === "library" ? " active" : ""}`} onClick={() => { setView("library"); setSelectedBlog(null); }}><i className="fas fa-book-open"></i> Library</button>
          </nav>
          <div className="blog-header-actions">
            <button className="btn-secondary" onClick={() => { localStorage.setItem("lf_blog_draft", JSON.stringify({ title, content })); }}><i className="fas fa-save"></i> Save Draft</button>
            <button className="btn-secondary" onClick={downloadHtml}><i className="fas fa-download"></i> Download HTML</button>
            <button className="btn-primary"><i className="fas fa-rocket"></i> Publish</button>
          </div>
        </div>

        {view === "write" && (
          <div className="blog-main-content">
            <div className="blog-sidebar">
              <div className="ai-panel">
                <h3><i className="fas fa-robot"></i> AI Assistant</h3>
                <div className="ai-section">
                  <h4>Quick Actions</h4>
                  <button className="ai-btn" onClick={() => runAI("ideas")}><i className="fas fa-lightbulb"></i> Generate Ideas</button>
                  <button className="ai-btn" onClick={() => runAI("titles")}><i className="fas fa-heading"></i> Suggest Titles</button>
                  <button className="ai-btn" onClick={() => runAI("improve")}><i className="fas fa-magic"></i> Improve Text</button>
                  <button className="ai-btn" onClick={() => runAI("full")}><i className="fas fa-scroll"></i> Generate Full Blog</button>
                </div>
                <div className="ai-section">
                  <h4>Writing Style</h4>
                  <select className="select-input" value={tone} onChange={e => setTone(e.target.value)}>
                    {TONES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="ai-section">
                  <h4>Topic Input</h4>
                  <input type="text" className="text-input" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter a topic..." />
                  <button className="ai-btn full-width" onClick={() => runAI("expand")} style={{ marginTop: "0.5rem" }}><i className="fas fa-expand-arrows-alt"></i> Expand Topic</button>
                </div>
                <div className="ai-section">
                  <h4>AI Chat</h4>
                  <div className="chat-container" style={{ maxHeight: 180, overflowY: "auto", marginBottom: "0.5rem" }}>
                    {chatMessages.map((m, i) => (
                      <div key={i} className={`chat-message ${m.role}-message`}>
                        {m.role === "ai" && <i className="fas fa-robot"></i>}
                        <span>{m.text}</span>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="chat-input-container">
                    <input type="text" className="text-input" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask me anything..." />
                    <button className="btn-icon" onClick={sendChat}><i className="fas fa-paper-plane"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="editor-area">
              <div className="editor-header">
                <input type="text" className="title-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your blog post title..." />
                <div className="editor-stats">
                  <span>{wordCount} words</span>
                  <span>{content.length} characters</span>
                </div>
              </div>
              <div className="editor-toolbar">
                {[["bold","fa-bold"],["italic","fa-italic"],["underline","fa-underline"]].map(([cmd, ico]) => (
                  <button key={cmd} className="toolbar-btn" onMouseDown={e => { e.preventDefault(); execCmd(cmd); }} title={cmd}><i className={`fas ${ico}`}></i></button>
                ))}
                <div className="toolbar-separator"></div>
                {[["insertUnorderedList","fa-list-ul"],["insertOrderedList","fa-list-ol"]].map(([cmd, ico]) => (
                  <button key={cmd} className="toolbar-btn" onMouseDown={e => { e.preventDefault(); execCmd(cmd); }}><i className={`fas ${ico}`}></i></button>
                ))}
              </div>
              <div className="editor-container">
                <div
                  ref={editorRef}
                  className="editor"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={e => setContent(e.currentTarget.innerText)}
                  data-placeholder="Start writing your blog post here..."
                  style={{ minHeight: 300 }}
                />
              </div>
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", color: "#4ecdc4" }}>
                  <i className="fas fa-circle-notch fa-spin"></i> AI is thinking...
                </div>
              )}
              {aiOutput && (
                <div className="generated-content">
                  <h4>AI Generated Content</h4>
                  <div className="generated-text" style={{ whiteSpace: "pre-wrap" }}>{aiOutput}</div>
                  <div className="generated-actions">
                    <button className="btn-primary" onClick={insertGenerated}>Insert</button>
                    <button className="btn-secondary" onClick={() => setAiOutput(null)}>Dismiss</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {view === "library" && !selectedBlog && (
          <div className="library-view">
            <div className="library-header">
              <h2><i className="fas fa-book-open"></i> Public Library</h2>
              <p>Discover community-written blogs</p>
            </div>
            <div className="blog-grid">
              {SAMPLE_BLOGS.map(blog => (
                <div key={blog.id} className="blog-card dashboard-card" onClick={() => setSelectedBlog(blog)} style={{ cursor: "pointer" }}>
                  <h3>{blog.title}</h3>
                  <p style={{ color: "#888", fontSize: "0.8rem", margin: "0.25rem 0" }}>{blog.author} · {blog.date}</p>
                  <p style={{ color: "#ccc", fontSize: "0.875rem", marginTop: "0.5rem" }}>{blog.excerpt}</p>
                  <button className="btn-secondary" style={{ marginTop: "0.75rem" }}>Read More</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "library" && selectedBlog && (
          <div className="blog-reader">
            <div className="reader-header">
              <button className="btn-secondary" onClick={() => setSelectedBlog(null)}><i className="fas fa-arrow-left"></i> Back to Library</button>
            </div>
            <article className="blog-article">
              <h1>{selectedBlog.title}</h1>
              <p style={{ color: "#888", marginBottom: "1.5rem" }}>{selectedBlog.author} · {selectedBlog.date}</p>
              <p>{selectedBlog.excerpt}</p>
              <p style={{ marginTop: "1rem", color: "#ccc" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
