import React from 'react';
import Note from './Note';

const NotesList = ({ notes, openModal, onDelete, handlePin }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
          <Note key={note._id} note={note} onClick={openModal} onDelete={onDelete} handlePin={handlePin} />
      ))}
    </div>
  );
};

export default NotesList;
