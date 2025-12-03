import { useState, useEffect } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (!note.trim()) return;
    setNotes([note, ...notes]); // new note on top
    setNote("");
  };

  const handleDelete = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <div className="notes-card">
        <h1>Notes App</h1>

        <div className="input-section">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a note..."
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        {notes.length === 0 ? (
          <p className="no-notes">No notes available.</p>
        ) : (
          <ul className="notes-list">
            {notes.map((n, i) => (
              <li key={i} className="note-item">
                <span>{n}</span>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
