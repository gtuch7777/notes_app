import React, { useState, useEffect } from "react";
import Modal from "react-modal";

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
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgb(253, 253, 131)"
  }
};

function ModalPopUp(props) {
    const [img, setImg] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedDate, setUpdatedDate] = useState(null);
  
    useEffect(() => {
        setTitle(props.title);
        setText(props.text);
      }, [props.title, props.text]);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function editModal() {
      setImg(true);
      setIsEditing(true);
    }
  
    function saveModal() {
      setImg(false);
      setIsOpen(true);
      setIsEditing(false);
      const updatedNote = {
        title,
        text,
        updatedDate: convertTime(new Date().toLocaleString())
      };
      const notes = JSON.parse(localStorage.getItem("notes"));
      const index = notes.findIndex((note) => note.id === props.id);
      notes[index] = { ...notes[index], ...updatedNote };
      localStorage.setItem("notes", JSON.stringify(notes));
      setUpdatedDate(updatedNote.updatedDate);
    }
  
    function closeModal() {
      setImg(false);
      setIsOpen(false);
      setIsEditing(false);
    }
  
    const handleTitleChange = (event) => setTitle(event.target.value);
  
    const handleTextChange = (event) => setText(event.target.value);
  
    return (
      <div>
        <button onClick={openModal}>Open Note</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {img ? (
            <>
              <div className="edit">
                <input
                  type="text"
                  placeholder={title}
                  value={title}
                  onChange={handleTitleChange}
                />
                <input
                  type="text"
                  placeholder={text}
                  value={text}
                  onChange={handleTextChange}
                />
                <button onClick={saveModal}>Save</button>
              </div>
            </>
          ) : (
            <>
              <div className="edit">
                <p>{title}</p>
                <p>{text}</p>
                <p>{props.date}</p>
                <p>{updatedDate ? `Updated Date: ${updatedDate}` : ""}</p>
                <button onClick={editModal}>Edit Note</button>
                <button onClick={closeModal}>Close Note</button>
              </div>
            </>
          )}
        </Modal>
      </div>
    );
  }
  

export default ModalPopUp;
