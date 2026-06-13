import { useState } from "react";
import type { Note } from "../schemas/note.schema";
import NoteShowcase from "./NoteShowcase";

const NoteItem = ({ note }: { note: Note }) => {
  const [openNote, setOpenNote] = useState(false);

  return (
    <>
      <div
        className="bg-white border rounded-2xl px-4 py-2 cursor-pointer max-w-48"
        onClick={() => setOpenNote(true)}
      >
        <p>{note.title}</p>
        <p className="text-[12px] text-muted-foreground">
          {note.subjects?.map((subject) => subject.name).join(", ")}
        </p>
      </div>

      <NoteShowcase open={openNote} setOpen={setOpenNote} note={note} />
    </>
  );
};

export default NoteItem;
