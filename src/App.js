import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Modal from "react-modal/lib/components/Modal";
import ModalPopUp from "./components/modal";
import { Archive } from "./components/archive";

// Function to convert time into a readable format.
const convertTime = (time, options) => {
  return new Date(time).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};



Modal.setAppElement('#root');


function App() {

  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const onAddNote = (title, text) => {
    if(text===""){
      alert("You need to add some information");
    } else{
      const newNote = {
        name: "Example Note" + title,
        title: title,
        text: text,
        date: 'Created Date: ' + convertTime(Date.now()),
      };
      const newNotes = [newNote, ...notes];
      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
    }
  };

  const onUnarchiveNote = (index) => {
    const newArchivedNotes = [...archivedNotes];
    const noteToUnarchive = newArchivedNotes.splice(index, 1)[0];
    setArchivedNotes(newArchivedNotes);
    setNotes([...notes, noteToUnarchive]);
    localStorage.setItem("archivedNotes", JSON.stringify(newArchivedNotes));
    localStorage.setItem("notes", JSON.stringify([...notes, noteToUnarchive]));
  };

  const onArchiveNote = (index) => {
    const newNotes = [...notes];
    if (window.confirm("Are you sure you want to delete this item?")) {
      const noteToArchive = newNotes.splice(index, 1)[0];
      setNotes(newNotes);
      setArchivedNotes([...archivedNotes, noteToArchive]);
      localStorage.setItem("notes", JSON.stringify(newNotes));
      localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));
      
    }
  };

  return (
    <div>
      <Sidebar notes={notes} onAddNote={onAddNote} onArchiveNote={onArchiveNote} onOpen={<ModalPopUp/>} > </Sidebar>
      <Archive archivedNotes={archivedNotes} onArchiveNote={onArchiveNote} onUnarchiveNote={onUnarchiveNote}></Archive>
    </div>
  );
}

export default App;
