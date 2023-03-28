export const Archive = (props) => {
  return (
    <div className="notesContainer">
      <div>Archive section</div>
      {props.archivedNotes.map((archivedNote, index) => (
        <div className="notes" key={index}>
          <h2>{archivedNote.name}</h2>
          <button onClick={() => props.onUnarchiveNote(index)}>
            Unarchive
          </button>
        </div>
      ))}
    </div>
  );
};
