import React, { useState } from "react";

const COLS = ["To Do", "In Progress", "Review", "Done"];

const initialTasks = {
  "To Do": [
    { id: 1, text: "Set up Luna Nova TikTok account", priority: "high" },
    { id: 2, text: "Draft contract for Alex Chen EP", priority: "medium" },
    { id: 3, text: "Research sync licensing platforms", priority: "low" },
  ],
  "In Progress": [
    { id: 4, text: "Design Summer Vibes campaign assets", priority: "high" },
    { id: 5, text: "Schedule radio interviews Q1", priority: "medium" },
  ],
  "Review": [
    { id: 6, text: "Review distributor agreement terms", priority: "high" },
  ],
  "Done": [
    { id: 7, text: "Launch Instagram for Jade Rivers", priority: "medium" },
    { id: 8, text: "Submit SXSW application", priority: "high" },
    { id: 9, text: "Update press kit templates", priority: "low" },
  ],
};

const PRIORITY_COLOR = { high: "#ff6b6b", medium: "#ffa726", low: "#4ecdc4" };

export default function TodosSection() {
  const [board, setBoard] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [newCol, setNewCol] = useState("To Do");
  const [dragItem, setDragItem] = useState(null);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask.trim(), priority: "medium" };
    setBoard(b => ({ ...b, [newCol]: [...b[newCol], task] }));
    setNewTask("");
  };

  const onDragStart = (task, col) => setDragItem({ task, col });
  const onDrop = (targetCol) => {
    if (!dragItem || dragItem.col === targetCol) return;
    setBoard(b => {
      const src = b[dragItem.col].filter(t => t.id !== dragItem.task.id);
      const dst = [...b[targetCol], dragItem.task];
      return { ...b, [dragItem.col]: src, [targetCol]: dst };
    });
    setDragItem(null);
  };

  const removeTask = (col, id) => setBoard(b => ({ ...b, [col]: b[col].filter(t => t.id !== id) }));

  return (
    <section id="todos" className="content-section active">
      <div className="section-header">
        <div><h1>To-Do & Workflows</h1><p>Track tasks across your label</p></div>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <input className="text-input" style={{ flex: 1, minWidth: 200 }} value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="New task..." />
        <select className="select-input" value={newCol} onChange={e => setNewCol(e.target.value)}>
          {COLS.map(c => <option key={c}>{c}</option>)}
        </select>
        <button className="btn-primary" onClick={addTask}><i className="fas fa-plus"></i> Add Task</button>
      </div>
      <div className="kanban-board">
        {COLS.map(col => (
          <div
            key={col}
            className="kanban-column"
            onDragOver={e => e.preventDefault()}
            onDrop={() => onDrop(col)}
          >
            <h3>{col} <span style={{ fontSize: "0.8rem", background: "rgba(255,255,255,0.1)", borderRadius: 9, padding: "1px 8px", marginLeft: 4 }}>{board[col].length}</span></h3>
            {board[col].map(task => (
              <div
                key={task.id}
                className="task-card"
                draggable
                onDragStart={() => onDragStart(task, col)}
                style={{ borderLeft: `3px solid ${PRIORITY_COLOR[task.priority]}` }}
              >
                <span>{task.text}</span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: PRIORITY_COLOR[task.priority], textTransform: "uppercase" }}>{task.priority}</span>
                  <button onClick={() => removeTask(col, task.id)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "0.8rem" }}><i className="fas fa-times"></i></button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
