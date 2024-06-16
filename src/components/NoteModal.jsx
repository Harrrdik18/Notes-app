import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';

Modal.setAppElement('#root');

const NoteModal = ({
  modalIsOpen,
  closeModal,
  currentNote,
  setCurrentNote,
  handleSave,
}) => {
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const saveNote = () => {
    handleSave(note);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Note Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
    >
      <div
        className="bg-white text-black rounded-lg shadow-md p-4 mb-4 min-h-32 relative cursor-pointer"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 className="text-xl font-bold mb-2">
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            className="bg-transparent border-none w-full p-0 focus:outline-none"
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          />
        </h2>
        <p className="text-sm mb-2">
          <input
            type="text"
            name="tagline"
            value={note.tagline}
            onChange={handleChange}
            placeholder="Tagline"
            className="bg-transparent border-none w-full p-0 focus:outline-none"
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          />
        </p>
        <p className="text-sm mb-2">
          <textarea
            name="body"
            value={note.body}
            onChange={handleChange}
            placeholder="Body"
            className="bg-transparent border-none w-full p-0 focus:outline-none resize-none"
            rows="5"
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
          />
        </p>
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={saveNote}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteModal;
