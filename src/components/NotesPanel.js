'use client';

import { useState, useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { dateKey, MONTH_NAMES, formatDateRange } from '../utils/dateUtils';
import { Plus, Trash2, Pin, X } from 'lucide-react';

export default function NotesPanel() {
  const {
    selectedStart, selectedEnd, currentMonth, currentYear,
    notes, addNote, deleteNote, updateNote, dispatch
  } = useCalendar();
  const [newNote, setNewNote] = useState('');

  // Determine which date to show notes for
  const targetDate = selectedStart || { year: currentYear, month: currentMonth, day: new Date().getDate() };
  const key = dateKey(targetDate.year, targetDate.month, targetDate.day);
  const dateNotes = useMemo(() => (notes[key] || []).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.id - a.id;
  }), [notes, key]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addNote(targetDate.year, targetDate.month, targetDate.day, newNote.trim());
    setNewNote('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const displayDate = selectedStart
    ? formatDateRange(selectedStart, selectedEnd)
    : `${MONTH_NAMES[currentMonth]} ${new Date().getDate()}, ${currentYear}`;

  return (
    <div className="notesPanel" id="notes-panel">
      <div className="notesPanelHeader">
        <div>
          <h2 className="notesPanelTitle">📝 Notes</h2>
          <div className="noteDate">{displayDate}</div>
        </div>
        <button
          className="iconBtn"
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
          title="Close"
          style={{ width: '32px', height: '32px' }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Add Note */}
      <div>
        <textarea
          className="noteInput"
          placeholder="Write a note for this date... (Enter to save, Shift+Enter for new line)"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          id="note-input"
        />
        <button
          className="addNoteBtn"
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          style={{ marginTop: '8px', width: '100%' }}
          id="btn-add-note"
        >
          <Plus size={16} />
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="notesList" id="notes-list">
        {dateNotes.length === 0 ? (
          <div className="emptyNotes">
            <div className="emptyIcon">📋</div>
            <div>No notes for this date yet</div>
            <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Select a date and start writing!</div>
          </div>
        ) : (
          dateNotes.map((note) => (
            <div key={note.id} className="noteItem">
              <div style={{ flex: 1 }}>
                <div className="noteText">{note.text}</div>
                <div className="noteTime">
                  {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {note.pinned && <span style={{ marginLeft: '6px', color: 'var(--warning)' }}>📌 Pinned</span>}
                </div>
              </div>
              <div className="noteActions">
                <button
                  className="noteActionBtn"
                  onClick={() => updateNote(targetDate.year, targetDate.month, targetDate.day, note.id, { pinned: !note.pinned })}
                  title={note.pinned ? 'Unpin' : 'Pin'}
                >
                  <Pin size={14} style={{ color: note.pinned ? 'var(--warning)' : undefined }} />
                </button>
                <button
                  className="noteActionBtn delete"
                  onClick={() => deleteNote(targetDate.year, targetDate.month, targetDate.day, note.id)}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
