import React, { useEffect } from "react";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import ModalPopUp from "./components/modal";

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


function App() {

  const [notes, setNotes] = useState([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

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
        name: "Example Note",
        title: title,
        text: text,
        date: 'Created Date: ' + convertTime(Date.now()),
      };
      const newNotes = [newNote, ...notes];
      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
    }
  };

  const onDeleteNote = (index) => {
    const newNote = [...notes];
    if (window.confirm("Are you sure you want to delete this item?")) {
      newNote.splice(index, 1);
      setNotes(newNote);
      localStorage.setItem("notes", JSON.stringify(newNote));
    }
  };

  return (
    <div>
      <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} onOpen={<ModalPopUp/>} > </Sidebar>
      <Main></Main>
    </div>
  );
}

export default App;
