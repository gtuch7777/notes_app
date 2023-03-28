import ModalPopUp from "./modal";
import { useState } from "react";

// This is rendering the form that creates a note.

const Sidebar = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  function handleSave(title, text) {
    props.onAddNote(title, text);
    setTitle("");
    setText("");
  }

  return (
    <div>
      <form className="form">
        <h1>Create Note</h1>

        {/*Creating a button that when clicked runs the onAddNote Function*/}

        <input
          required
          onChange={handleTitleChange}
          value={title}
          type="text"
          placeholder="Title.."
        />
        <textarea
          required
          type="text"
          rows="5"
          cols="33"
          placeholder="Don't Forget To..."
          onChange={handleTextChange}
          value={text}
        ></textarea>

        <button
          className="blue"
          type="button"
          onClick={() => {
            handleSave(title, text);
          }}
        >
          Create Note
        </button>
      </form>

      <div className="notesContainer">
        {/*The map creates a new array with the original array which is then returned and passed to the render function*/}

        {props.notes.map((note, index) => (
          <div className="notes" key={index}>
            <h2>{note.name}</h2>
            {/* <h2>{note.text}</h2> */}
            {/* <div>{note.text}</div> */}
            {/* <div>{note.date}</div> */}
            <ModalPopUp
              title={note.title}
              text={note.text}
              date={note.date}
              info={note.information}
              onSave={handleSave}
            />
            <button
              className="delete"
              onClick={() => props.onArchiveNote(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
