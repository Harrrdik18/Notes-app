import { useState, useEffect } from "react";
import NotesList from "./NotesList";
import Pagination from "./Pagination";
import NoteModal from "./NoteModal";
import { BASE_URL } from "../config";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const notesPerPage = 6;

  useEffect(() => {
    fetchNotes();
  }, [currentPage]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/notes?page=${currentPage}&limit=${notesPerPage}`
      );
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`Error fetching notes: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Fetched data:", result);

      if (result && Array.isArray(result.data)) {
        const pinnedNotes = result.data.filter((note) => note.pinned);
        const unpinnedNotes = result.data.filter((note) => !note.pinned);

        pinnedNotes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        unpinnedNotes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const sortedNotes = [...pinnedNotes, ...unpinnedNotes];

        setNotes(sortedNotes);
        setTotalNotes(result.total);
      } else {
        console.error("Fetched data is not in expected format:", result);
        setNotes([]);
        setTotalNotes(0);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
      setTotalNotes(0);
    }
  };

  const openModal = (note) => {
    setCurrentNote(note);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentNote(null);
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchNotes();
      } else {
        console.error("Error deleting note:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handlePin = async (id, pinned) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/pin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned }),
      });

      if (response.status === 200) {
        fetchNotes();
      } else {
        console.error("Error pinning note:", response.statusText);
      }
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleSave = async (note) => {
    try {
      const response = note._id
        ? await fetch(`${BASE_URL}/notes/${note._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
          })
        : await fetch(`${BASE_URL}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
          });

      if (response.ok) {
        fetchNotes();
        closeModal();
      } else {
        console.error("Error saving note:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const displayedNotes = notes;

  return (
    <div className="p-6">
      <button
        onClick={() =>
          openModal({ title: "", tagline: "", body: "", pinned: false })
        }
        className="mb-6 px-4 py-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        Add Note
      </button>

      <NotesList
        notes={displayedNotes}
        openModal={openModal}
        onDelete={handleDelete}
        handlePin={handlePin}
      />
      <Pagination
        totalNotes={totalNotes}
        notesPerPage={notesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {modalIsOpen && (
        <NoteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          handleDelete={handleDelete}
          handleSave={handleSave}
          handlePin={handlePin}
        />
      )}
    </div>
  );
};

export default Notes;
