import React, { useState, useEffect, useRef } from 'react';
import { FaThumbtack, FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BASE_URL } from "../config";


const Note = ({ note, onClick, onDelete, handlePin }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isLoading, setLoading] = useState(false); // State for loading animation
  const bodyRef = useRef(null);

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setLoading(true); // Start loading animation
    try {
      // Make DELETE request
      const response = await fetch(`${BASE_URL}/notes/${note._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        onDelete(note._id);
      } else {
        console.error('Error deleting note:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setLoading(false); 
    }
  };

  const togglePin = async (e) => {
    e.stopPropagation();
    setLoading(true); 
    try {
      const response = await fetch(`${BASE_URL}/notes/${note._id}/pin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinned: !note.pinned }),
      });
      if (response.ok) {
        handlePin(note._id, !note.pinned);
      } else {
        console.error('Error toggling pin status:', response.statusText);
      }
    } catch (error) {
      console.error('Error toggling pin status:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      setIsOverflowing(bodyRef.current.scrollHeight > bodyRef.current.clientHeight);
    }
  }, [note.body, expanded]);

  return (
    <div
      className="bg-white text-black rounded-lg shadow-md p-4 mb-4 min-h-32 relative cursor-pointer overflow-hidden"
      onClick={() => onClick(note)}
    >
      <FaThumbtack
        className={`absolute top-2 right-2 cursor-pointer ${note.pinned ? 'text-yellow-500' : 'text-gray-300'}`}
        onClick={togglePin}
      />
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      <p className="text-sm mb-2 font-semibold text-gray-600">{note.tagline}</p>
      <p
        ref={bodyRef}
        className={`text-sm mb-2 ${expanded ? '' : 'line-clamp-2'}`}
      >
        {note.body}
      </p>
      {isOverflowing && (
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          {expanded ? (
            <FaChevronUp
              className="text-gray-500 cursor-pointer"
              onClick={toggleExpanded}
            />
          ) : (
            <FaChevronDown
              className="text-gray-500 cursor-pointer"
              onClick={toggleExpanded}
            />
          )}
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      )}
      <FaTrashAlt
        className="absolute bottom-2 right-2 text-red-500 cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
};

export default Note;
